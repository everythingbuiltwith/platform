import { query } from "./_generated/server";
import { v } from "convex/values";
import { paginationOptsValidator } from "convex/server";
import { Id } from "./_generated/dataModel";

// Type definitions for better type safety
type Company = {
  _id: Id<"companies">;
  name: string;
  slug: string;
  logo: string;
  description: string;
  industryId: Id<"industries">;
  companyInfo: {
    size: string;
    website: string;
    hq: string;
  };
  featured?: boolean;
};

type Industry = {
  _id: Id<"industries">;
  _creationTime: number;
  name: string;
  description?: string;
};

type Technology = {
  _id: Id<"technologies">;
  _creationTime: number;
  name: string;
  iconName: string;
};

type TechStackItem = {
  _id: Id<"techStackItems">;
  companyId: Id<"companies">;
  technologyId: Id<"technologies">;
  isCurrent: boolean;
  isHighlighted: boolean;
};

type EnrichedCompany = {
  _id: Id<"companies">;
  name: string;
  slug: string;
  logo: string;
  description: string;
  industry: Industry;
  companyInfo: {
    size: string;
    website: string;
    hq: string;
  };
  teaserTechnologies?: Array<{
    name: string;
    iconName: string;
  }>;
};

// Shared function to enrich company data with industry and teaser technologies
async function enrichCompanyData(ctx: any, companies: Company[]): Promise<EnrichedCompany[]> {
  if (companies.length === 0) return [];

  // Get industries for companies
  const industryIds = new Set<Id<"industries">>();
  for (const company of companies) {
    industryIds.add(company.industryId);
  }

  // Fetch industries one by one
  const industries: Industry[] = [];
  for (const industryId of industryIds) {
    const industry = await ctx.db.get(industryId);
    if (industry) {
      industries.push(industry);
    }
  }

  const industryMap = new Map<Id<"industries">, Industry>();
  industries.forEach(industry => industryMap.set(industry._id, industry));

  // Get highlighted tech items for companies using the new index
  const companyIds = companies.map(c => c._id);
  const allHighlightedItems: TechStackItem[] = [];
  for (const companyId of companyIds) {
    const items = await ctx.db
      .query("techStackItems")
      .withIndex("by_company_and_current_and_highlighted", (q) => 
        q.eq("companyId", companyId).eq("isCurrent", true).eq("isHighlighted", true)
      )
      .collect();
    
    allHighlightedItems.push(...items);
  }

  // Get technologies for highlighted items
  const technologyIds = new Set<Id<"technologies">>();
  for (const item of allHighlightedItems) {
    technologyIds.add(item.technologyId);
  }

  // Fetch technologies one by one
  const technologies: Technology[] = [];
  for (const technologyId of technologyIds) {
    const technology = await ctx.db.get(technologyId);
    if (technology) {
      technologies.push(technology);
    }
  }

  const techMap = new Map<Id<"technologies">, Technology>();
  technologies.forEach(tech => techMap.set(tech._id, tech));

  // Group highlighted techs by company
  const techsByCompany = new Map<Id<"companies">, Array<{name: string; iconName: string}>>();
  for (const item of allHighlightedItems) {
    if (!techsByCompany.has(item.companyId)) {
      techsByCompany.set(item.companyId, []);
    }
    const tech = techMap.get(item.technologyId);
    if (tech) {
      techsByCompany.get(item.companyId)!.push({
        name: tech.name,
        iconName: tech.iconName,
      });
    }
  }

  // Build enriched result
  const result: EnrichedCompany[] = [];
  for (const company of companies) {
    const teaserTechs = techsByCompany.get(company._id) || [];
    const industry = industryMap.get(company.industryId);
    
    if (!industry) continue; // Skip companies without valid industry
    
    result.push({
      _id: company._id,
      name: company.name,
      slug: company.slug,
      logo: company.logo,
      description: company.description,
      industry: industry,
      companyInfo: company.companyInfo,
      teaserTechnologies: teaserTechs.slice(0, 3), // Limit to 3 highlighted technologies
    });
  }

  return result;
}

// Get companies by slugs for hero section
export const getCompaniesBySlugs = query({
  args: { slugs: v.array(v.string()) },
  returns: v.array(v.object({
    _id: v.id("companies"),
    name: v.string(),
    slug: v.string(),
    logo: v.string(),
    description: v.string(),
    industry: v.object({
      _id: v.id("industries"),
      _creationTime: v.number(),
      name: v.string(),
      description: v.optional(v.string()),
    }),
    companyInfo: v.object({
      size: v.string(),
      website: v.string(),
      hq: v.string(),
    }),
    teaserTechnologies: v.optional(v.array(v.object({
      name: v.string(),
      iconName: v.string(),
    }))),
  })),
  handler: async (ctx, args) => {
    const companies: Company[] = [];
    
    // Fetch each company by slug
    for (const slug of args.slugs) {
      const company = await ctx.db
        .query("companies")
        .withIndex("by_slug", (q) => q.eq("slug", slug))
        .unique();
      
      if (company) {
        companies.push(company);
      }
    }

    if (companies.length === 0) {
      return [];
    }

    // Use shared function to enrich data
    return await enrichCompanyData(ctx, companies);
  },
});

// Get paginated companies for tech stack list
export const getCompaniesList = query({
  args: { 
    paginationOpts: paginationOptsValidator 
  },
  returns: v.object({
    page: v.array(v.object({
      _id: v.id("companies"),
      name: v.string(),
      slug: v.string(),
      logo: v.string(),
      description: v.string(),
      industry: v.object({
        _id: v.id("industries"),
        _creationTime: v.number(),
        name: v.string(),
        description: v.optional(v.string()),
      }),
      companyInfo: v.object({
        size: v.string(),
        website: v.string(),
        hq: v.string(),
      }),
      teaserTechnologies: v.optional(v.array(v.object({
        name: v.string(),
        iconName: v.string(),
      }))),
    })),
    isDone: v.boolean(),
    continueCursor: v.union(v.string(), v.null()),
  }),
  handler: async (ctx, args) => {
    const companiesPage = await ctx.db
      .query("companies")
      .paginate(args.paginationOpts);

    const enrichedPage = await enrichCompanyData(ctx, companiesPage.page);

    return {
      page: enrichedPage,
      isDone: companiesPage.isDone,
      continueCursor: companiesPage.continueCursor,
    };
  },
});

// Get a specific company by slug for detailed view
export const getCompanyBySlug = query({
  args: { slug: v.string() },
  returns: v.union(v.object({
    _id: v.id("companies"),
    name: v.string(),
    slug: v.string(),
    logo: v.string(),
    description: v.string(),
    industry: v.object({
      _id: v.id("industries"),
      _creationTime: v.number(),
      name: v.string(),
      description: v.optional(v.string()),
    }),
    companyInfo: v.object({
      size: v.string(),
      website: v.string(),
      hq: v.string(),
    }),
    featured: v.optional(v.boolean()),
  }), v.null()),
  handler: async (ctx, args) => {
    const company = await ctx.db
      .query("companies")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();
    
    if (!company) return null;
    
    const industry = await ctx.db.get(company.industryId);
    if (!industry) return null;
    
    // Return only the fields specified in the validator
    return {
      _id: company._id,
      name: company.name,
      slug: company.slug,
      logo: company.logo,
      description: company.description,
      industry: {
        _id: industry._id,
        _creationTime: industry._creationTime,
        name: industry.name,
        description: (industry as any).description,
      },
      companyInfo: company.companyInfo,
      featured: company.featured,
    };
  },
});

// Get company's current tech stack organized by category
export const getCompanyTechStack = query({
  args: { companyId: v.id("companies") },
  returns: v.array(v.object({
    category: v.object({
      _id: v.id("techCategories"),
      _creationTime: v.number(),
      name: v.string(),
      order: v.number(),
    }),
    reason: v.object({
      _id: v.id("techReasons"),
      _creationTime: v.number(),
      name: v.string(),
    }),
    description: v.optional(v.string()),
    technologies: v.array(v.object({
      _id: v.id("technologies"),
      _creationTime: v.number(),
      name: v.string(),
      iconName: v.string(),
    })),
  })),
  handler: async (ctx, args) => {
    // Get all current tech categories for the company
    const companyTechCategories = await ctx.db
      .query("techStackTechCategories")
      .withIndex("by_company_and_current", (q) => 
        q.eq("companyId", args.companyId).eq("isCurrent", true)
      )
      .collect();

    // Get all current tech stack items for the company
    const techStackItems = await ctx.db
      .query("techStackItems")
      .withIndex("by_company_and_current", (q) => 
        q.eq("companyId", args.companyId).eq("isCurrent", true)
      )
      .collect();

    // Get only the needed related data efficiently
    const categoryIds = new Set<Id<"techCategories">>();
    const technologyIds = new Set<Id<"technologies">>();
    const reasonIds = new Set<Id<"techReasons">>();

    for (const item of companyTechCategories) {
      categoryIds.add(item.categoryId);
      reasonIds.add(item.techReasonId);
    }

    for (const item of techStackItems) {
      technologyIds.add(item.technologyId);
    }

    // Fetch only the needed data
    const categories: Array<any> = [];
    for (const categoryId of categoryIds) {
      const category = await ctx.db.get(categoryId);
      if (category) {
        categories.push(category);
      }
    }

    const technologies: Array<any> = [];
    for (const technologyId of technologyIds) {
      const technology = await ctx.db.get(technologyId);
      if (technology) {
        technologies.push(technology);
      }
    }

    const techReasons: Array<any> = [];
    for (const reasonId of reasonIds) {
      const reason = await ctx.db.get(reasonId);
      if (reason) {
        techReasons.push(reason);
      }
    }

    const techMap = new Map();
    technologies.forEach(tech => techMap.set(tech._id, tech));

    const categoryMap = new Map();
    categories.forEach(cat => categoryMap.set(cat._id, cat));

    const reasonMap = new Map();
    techReasons.forEach(reason => reasonMap.set(reason._id, reason));

    // Group technologies by category
    const techByCategory = new Map();
    for (const item of techStackItems) {
      if (!techByCategory.has(item.techCategoryId)) {
        techByCategory.set(item.techCategoryId, []);
      }
      const tech = techMap.get(item.technologyId);
      if (tech) {
        techByCategory.get(item.techCategoryId).push({
          _id: tech._id,
          _creationTime: tech._creationTime,
          name: tech.name,
          iconName: tech.iconName,
        });
      }
    }

    // Build result with categories, reasons, and technologies
    const result: Array<{
      category: any;
      reason: any;
      description?: string;
      technologies: Array<{
        _id: Id<"technologies">;
        _creationTime: number;
        name: string;
        iconName: string;
      }>;
    }> = [];
    for (const categoryItem of companyTechCategories) {
      const category = categoryMap.get(categoryItem.categoryId);
      const reason = reasonMap.get(categoryItem.techReasonId);
      
      if (!category || !reason) continue;
      
      result.push({
        category: {
          _id: category._id,
          _creationTime: category._creationTime,
          name: category.name,
          order: category.order,
        },
        reason: {
          _id: reason._id,
          _creationTime: reason._creationTime,
          name: reason.name,
        },
        description: categoryItem.description,
        technologies: techByCategory.get(categoryItem.categoryId) || [],
      });
    }

    return result.sort((a, b) => a.category.order - b.category.order);
  },
});

// Get company's tech stack updates/history
export const getCompanyTechUpdates = query({
  args: { companyId: v.id("companies") },
  returns: v.array(v.object({
    category: v.object({
      _id: v.id("techCategories"),
      _creationTime: v.number(),
      name: v.string(),
    }),
    updates: v.array(v.object({
      _id: v.id("techStackUpdates"),
      _creationTime: v.number(),
      oldTechnology: v.optional(v.object({
        _id: v.id("technologies"),
        _creationTime: v.number(),
        name: v.string(),
        iconName: v.string(),
      })),
      reason: v.object({
        _id: v.id("updateReasons"),
        _creationTime: v.number(),
        name: v.string(),
      }),
      description: v.string(),
      date: v.number(),
    })),
  })),
  handler: async (ctx, args) => {
    const updates = await ctx.db
      .query("techStackUpdates")
      .withIndex("by_company", (q) => q.eq("companyId", args.companyId))
      .order("desc")
      .collect();

    // Get only the needed related data efficiently
    const categoryIds = new Set<Id<"techCategories">>();
    const technologyIds = new Set<Id<"technologies">>();
    const reasonIds = new Set<Id<"updateReasons">>();

    for (const update of updates) {
      categoryIds.add(update.categoryId);
      reasonIds.add(update.updateReasonId);
      if (update.oldTechnologyId) {
        technologyIds.add(update.oldTechnologyId);
      }
    }

    // Fetch only the needed data
    const categories: Array<any> = [];
    for (const categoryId of categoryIds) {
      const category = await ctx.db.get(categoryId);
      if (category) {
        categories.push(category);
      }
    }

    const technologies: Array<any> = [];
    for (const technologyId of technologyIds) {
      const technology = await ctx.db.get(technologyId);
      if (technology) {
        technologies.push(technology);
      }
    }

    const updateReasons: Array<any> = [];
    for (const reasonId of reasonIds) {
      const reason = await ctx.db.get(reasonId);
      if (reason) {
        updateReasons.push(reason);
      }
    }

    const techMap = new Map();
    technologies.forEach(tech => techMap.set(tech._id, tech));

    const categoryMap = new Map();
    categories.forEach(cat => categoryMap.set(cat._id, cat));

    const reasonMap = new Map();
    updateReasons.forEach(reason => reasonMap.set(reason._id, reason));

    const groupedUpdates = new Map();
    
    for (const update of updates) {
      const category = categoryMap.get(update.categoryId);
      const oldTech = update.oldTechnologyId ? techMap.get(update.oldTechnologyId) : null;
      const reason = reasonMap.get(update.updateReasonId);
      
      if (!category || !reason) continue;
      
      if (!groupedUpdates.has(category._id)) {
        groupedUpdates.set(category._id, {
          category: {
            _id: category._id,
            _creationTime: category._creationTime,
            name: category.name,
          },
          updates: [],
        });
      }
      
      groupedUpdates.get(category._id).updates.push({
        _id: update._id,
        _creationTime: update._creationTime,
        oldTechnology: oldTech ? {
          _id: oldTech._id,
          _creationTime: oldTech._creationTime,
          name: oldTech.name,
          iconName: oldTech.iconName,
        } : null,
        reason: {
          _id: reason._id,
          _creationTime: reason._creationTime,
          name: reason.name,
        },
        description: update.description,
        date: update.date,
      });
    }

    return Array.from(groupedUpdates.values());
  },
});

// Get featured companies for homepage
export const getFeaturedCompanies = query({
  args: {},
  returns: v.array(v.object({
    _id: v.id("companies"),
    name: v.string(),
    slug: v.string(),
    logo: v.string(),
    description: v.string(),
    industry: v.object({
      _id: v.id("industries"),
      _creationTime: v.number(),
      name: v.string(),
      description: v.optional(v.string()),
    }),
    companyInfo: v.object({
      size: v.string(),
      website: v.string(),
      hq: v.string(),
    }),
    teaserTechnologies: v.optional(v.array(v.object({
      name: v.string(),
      iconName: v.string(),
    }))),
  })),
  handler: async (ctx) => {
    // Get featured companies using the new index
    const featuredCompanies = await ctx.db
      .query("companies")
      .withIndex("by_featured", (q) => q.eq("featured", true))
      .collect();

    if (featuredCompanies.length === 0) {
      return [];
    }

    // Use shared function to enrich data
    return await enrichCompanyData(ctx, featuredCompanies);
  },
}); 

// Combined page data for a company's stack details
export const getCompanyPageBySlug = query({
  args: { slug: v.string() },
  returns: v.object({
    company: v.union(
      v.object({
        _id: v.id("companies"),
        name: v.string(),
        slug: v.string(),
        logo: v.string(),
        description: v.string(),
        industry: v.object({
          _id: v.id("industries"),
          _creationTime: v.number(),
          name: v.string(),
          description: v.optional(v.string()),
        }),
        companyInfo: v.object({
          size: v.string(),
          website: v.string(),
          hq: v.string(),
        }),
        featured: v.optional(v.boolean()),
      }),
      v.null()
    ),
    techStack: v.array(
      v.object({
        category: v.object({
          _id: v.id("techCategories"),
          _creationTime: v.number(),
          name: v.string(),
          order: v.number(),
        }),
        reason: v.object({
          _id: v.id("techReasons"),
          _creationTime: v.number(),
          name: v.string(),
        }),
        description: v.optional(v.string()),
        technologies: v.array(
          v.object({
            _id: v.id("technologies"),
            _creationTime: v.number(),
            name: v.string(),
            iconName: v.string(),
          })
        ),
      })
    ),
    techUpdates: v.array(
      v.object({
        category: v.object({
          _id: v.id("techCategories"),
          _creationTime: v.number(),
          name: v.string(),
        }),
        updates: v.array(
          v.object({
            _id: v.id("techStackUpdates"),
            _creationTime: v.number(),
            oldTechnology: v.optional(
              v.object({
                _id: v.id("technologies"),
                _creationTime: v.number(),
                name: v.string(),
                iconName: v.string(),
              })
            ),
            reason: v.object({
              _id: v.id("updateReasons"),
              _creationTime: v.number(),
              name: v.string(),
            }),
            description: v.string(),
            date: v.number(),
          })
        ),
      })
    ),
  }),
  handler: async (ctx, args) => {
    // Company
    const companyDoc = await ctx.db
      .query("companies")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();

    if (!companyDoc) {
      return { company: null, techStack: [], techUpdates: [] };
    }

    const industry = await ctx.db.get(companyDoc.industryId);
    if (!industry) {
      return { company: null, techStack: [], techUpdates: [] };
    }

    const company = {
      _id: companyDoc._id,
      name: companyDoc.name,
      slug: companyDoc.slug,
      logo: companyDoc.logo,
      description: companyDoc.description,
      industry: {
        _id: industry._id,
        _creationTime: industry._creationTime,
        name: industry.name,
        description: (industry as any).description,
      },
      companyInfo: companyDoc.companyInfo,
      featured: companyDoc.featured,
    };

    // Tech Stack (current) - run independent queries concurrently
    const [companyTechCategories, techStackItems] = await Promise.all([
      ctx.db
        .query("techStackTechCategories")
        .withIndex("by_company_and_current", (q) =>
          q.eq("companyId", companyDoc._id).eq("isCurrent", true)
        )
        .collect(),
      ctx.db
        .query("techStackItems")
        .withIndex("by_company_and_current", (q) =>
          q.eq("companyId", companyDoc._id).eq("isCurrent", true)
        )
        .collect(),
    ]);

    const categoryIds = new Set<Id<"techCategories">>();
    const technologyIds = new Set<Id<"technologies">>();
    const reasonIds = new Set<Id<"techReasons">>();

    for (const item of companyTechCategories) {
      categoryIds.add(item.categoryId);
      reasonIds.add(item.techReasonId);
    }
    for (const item of techStackItems) {
      technologyIds.add(item.technologyId);
    }

    const [categories, technologies, techReasons] = await Promise.all([
      Promise.all(
        Array.from(categoryIds).map(async (categoryId) => ctx.db.get(categoryId))
      ).then((rows) => rows.filter(Boolean) as Array<any>),
      Promise.all(
        Array.from(technologyIds).map(async (technologyId) =>
          ctx.db.get(technologyId)
        )
      ).then((rows) => rows.filter(Boolean) as Array<any>),
      Promise.all(
        Array.from(reasonIds).map(async (reasonId) => ctx.db.get(reasonId))
      ).then((rows) => rows.filter(Boolean) as Array<any>),
    ]);

    const techMap = new Map();
    technologies.forEach((tech) => techMap.set(tech._id, tech));
    const categoryMap = new Map();
    categories.forEach((cat) => categoryMap.set(cat._id, cat));
    const reasonMap = new Map();
    techReasons.forEach((reason) => reasonMap.set(reason._id, reason));

    const techByCategory = new Map();
    for (const item of techStackItems) {
      if (!techByCategory.has(item.techCategoryId)) {
        techByCategory.set(item.techCategoryId, []);
      }
      const tech = techMap.get(item.technologyId);
      if (tech) {
        techByCategory.get(item.techCategoryId).push({
          _id: tech._id,
          _creationTime: tech._creationTime,
          name: tech.name,
          iconName: tech.iconName,
        });
      }
    }

    const techStack = [] as Array<{
      category: any;
      reason: any;
      description?: string;
      technologies: Array<any>;
    }>;
    for (const categoryItem of companyTechCategories) {
      const category = categoryMap.get(categoryItem.categoryId);
      const reason = reasonMap.get(categoryItem.techReasonId);
      if (!category || !reason) continue;
      techStack.push({
        category: {
          _id: category._id,
          _creationTime: category._creationTime,
          name: category.name,
          order: category.order,
        },
        reason: {
          _id: reason._id,
          _creationTime: reason._creationTime,
          name: reason.name,
        },
        description: categoryItem.description,
        technologies: techByCategory.get(categoryItem.categoryId) || [],
      });
    }

    const sortedTechStack = techStack.sort(
      (a, b) => a.category.order - b.category.order
    );

    // Tech Updates (history)
    const updates = await ctx.db
      .query("techStackUpdates")
      .withIndex("by_company", (q) => q.eq("companyId", companyDoc._id))
      .order("desc")
      .collect();

    const updateCategoryIds = new Set<Id<"techCategories">>();
    const updateTechnologyIds = new Set<Id<"technologies">>();
    const updateReasonIds = new Set<Id<"updateReasons">>();

    for (const update of updates) {
      updateCategoryIds.add(update.categoryId);
      updateReasonIds.add(update.updateReasonId);
      if (update.oldTechnologyId) {
        updateTechnologyIds.add(update.oldTechnologyId);
      }
    }

    const [updateCategories, updateTechnologies, updateReasons] = await Promise.all([
      Promise.all(
        Array.from(updateCategoryIds).map(async (categoryId) =>
          ctx.db.get(categoryId)
        )
      ).then((rows) => rows.filter(Boolean) as Array<any>),
      Promise.all(
        Array.from(updateTechnologyIds).map(async (technologyId) =>
          ctx.db.get(technologyId)
        )
      ).then((rows) => rows.filter(Boolean) as Array<any>),
      Promise.all(
        Array.from(updateReasonIds).map(async (reasonId) => ctx.db.get(reasonId))
      ).then((rows) => rows.filter(Boolean) as Array<any>),
    ]);

    const updTechMap = new Map();
    updateTechnologies.forEach((tech) => updTechMap.set(tech._id, tech));
    const updCategoryMap = new Map();
    updateCategories.forEach((cat) => updCategoryMap.set(cat._id, cat));
    const updReasonMap = new Map();
    updateReasons.forEach((reason) => updReasonMap.set(reason._id, reason));

    const groupedUpdates = new Map();
    for (const update of updates) {
      const category = updCategoryMap.get(update.categoryId);
      const oldTech = update.oldTechnologyId
        ? updTechMap.get(update.oldTechnologyId)
        : null;
      const reason = updReasonMap.get(update.updateReasonId);
      if (!category || !reason) continue;
      if (!groupedUpdates.has(category._id)) {
        groupedUpdates.set(category._id, {
          category: {
            _id: category._id,
            _creationTime: category._creationTime,
            name: category.name,
          },
          updates: [],
        });
      }
      const updateEntry: any = {
        _id: update._id,
        _creationTime: update._creationTime,
        reason: {
          _id: reason._id,
          _creationTime: reason._creationTime,
          name: reason.name,
        },
        description: update.description,
        date: update.date,
      };
      if (oldTech) {
        updateEntry.oldTechnology = {
          _id: oldTech._id,
          _creationTime: oldTech._creationTime,
          name: oldTech.name,
          iconName: oldTech.iconName,
        };
      }
      groupedUpdates.get(category._id).updates.push(updateEntry);
    }

    const techUpdates = Array.from(groupedUpdates.values());

    return { company, techStack: sortedTechStack, techUpdates };
  },
});
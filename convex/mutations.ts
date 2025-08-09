import { mutation } from "./_generated/server";
import { v } from "convex/values";

// Add a new industry
export const addIndustry = mutation({
  args: {
    name: v.string(),
    description: v.optional(v.string()),
  },
  returns: v.id("industries"),
  handler: async (ctx, args) => {
    return await ctx.db.insert("industries", args);
  },
});

// Add a new company
export const addCompany = mutation({
  args: {
    name: v.string(),
    slug: v.string(),
    logo: v.string(),
    description: v.string(),
    industryId: v.id("industries"),
    companyInfo: v.object({
      size: v.string(),
      website: v.string(),
      hq: v.string(),
    }),
  },
  returns: v.id("companies"),
  handler: async (ctx, args) => {
    return await ctx.db.insert("companies", args);
  },
});

// Add a new technology
export const addTechnology = mutation({
  args: {
    name: v.string(),
    iconName: v.string(),
    description: v.optional(v.string()),
  },
  returns: v.id("technologies"),
  handler: async (ctx, args) => {
    return await ctx.db.insert("technologies", args);
  },
});

// Add a new tech reason
export const addTechReason = mutation({
  args: {
    name: v.string(),
    category: v.string(), // "adoption" or "switching"
    description: v.optional(v.string()),
  },
  returns: v.id("techReasons"),
  handler: async (ctx, args) => {
    return await ctx.db.insert("techReasons", args);
  },
});

// Add a new update reason
export const addUpdateReason = mutation({
  args: {
    name: v.string(),
    category: v.string(), // "switching" or "adoption"
    description: v.optional(v.string()),
  },
  returns: v.id("updateReasons"),
  handler: async (ctx, args) => {
    return await ctx.db.insert("updateReasons", args);
  },
});

// Add a company tech category with reason
export const addCompanyTechCategory = mutation({
  args: {
    companyId: v.id("companies"),
    categoryId: v.id("techCategories"),
    techReasonId: v.id("techReasons"),
    description: v.optional(v.string()),
    isCurrent: v.boolean(),
  },
  returns: v.id("techStackTechCategories"),
  handler: async (ctx, args) => {
    return await ctx.db.insert("techStackTechCategories", args);
  },
});

// Update a company tech category
export const updateCompanyTechCategory = mutation({
  args: {
    categoryItemId: v.id("techStackTechCategories"),
    updates: v.object({
      isCurrent: v.optional(v.boolean()),
      techReasonId: v.optional(v.id("techReasons")),
      description: v.optional(v.string()),
    }),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    await ctx.db.patch(args.categoryItemId, args.updates);
    return null;
  },
});

// Add a tech stack item to a company
export const addTechStackItem = mutation({
  args: {
    companyId: v.id("companies"),
    techCategoryId: v.id("techCategories"),
    technologyId: v.id("technologies"),
    order: v.optional(v.number()),
    isHighlighted: v.optional(v.boolean()),
    isCurrent: v.boolean(),
  },
  returns: v.id("techStackItems"),
  handler: async (ctx, args) => {
    return await ctx.db.insert("techStackItems", args);
  },
});

// Update a tech stack item (e.g., mark as not current when replaced)
export const updateTechStackItem = mutation({
  args: {
    itemId: v.id("techStackItems"),
    updates: v.object({
      isCurrent: v.optional(v.boolean()),
      order: v.optional(v.number()),
      isHighlighted: v.optional(v.boolean()),
    }),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    await ctx.db.patch(args.itemId, args.updates);
    return null;
  },
});

// Add a tech stack update (when a company switches technologies)
export const addTechStackUpdate = mutation({
  args: {
    companyId: v.id("companies"),
    categoryId: v.id("techCategories"),
    oldTechnologyId: v.optional(v.id("technologies")), // null if new adoption
    updateReasonId: v.id("updateReasons"),
    description: v.string(),
    date: v.number(),
  },
  returns: v.id("techStackUpdates"),
  handler: async (ctx, args) => {
    return await ctx.db.insert("techStackUpdates", args);
  },
});

// Migrate existing companies to have featured field
export const migrateFeaturedField = mutation({
  args: {},
  returns: v.null(),
  handler: async (ctx) => {
    const companies = await ctx.db.query("companies").collect();
    for (const company of companies) {
      if (company.featured === undefined) {
        await ctx.db.patch(company._id, { featured: true });
      }
    }
    return null;
  },
}); 
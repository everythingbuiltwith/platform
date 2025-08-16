import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    //user table for better auth
    users: defineTable({
        // Fields are optional
    }),

    // indusstries like Finance, Cloud Infrastructure, etc.
    industries: defineTable({
        name: v.string(),
    }),

    // categories like Frontend, Backend, Database, etc.
    techCategories: defineTable({
        name: v.string(),
        order: v.number(),
    }),

    // reasons for choosing a tech category like "Performance & Architecture", "Long-Term Strategy", etc.
    techReasons: defineTable({
        name: v.string(),
    }),

    // reasons for updating a tech category like "Scalability or Performance Limitations", "Poor Developer Experience", etc.
    updateReasons: defineTable({
        name: v.string(),
    }),

    // companies like Vercel, Linear, etc.
    companies: defineTable({
        name: v.string(),
        slug: v.string(),
        carsten: v.optional(v.string()),
        logo: v.string(),
        description: v.string(),
        industryId: v.id("industries"),
        companyInfo: v.object({
            size: v.string(),
            website: v.string(),
            hq: v.string(),
        }),
        featured: v.optional(v.boolean()),
    })
    .index("by_slug", ["slug"])
    .index("by_featured", ["featured"]),

    // technologies like Next.js, React, etc.
    technologies: defineTable({
        name: v.string(),
        iconName: v.string(),
    }),

    // Main tech stack of a company, povide description and pick reason for linked tech categories 
    techStackTechCategories: defineTable({
        companyId: v.id("companies"),
        categoryId: v.id("techCategories"),
        techReasonId: v.id("techReasons"),
        description: v.optional(v.string()),
        isCurrent: v.boolean(),
    })
    .index("by_company_and_current", ["companyId", "isCurrent"]),

    //tech stack technologies like Next.js, React, etc.
    techStackItems: defineTable({
        companyId: v.id("companies"),
        techCategoryId: v.id("techCategories"),
        technologyId: v.id("technologies"),
        order: v.optional(v.number()),
        isHighlighted: v.optional(v.boolean()),
        isCurrent: v.boolean(),
    })
    .index("by_company_and_current", ["companyId", "isCurrent"])
    .index("by_company_and_current_and_highlighted", ["companyId", "isCurrent", "isHighlighted"]),

    //upadtes to the tech stack
    techStackUpdates: defineTable({
        companyId: v.id("companies"),
        categoryId: v.id("techCategories"),
        oldTechnologyId: v.optional(v.id("technologies")),
        updateReasonId: v.id("updateReasons"),
        description: v.string(),
        date: v.number(),
    })
    .index("by_company", ["companyId"]),
}); 
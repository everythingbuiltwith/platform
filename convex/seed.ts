import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const seedDatabase = mutation({
  args: {},
  returns: v.null(),
  handler: async (ctx) => {
    // Seed industries
    const industries = [
        { name: "Developer Tools & Platforms" },
        { name: "Cloud Infrastructure" },
        { name: "Payments & Fintech" },
        { name: "Authentication & Security" },
        { name: "Design & Creative Tools" },
        { name: "Analytics & Monitoring" }
    ];

    const industryIds = {};
    for (const industry of industries) {
      const id = await ctx.db.insert("industries", industry);
      industryIds[industry.name] = id;
    }

    // Seed tech categories
    const categories = [
      { name: "Frontend", order: 1 },
      { name: "Backend", order: 2 },
      { name: "Database", order: 3 },
      { name: "Authentication", order: 4 },
      { name: "Hosting / Infrastructure", order: 5 },
      { name: "Payments", order: 6 },
      { name: "Dev Tools / CI/CD", order: 7 },
      { name: "Monitoring / Logs", order: 8 },
      { name: "Other Key Tools", order: 9 },
    ];

    const categoryIds = {};
    for (const category of categories) {
      const id = await ctx.db.insert("techCategories", category);
      categoryIds[category.name] = id;
    }

    // Seed technologies
    const technologies = [
      { name: "Next.js", iconName: "simple-icons:nextdotjs" },
      { name: "React", iconName: "logos:react" },
      { name: "Angular", iconName: "logos:angular-icon" },
      { name: "TypeScript", iconName: "logos:typescript-icon" },
      { name: "tRPC", iconName: "simple-icons:trpc" },
      { name: "shadcn", iconName: "simple-icons:shadcnui" },
      { name: "tailwindcss", iconName: "logos:tailwindcss-icon" },
      { name: "Go", iconName: "logos:go" },
      { name: "Node.js", iconName: "logos:nodejs-icon" },
      { name: "grpc", iconName: "simple-icons:grpc" },
      { name: "PostgreSQL", iconName: "logos:postgresql" },
      { name: "PlanetScale", iconName: "simple-icons:planetscale" },
      { name: "Auth0", iconName: "logos:auth0" },
      { name: "Vercel", iconName: "logos:vercel-icon" },
      { name: "Stripe", iconName: "logos:stripe" },
      { name: "Github Actions", iconName: "logos:githubactions" },
      { name: "Sentry", iconName: "logos:sentry-icon" },
      { name: "Figma", iconName: "logos:figma" },
      { name: "Kafka", iconName: "logos:apachekafka" },
      { name: "Kubernetes", iconName: "logos:kubernetes" },
      { name: "prisma", iconName: "simple-icons:prisma" },
    ];

    const techIds = {};
    for (const tech of technologies) {
      const id = await ctx.db.insert("technologies", tech);
      techIds[tech.name] = id;
    }

    // Seed tech reasons
    const techReasons = [
      { name: "Performance & Architecture" },
      { name: "Developer Experience" },
      { name: "Business & Product Needs" },
      { name: "Ecosystem & Integration" },
      { name: "Long-Term Strategy" },
    ];

    const techReasonIds = {};
    for (const reason of techReasons) {
      const id = await ctx.db.insert("techReasons", reason);
      techReasonIds[reason.name] = id;
    }

    // Seed update reasons
    const updateReasons = [
      { name: "Scalability or Performance Limitations" },
      { name: "Poor Developer Experience" },
      { name: "High Costs or Inefficient Resource Use" },
      { name: "Immature Tooling or Ecosystem" },
      { name: "Poor Integration or Compatibility" },
      { name: "Low Team Familiarity or Hiring Difficulty" },
      { name: "Hard to Maintain or Extend" },
      { name: "Misaligned with Business Direction" },
    ];

    const updateReasonIds = {};
    for (const reason of updateReasons) {
      const id = await ctx.db.insert("updateReasons", reason);
      updateReasonIds[reason.name] = id;
    }

    // Seed companies
    const companies = [
      {
        name: "Vercel",
        slug: "vercel",
        logo: "vercel_white.svg",
        description: "The platform for frontend developers, providing the speed and reliability innovators need to create at the moment of inspiration.",
        industryId: industryIds["Cloud Infrastructure"],
        companyInfo: {
          size: "201-500",
          website: "https://vercel.com",
          hq: "San Francisco, CA",
        },
        featured: true,
      },
      {
        name: "Linear",
        slug: "linear",
        logo: "linear_white.svg",
        description: "The issue tracking tool you'll enjoy using. Build high-quality software, fast.",
        industryId: industryIds["Developer Tools & Platforms"],
        companyInfo: {
          size: "51-200",
          website: "https://linear.app",
          hq: "San Francisco, CA",
        },
        featured: true,
      },
      {
        name: "Stripe",
        slug: "stripe",
        logo: "stripe_white.svg",
        description: "Financial infrastructure for the internet. Millions of companies of all sizes use Stripe online and in person to accept payments.",
        industryId: industryIds["Payments & Fintech"],
        companyInfo: {
          size: "1000+",
          website: "https://stripe.com",
          hq: "San Francisco, CA",
        },
        featured: false,
      },
      {
        name: "Supabase",
        slug: "supabase",
        logo: "supabase_white.svg",
        description: "The open source Firebase alternative. Build in a weekend, scale to millions.",
        industryId: industryIds["Developer Tools & Platforms"],
        companyInfo: {
          size: "51-200",
          website: "https://supabase.com",
          hq: "San Francisco, CA",
        },
        featured: true,
      },
    ];

    const companyIds = {};
    for (const company of companies) {
      const id = await ctx.db.insert("companies", company);
      companyIds[company.slug] = id;
    }

    // Seed Vercel's tech categories with reasons
    const vercelTechCategories = [
      {
        categoryId: categoryIds["Frontend"],
        techReasonId: techReasonIds["Performance & Architecture"],
        description: "voluptate elit sunt commodo commodo anim duis do non esse et et consectetur pariatur velit laboris nostrud elit adipisicing sunt duis cillum dolor sit commodo proident ut occaecat do labore mollit cillum est deserunt et amet nostrud et commodo tempor ad deserunt ipsum magna culpa in reprehenderit ea esse exercitation magna excepteur aliqua irure enim non tempor officia mollit velit magna fugiat aute magna aliquip est quis ipsum veniam nostrud anim ea laboris labore magna cupidatat anim cillum laborum irure sint anim fugiat officia eu excepteur culpa sint nostrud dolor est id et consequat nostrud adipisicing exercitation dolore excepteur culpa ex aliqua adipisicing magna dolor amet excepteur ex ea voluptate laboris duis laboris voluptate dolor esse esse do esse eu eu officia dolore ex Lorem officia in aliqua consequat aute ut ex do ex magna magna officia cillum et sunt Lorem sit non et id anim Lorem aliquip qui reprehenderit ut nostrud veniam minim magna quis incididunt proident excepteur quis exercitation proident laboris anim velit magna proident nostrud consequat duis ex elit elit id duis duis exercitation dolor non deserunt eu mollit deserunt ea quis est eiusmod Lorem nulla adipisicing sunt ipsum consectetur dolore qui est sunt labore qui elit",
        isCurrent: true,
      },
      {
        categoryId: categoryIds["Backend"],
        techReasonId: techReasonIds["Business & Product Needs"],
        isCurrent: true,
      },
      {
        categoryId: categoryIds["Database"],
        techReasonId: techReasonIds["Long-Term Strategy"],
        description: "voluptate elit sunt commodo commodo anim duis do non esse et et consectetur pariatur velit laboris nostrud elit adipisicing sunt duis cillum dolor sit commodo proident ut occaecat do labore mollit cillum est deserunt et amet nostrud et commodo tempor ad deserunt ipsum magna culpa in reprehenderit ea esse exercitation magna excepteur aliqua irure enim non tempor officia mollit velit magna fugiat aute magna aliquip est quis ipsum veniam nostrud anim ea laboris labore magna cupidatat anim cillum laborum irure sint anim fugiat officia eu excepteur culpa sint nostrud dolor est id et consequat nostrud adipisicing exercitation dolore excepteur culpa ex aliqua adipisicing magna dolor amet excepteur ex ea voluptate laboris duis laboris voluptate dolor esse esse do esse eu eu officia dolore ex Lorem officia in aliqua consequat aute ut ex do ex magna magna officia cillum et sunt Lorem sit non et id anim Lorem aliquip qui reprehenderit ut nostrud veniam minim magna quis incididunt proident excepteur quis exercitation proident laboris anim velit magna proident nostrud consequat duis ex elit elit id duis duis exercitation dolor non deserunt eu mollit deserunt ea quis est eiusmod Lorem nulla adipisicing sunt ipsum consectetur dolore qui est sunt labore qui elit",
        isCurrent: true,
      },
      {
        categoryId: categoryIds["Authentication"],
        techReasonId: techReasonIds["Ecosystem & Integration"],
        description: "Chose Auth0 for secure, managed authentication.",
        isCurrent: true,
      },
      {
        categoryId: categoryIds["Hosting / Infrastructure"],
        techReasonId: techReasonIds["Developer Experience"],
        description: "Easy deployments and previews.",
        isCurrent: true,
      },
      {
        categoryId: categoryIds["Payments"],
        techReasonId: techReasonIds["Business & Product Needs"],
        description: "Test bla",
        isCurrent: true,
      },
      {
        categoryId: categoryIds["Dev Tools / CI/CD"],
        techReasonId: techReasonIds["Ecosystem & Integration"],
        description: "Seamless with GitHub repos.",
        isCurrent: true,
      },
      {
        categoryId: categoryIds["Monitoring / Logs"],
        techReasonId: techReasonIds["Performance & Architecture"],
        description: "Real-time error monitoring.",
        isCurrent: true,
      },
      {
        categoryId: categoryIds["Other Key Tools"],
        techReasonId: techReasonIds["Developer Experience"],
        description: "Centralized design and prototyping.",
        isCurrent: true,
      },
    ];

    for (const category of vercelTechCategories) {
      await ctx.db.insert("techStackTechCategories", {
        companyId: companyIds["vercel"],
        ...category,
      });
    }

    // Seed Vercel's individual tech stack items
    const vercelTechStackItems = [
      // Frontend technologies
      { techCategoryId: categoryIds["Frontend"], technologyId: techIds["Next.js"], order: 1, isHighlighted: true, isCurrent: true },
      { techCategoryId: categoryIds["Frontend"], technologyId: techIds["tRPC"], order: 2, isHighlighted: false, isCurrent: true },
      { techCategoryId: categoryIds["Frontend"], technologyId: techIds["shadcn"], order: 3, isHighlighted: false, isCurrent: true },
      { techCategoryId: categoryIds["Frontend"], technologyId: techIds["tailwindcss"], order: 4, isHighlighted: false, isCurrent: true },
      { techCategoryId: categoryIds["Frontend"], technologyId: techIds["prisma"], order: 5, isHighlighted: false, isCurrent: true },
      
      // Backend technologies
      { techCategoryId: categoryIds["Backend"], technologyId: techIds["Go"], order: 1, isHighlighted: true, isCurrent: true },
      { techCategoryId: categoryIds["Backend"], technologyId: techIds["grpc"], order: 2, isHighlighted: false, isCurrent: true },
      
      // Database technologies
      { techCategoryId: categoryIds["Database"], technologyId: techIds["PostgreSQL"], order: 1, isHighlighted: false, isCurrent: true },
      
      // Authentication technologies
      { techCategoryId: categoryIds["Authentication"], technologyId: techIds["Auth0"], order: 1, isHighlighted: false, isCurrent: true },
      
      // Hosting/Infrastructure technologies
      { techCategoryId: categoryIds["Hosting / Infrastructure"], technologyId: techIds["Vercel"], order: 1, isHighlighted: false, isCurrent: true },
      
      // Payment technologies
      { techCategoryId: categoryIds["Payments"], technologyId: techIds["Stripe"], order: 1, isHighlighted: false, isCurrent: true },
      
      // Dev Tools/CI/CD technologies
      { techCategoryId: categoryIds["Dev Tools / CI/CD"], technologyId: techIds["Github Actions"], order: 1, isHighlighted: false, isCurrent: true },
      
      // Monitoring/Logs technologies
      { techCategoryId: categoryIds["Monitoring / Logs"], technologyId: techIds["Sentry"], order: 1, isHighlighted: false, isCurrent: true },
      
      // Other Key tools technologies
      { techCategoryId: categoryIds["Other Key Tools"], technologyId: techIds["Figma"], order: 1, isHighlighted: false, isCurrent: true },
    ];

    for (const techItem of vercelTechStackItems) {
      await ctx.db.insert("techStackItems", {
        companyId: companyIds["vercel"],
        ...techItem,
      });
    }

    // Seed Vercel's tech stack updates
    const vercelUpdates = [
      {
        categoryId: categoryIds["Frontend"],
        oldTechnologyId: techIds["Angular"],
        updateReasonId: updateReasonIds["Poor Integration or Compatibility"],
        description: "Switched to React for better component reusability and ecosystem.",
        date: new Date("2022-05-15").getTime(),
      },
      {
        categoryId: categoryIds["Frontend"],
        oldTechnologyId: techIds["React"],
        updateReasonId: updateReasonIds["Scalability or Performance Limitations"],
        description: "Initial MVP was built quickly with Angular due to team experience.",
        date: new Date("2023-11-01").getTime(),
      },
    ];

    for (const update of vercelUpdates) {
      await ctx.db.insert("techStackUpdates", {
        companyId: companyIds["vercel"],
        ...update,
      });
    }

    return null;
  },
}); 
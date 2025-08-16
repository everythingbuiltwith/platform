import { Button } from "@/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";
import { TechStackCard } from "@/components/TechStackCard";
import { getIconifyComponent } from "@/lib/icons";
import { api } from "../../convex/_generated/api";
import { useSuspenseQuery } from "@tanstack/react-query";
import { convexQuery } from "@convex-dev/react-query";
import { staticTitle } from "./__root";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: `Home${staticTitle}`
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <HeroSection />
      <div className="flex flex-col gap-24 md:gap-32 max-w-7xl mx-auto px-4 pt-24">
        <ValueProposition />
        <FeaturedStacks />
      </div>
    </>
  );
}

function HeroSection() {
  // Hardcoded company slugs for hero section
  const heroSlugs = ["vercel", "linear"];

  // Query hero companies by slugs using TanStack Query integration
  const { data: heroCompanies } = useSuspenseQuery(
    convexQuery(api.queries.getCompaniesBySlugs, { slugs: heroSlugs })
  );

  const floatingTechIcons = [
    { icon: getIconifyComponent("Go", "size-10"), position: "top-[5%] right-[10%]" },
    { icon: getIconifyComponent("PostgreSQL", "size-8"), position: "top-[40%] right-[5%]" },
    { icon: getIconifyComponent("PlanetScale", "size-8"), position: "bottom-[22%] left-[20%]" },
    { icon: getIconifyComponent("TypeScript", "size-8"), position: "bottom-[5%] left-[10%]" },
    { icon: getIconifyComponent("Kubernetes", "size-8"), position: "top-[55%] left-[5%]" },
    { icon: getIconifyComponent("React", "size-8"), position: "top-[20%] left-[70%]" },
  ];

  return (
    <section className="relative w-full overflow-hidden min-h-screen flex items-center pt-48 pb-32 mt-[-70px]">
      <div className="hero-gradient-bg absolute inset-0 w-full h-full z-0" aria-hidden="true" />
      <div className="hero-grid-bg absolute inset-0 w-full h-full z-10" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 w-full h-56 pointer-events-none z-10"
        style={{
          background: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.3) 70%, var(--background) 100%)"
        }}
        aria-hidden="true"
      />
      <div className="relative z-20 grid grid-cols-1 md:grid-cols-2 gap-24 items-center w-full max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-start gap-6 text-left">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-tight">
            Discover What Companies Build With — and <span className="text-primary">Why.</span>
          </h1>
          <p className="max-w-xl text-lg text-muted-foreground">
            Discover the tech behind successful products — with curated stories, real-world insights, and the reasons behind every choice. 
            For developers, founders, and teams making smarter decisions. 
          </p>
          <div className="flex gap-4 mt-6">
            <Button asChild size="lg" className="gap-2" variant="outline">
              <span>Explore Stacks soon!</span>
            </Button>
          </div>
        </div>
        <div className="relative h-[740px]">
          <div>
              <div className="absolute top-0 left-0 w-[320px]">
                <TechStackCard
                  isLoading={!heroCompanies || heroCompanies.length === 0}
                  name={heroCompanies?.[0]?.name || ""}
                  description={heroCompanies?.[0]?.description || ""}
                  industry={heroCompanies?.[0]?.industry?.name || ""}
                  icon={`/logos/${heroCompanies?.[0]?.logo || ""}`}
                  slug={heroCompanies?.[0]?.slug || ""}
                  teaserIcons={heroCompanies?.[0]?.teaserTechnologies?.map((tech) => ({
                    name: tech.name,
                    icon: getIconifyComponent(tech.iconName),
                  })) || []}
                />
              </div>
              <div className="absolute bottom-0 right-0 w-[320px]">
                <TechStackCard
                  isLoading={!heroCompanies || heroCompanies.length < 2}
                  name={heroCompanies?.[1]?.name || ""}
                  description={heroCompanies?.[1]?.description || ""}
                  industry={heroCompanies?.[1]?.industry?.name || ""}
                  icon={`/logos/${heroCompanies?.[1]?.logo || ""}`}
                  slug={heroCompanies?.[1]?.slug || ""}
                  teaserIcons={heroCompanies?.[1]?.teaserTechnologies?.map((tech) => ({
                    name: tech.name,
                    icon: getIconifyComponent(tech.iconName),
                  })) || []}
                />
              </div>
            </div>
          {floatingTechIcons.map((item, index) => (
            <div
              key={index}
              className={`absolute ${item.position} transition-transform`}
            >
              {item.icon}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ValueProposition() {
  const topFeatures = [
    {
      title: "Comprehensive Database",
      description:
        "Access a growing collection of tech stacks from companies worldwide, all in one place.",
        logos: {
          "Vercel": "/logos/vercel_white.svg",
          "Linear": "/logos/linear_white.svg",
          "Supabase": "/logos/supabase_white.svg",
          "Stripe": "/logos/stripe_white.svg",
        },
    },
    {
      title: "Decision Context",
      description:
        "Understand the business and technical reasons behind every technology choice.",
    },
  ];
  const bottomFeatures = [
    {
      title: "Verified Data",
      description:
        "All information is checked for accuracy and sourced from real company input or public records.",
    },
    {
      title: "Advanced Search",
      description:
        "Quickly filter and find stacks by technology, industry, or company size with powerful search tools.",
    },
    {
      title: "Global Coverage",
      description:
        "Explore tech stacks from startups and enterprises around the world, across all industries.",
    },
  ];

  return (
    <section >
      <div className="flex flex-col items-center text-center py-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-2">Make Smarter Tech Choices Today</h2>
        <p className="max-w-2xl text-muted-foreground text-lg">
          Get verified, global insights into real tech stacks—so you can make smarter technology decisions, starting now.
        </p>
      </div>
      <div className="border-y-2 border-dotted border-border">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {topFeatures.map((feature, index) => (
            <div
              key={feature.title}
              className={`p-8 ${
                index > 0 ? "border-l-2 border-dotted border-border" : ""
              }`}
            >
              <h3 className="text-2xl font-bold tracking-tight mb-2">
                {feature.title}
              </h3>
              <p className="text-lg text-muted-foreground mb-6">
                {feature.description}
              </p>
              {feature.logos ? (
                <div className="grid grid-cols-4 gap-4">
                  {Object.entries(feature.logos).map(([key, logo]) => (
                    <div
                      key={key}
                      className="aspect-square w-full rounded-xl bg-muted/50 border flex items-center justify-center"
                    >
                      <img src={logo} alt={`${key} logo`} className="h-12 w-fit max-w-24" />
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 border-t-2 border-dotted border-border">
          {bottomFeatures.map((feature, index) => (
            <div
              key={feature.title}
              className={`p-8 ${
                index > 0 ? "border-l-2 border-dotted border-border" : ""
              }`}
            >
              <h3 className="text-lg font-bold tracking-tight mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground mb-6">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedStacks() {
  // Use TanStack Query + convexQuery helper to get featured companies
  const { data: featuredCompanies } = useSuspenseQuery(
    convexQuery(api.queries.getFeaturedCompanies, {})
  );

  if (!featuredCompanies) {
    return (
      <section className="flex flex-col gap-8 items-center text-center">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          Trusted by developers worldwide
        </h2>
        <p className="max-w-xl text-muted-foreground">
          Loading featured tech stacks...
        </p>
      </section>
    );
  }

  return (
    <section className="flex flex-col gap-8 items-center text-center">
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
        Trusted by developers worldwide
      </h2>
      <p className="max-w-xl text-muted-foreground">
        From high-growth startups to established enterprises, here are a few of
        the stacks we've analyzed.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-4 w-full">
        {featuredCompanies.map((company) => (
          <TechStackCard
            key={company._id}
            name={company.name}
            description={company.description}
            industry={company.industry.name}
            icon={`/logos/${company.logo}`}
            slug={company.slug}
            teaserIcons={company.teaserTechnologies?.map((tech) => ({
              name: tech.name,
              icon: getIconifyComponent(tech.iconName),
            })) || []}
          />
        ))}
      </div>
    </section>
  );
}
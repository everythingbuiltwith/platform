import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { g as getIconifyComponent, B as Button, c as cn } from './ssr.mjs';
import { Link } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';
import { C as Card, a as CardHeader, d as CardContent, e as CardFooter } from './card-CiHul3yY.mjs';
import { B as Badge } from './badge-Rbql8X69.mjs';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import '@tanstack/react-query';
import '@tanstack/react-router-with-query';
import '@convex-dev/react-query';
import 'convex/react';
import 'react';
import '@radix-ui/react-menubar';
import 'clsx';
import 'tailwind-merge';
import '@iconify/react';
import '@radix-ui/react-slot';
import 'class-variance-authority';
import '@tanstack/history';
import '@tanstack/router-core';
import 'node:async_hooks';
import 'tiny-warning';
import 'jsesc';
import 'tiny-invariant';
import 'node:stream';
import 'isbot';
import 'react-dom/server';
import 'node:stream/web';

function TooltipProvider({
  delayDuration = 0,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    TooltipPrimitive.Provider,
    {
      "data-slot": "tooltip-provider",
      delayDuration,
      ...props
    }
  );
}
function Tooltip({
  ...props
}) {
  return /* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsx(TooltipPrimitive.Root, { "data-slot": "tooltip", ...props }) });
}
function TooltipTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsx(TooltipPrimitive.Trigger, { "data-slot": "tooltip-trigger", ...props });
}
function TooltipContent({
  className,
  sideOffset = 0,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx(TooltipPrimitive.Portal, { children: /* @__PURE__ */ jsxs(
    TooltipPrimitive.Content,
    {
      "data-slot": "tooltip-content",
      sideOffset,
      className: cn(
        "bg-secondary text-secondary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsx(TooltipPrimitive.Arrow, { className: "bg-secondary fill-secondary z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" })
      ]
    }
  ) });
}
function TechStackCard({
  name,
  description,
  industry,
  icon,
  teaserIcons,
  className
}) {
  return /* @__PURE__ */ jsxs(
    Card,
    {
      className: cn(
        "flex flex-col text-left transition-colors relative",
        className
      ),
      children: [
        /* @__PURE__ */ jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsx(Badge, { variant: "secondary", children: industry }) }),
          /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsx("img", { src: icon, alt: `${name} logo`, className: "h-12 w-fit max-w-24" }) })
        ] }),
        /* @__PURE__ */ jsxs(CardContent, { className: "flex-1 flex flex-col gap-4", children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: description }),
          /* @__PURE__ */ jsx("div", { className: "flex-1" }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 pt-4 border-t border-border", children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground font-semibold", children: "HIGHLIGHTS" }),
            /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2 text-muted-foreground", children: /* @__PURE__ */ jsx(TooltipProvider, { children: teaserIcons.map((tech) => /* @__PURE__ */ jsxs(Tooltip, { children: [
              /* @__PURE__ */ jsx(TooltipTrigger, { children: /* @__PURE__ */ jsx("div", { className: "flex items-center gap-1 text-lg", children: tech.icon }) }),
              /* @__PURE__ */ jsx(TooltipContent, { children: /* @__PURE__ */ jsx("p", { children: tech.name }) })
            ] }, tech.name)) }) })
          ] })
        ] }),
        /* @__PURE__ */ jsx(CardFooter, { children: /* @__PURE__ */ jsx(Button, { asChild: true, className: "w-full", children: /* @__PURE__ */ jsxs(Link, { to: "/stacks/" + name, children: [
          "View Stack ",
          /* @__PURE__ */ jsx(ArrowRight, { className: "size-4 ml-2" })
        ] }) }) })
      ]
    }
  );
}
const technologies = {
  nextjs: {
    name: "Next.js",
    icon: getIconifyComponent("Next.js")
  },
  react: {
    name: "React",
    icon: getIconifyComponent("React")
  },
  postgresql: {
    name: "PostgreSQL",
    icon: getIconifyComponent("PostgreSQL")
  },
  go: {
    name: "Go",
    icon: getIconifyComponent("Go")
  },
  figma: {
    name: "Figma",
    icon: getIconifyComponent("Figma")
  },
  kafka: {
    name: "Kafka",
    icon: getIconifyComponent("Kafka")
  }
};
function HeroSection() {
  const techStacks = [{
    name: "Vercel",
    description: "The platform for frontend developers, providing the speed and reliability innovators need to create at the moment of inspiration.",
    industry: "Cloud Infrastructure",
    icon: "/logos/vercel_white.svg",
    teaserIconKeys: ["nextjs", "react"]
  }, {
    name: "Linear",
    description: "The issue tracking tool you'll enjoy using. Build high-quality software, fast.",
    industry: "Developer Tools",
    icon: "/logos/linear_white.svg",
    teaserIconKeys: ["postgresql", "go"]
  }];
  const floatingTechIcons = [{
    icon: getIconifyComponent("Go", "size-10"),
    position: "top-[5%] right-[10%]"
  }, {
    icon: getIconifyComponent("PostgreSQL", "size-8"),
    position: "top-[40%] right-[5%]"
  }, {
    icon: getIconifyComponent("PlanetScale", "size-8"),
    position: "bottom-[22%] left-[20%]"
  }, {
    icon: getIconifyComponent("TypeScript", "size-8"),
    position: "bottom-[5%] left-[10%]"
  }, {
    icon: getIconifyComponent("Kubernetes", "size-8"),
    position: "top-[55%] left-[5%]"
  }, {
    icon: getIconifyComponent("React", "size-8"),
    position: "top-[20%] left-[70%]"
  }];
  return /* @__PURE__ */ jsxs("section", { className: "relative w-full overflow-hidden min-h-screen flex items-center pt-48 pb-32 mt-[-70px]", children: [
    /* @__PURE__ */ jsx("div", { className: "hero-gradient-bg absolute inset-0 w-full h-full z-0", "aria-hidden": "true" }),
    /* @__PURE__ */ jsx("div", { className: "hero-grid-bg absolute inset-0 w-full h-full z-10", "aria-hidden": "true" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 w-full h-56 pointer-events-none z-10", style: {
      background: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.3) 70%, var(--background) 100%)"
    }, "aria-hidden": "true" }),
    /* @__PURE__ */ jsxs("div", { className: "relative z-20 grid grid-cols-1 md:grid-cols-2 gap-24 items-center w-full max-w-7xl mx-auto px-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-start gap-6 text-left", children: [
        /* @__PURE__ */ jsxs("h1", { className: "text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-tight", children: [
          "Discover What Companies Build With \u2014 and ",
          /* @__PURE__ */ jsx("span", { className: "text-primary", children: "Why." })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "max-w-xl text-lg text-muted-foreground", children: "Discover the tech behind successful products \u2014 with curated stories, real-world insights, and the reasons behind every choice. For developers, founders, and teams making smarter decisions." }),
        /* @__PURE__ */ jsx("div", { className: "flex gap-4 mt-6", children: /* @__PURE__ */ jsx(Button, { asChild: true, size: "lg", className: "gap-2", children: /* @__PURE__ */ jsxs(Link, { to: "/stacks/$companyName", params: {
          companyName: "vercel"
        }, children: [
          "Explore Stacks ",
          /* @__PURE__ */ jsx(ArrowRight, { className: "size-4" })
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "relative h-[740px]", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 w-[320px]", children: /* @__PURE__ */ jsx(TechStackCard, { name: techStacks[0].name, description: techStacks[0].description, industry: techStacks[0].industry, icon: techStacks[0].icon, teaserIcons: techStacks[0].teaserIconKeys.map((key) => technologies[key]) }) }),
        /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 right-0 w-[320px]", children: /* @__PURE__ */ jsx(TechStackCard, { name: techStacks[1].name, description: techStacks[1].description, industry: techStacks[1].industry, icon: techStacks[1].icon, teaserIcons: techStacks[1].teaserIconKeys.map((key) => technologies[key]) }) }),
        floatingTechIcons.map((item, index) => /* @__PURE__ */ jsx("div", { className: `absolute ${item.position} transition-transform`, children: item.icon }, index))
      ] })
    ] })
  ] });
}
function ValueProposition() {
  const topFeatures = [{
    title: "Comprehensive Database",
    description: "Access a growing collection of tech stacks from companies worldwide, all in one place.",
    logos: {
      "Vercel": "/logos/vercel_white.svg",
      "Linear": "/logos/linear_white.svg",
      "Supabase": "/logos/supabase_white.svg",
      "Stripe": "/logos/stripe_white.svg"
    }
  }, {
    title: "Decision Context",
    description: "Understand the business and technical reasons behind every technology choice."
  }];
  const bottomFeatures = [{
    title: "Verified Data",
    description: "All information is checked for accuracy and sourced from real company input or public records."
  }, {
    title: "Advanced Search",
    description: "Quickly filter and find stacks by technology, industry, or company size with powerful search tools."
  }, {
    title: "Global Coverage",
    description: "Explore tech stacks from startups and enterprises around the world, across all industries."
  }];
  return /* @__PURE__ */ jsxs("section", { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center text-center py-8", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold mb-2", children: "Make Smarter Tech Choices Today" }),
      /* @__PURE__ */ jsx("p", { className: "max-w-2xl text-muted-foreground text-lg", children: "Get verified, global insights into real tech stacks\u2014so you can make smarter technology decisions, starting now." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "border-y-2 border-dotted border-border", children: [
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2", children: topFeatures.map((feature, index) => /* @__PURE__ */ jsxs("div", { className: `p-8 ${index > 0 ? "border-l-2 border-dotted border-border" : ""}`, children: [
        /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold tracking-tight mb-2", children: feature.title }),
        /* @__PURE__ */ jsx("p", { className: "text-lg text-muted-foreground mb-6", children: feature.description }),
        feature.logos ? /* @__PURE__ */ jsx("div", { className: "grid grid-cols-4 gap-4", children: Object.entries(feature.logos).map(([key, logo]) => /* @__PURE__ */ jsx("div", { className: "aspect-square w-full rounded-xl bg-muted/50 border flex items-center justify-center", children: /* @__PURE__ */ jsx("img", { src: logo, alt: `${key} logo`, className: "h-12 w-fit max-w-24" }) }, key)) }) : null
      ] }, feature.title)) }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 border-t-2 border-dotted border-border", children: bottomFeatures.map((feature, index) => /* @__PURE__ */ jsxs("div", { className: `p-8 ${index > 0 ? "border-l-2 border-dotted border-border" : ""}`, children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold tracking-tight mb-2", children: feature.title }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mb-6", children: feature.description })
      ] }, feature.title)) })
    ] })
  ] });
}
function FeaturedStacks() {
  const stacks = [{
    name: "Vercel",
    description: "The platform for frontend developers, providing the speed and reliability innovators need to create at the moment of inspiration.",
    industry: "Cloud Infrastructure",
    icon: "/logos/vercel_white.svg",
    teaserIconKeys: ["nextjs", "react"]
  }, {
    name: "Linear",
    description: "The issue tracking tool you'll enjoy using. Build high-quality software, fast.",
    industry: "Developer Tools",
    icon: "/logos/linear_white.svg",
    teaserIconKeys: ["postgresql", "figma"]
  }, {
    name: "Stripe",
    description: "Financial infrastructure for the internet. Millions of companies of all sizes use Stripe online and in person to accept payments.",
    industry: "Fintech",
    icon: "/logos/stripe_white.svg",
    teaserIconKeys: ["go", "kafka"]
  }, {
    name: "Supabase",
    description: "The open source Firebase alternative. Build in a weekend, scale to millions.",
    industry: "Developer Platform",
    icon: "/logos/supabase_white.svg",
    teaserIconKeys: ["postgresql", "go"]
  }];
  return /* @__PURE__ */ jsxs("section", { className: "flex flex-col gap-8 items-center text-center", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold tracking-tight", children: "Trusted by developers worldwide" }),
    /* @__PURE__ */ jsx("p", { className: "max-w-xl text-muted-foreground", children: "From high-growth startups to established enterprises, here are a few of the stacks we've analyzed." }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-4 w-full", children: stacks.map((stack) => /* @__PURE__ */ jsx(TechStackCard, { name: stack.name, description: stack.description, industry: stack.industry, icon: stack.icon, teaserIcons: stack.teaserIconKeys.map((key) => technologies[key]) }, stack.name)) })
  ] });
}
const SplitComponent = function Home() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(HeroSection, {}),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-24 md:gap-32 max-w-7xl mx-auto px-4 pt-24", children: [
      /* @__PURE__ */ jsx(ValueProposition, {}),
      /* @__PURE__ */ jsx(FeaturedStacks, {})
    ] })
  ] });
};

export { SplitComponent as component };
//# sourceMappingURL=index-BawRtS0m.mjs.map

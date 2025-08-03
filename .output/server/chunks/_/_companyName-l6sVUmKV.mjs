import { jsxs, jsx } from 'react/jsx-runtime';
import { B as Badge } from './badge-Rbql8X69.mjs';
import { useState } from 'react';
import { C as Card, a as CardHeader, b as CardTitle, d as CardContent, e as CardFooter } from './card-CiHul3yY.mjs';
import { B as Button, g as getIconifyComponent, c as cn } from './ssr.mjs';
import * as SheetPrimitive from '@radix-ui/react-dialog';
import { CircleQuestionMark, ChevronRightIcon, XIcon } from 'lucide-react';
import '@radix-ui/react-slot';
import 'class-variance-authority';
import '@tanstack/react-router';
import '@tanstack/react-query';
import '@tanstack/react-router-with-query';
import '@convex-dev/react-query';
import 'convex/react';
import '@radix-ui/react-menubar';
import 'clsx';
import 'tailwind-merge';
import '@iconify/react';
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

function Sheet({ ...props }) {
  return /* @__PURE__ */ jsx(SheetPrimitive.Root, { "data-slot": "sheet", ...props });
}
function SheetTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsx(SheetPrimitive.Trigger, { "data-slot": "sheet-trigger", ...props });
}
function SheetClose({
  ...props
}) {
  return /* @__PURE__ */ jsx(SheetPrimitive.Close, { "data-slot": "sheet-close", ...props });
}
function SheetPortal({
  ...props
}) {
  return /* @__PURE__ */ jsx(SheetPrimitive.Portal, { "data-slot": "sheet-portal", ...props });
}
function SheetOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    SheetPrimitive.Overlay,
    {
      "data-slot": "sheet-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
function SheetContent({
  className,
  children,
  side = "right",
  ...props
}) {
  return /* @__PURE__ */ jsxs(SheetPortal, { children: [
    /* @__PURE__ */ jsx(SheetOverlay, {}),
    /* @__PURE__ */ jsxs(
      SheetPrimitive.Content,
      {
        "data-slot": "sheet-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
          side === "right" && "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
          side === "left" && "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
          side === "top" && "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b",
          side === "bottom" && "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t",
          className
        ),
        ...props,
        children: [
          children,
          /* @__PURE__ */ jsxs(SheetPrimitive.Close, { className: "ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none", children: [
            /* @__PURE__ */ jsx(XIcon, { className: "size-4" }),
            /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
          ] })
        ]
      }
    )
  ] });
}
function SheetHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "sheet-header",
      className: cn("flex flex-col gap-1.5 p-4", className),
      ...props
    }
  );
}
function SheetFooter({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "sheet-footer",
      className: cn("mt-auto flex flex-col gap-2 p-4", className),
      ...props
    }
  );
}
function SheetTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    SheetPrimitive.Title,
    {
      "data-slot": "sheet-title",
      className: cn("text-foreground font-semibold", className),
      ...props
    }
  );
}
const dummyStack = {
  name: "Vercel",
  logo: "/logos/vercel_white.svg",
  intro: "The platform for frontend developers, providing the speed and reliability innovators need to create at the moment of inspiration.",
  industry: "Cloud Infrastructure",
  companyInfo: {
    size: "201-500",
    website: "https://vercel.com",
    hq: "San Francisco, CA"
  },
  tech: {
    Frontend: {
      techs: [{
        name: "Next.js"
      }, {
        name: "tRPC"
      }, {
        name: "shadcn"
      }, {
        name: "tailwindcss"
      }, {
        name: "prisma"
      }, {
        name: "not dound"
      }],
      reason: "Performance & Architecture",
      description: "voluptate elit sunt commodo commodo anim duis do non esse et et consectetur pariatur velit laboris nostrud elit adipisicing sunt duis cillum dolor sit commodo proident ut occaecat do labore mollit cillum est deserunt et amet nostrud et commodo tempor ad deserunt ipsum magna culpa in reprehenderit ea esse exercitation magna excepteur aliqua irure enim non tempor officia mollit velit magna fugiat aute magna aliquip est quis ipsum veniam nostrud anim ea laboris labore magna cupidatat anim cillum laborum irure sint anim fugiat officia eu excepteur culpa sint nostrud dolor est id et consequat nostrud adipisicing exercitation dolore excepteur culpa ex aliqua adipisicing magna dolor amet excepteur ex ea voluptate laboris duis laboris voluptate dolor esse esse do esse eu eu officia dolore ex Lorem officia in aliqua consequat aute ut ex do ex magna magna officia cillum et sunt Lorem sit non et id anim Lorem aliquip qui reprehenderit ut nostrud veniam minim magna quis incididunt proident excepteur quis exercitation proident laboris anim velit magna proident nostrud consequat duis ex elit elit id duis duis exercitation dolor non deserunt eu mollit deserunt ea quis est eiusmod Lorem nulla adipisicing sunt ipsum consectetur dolore qui est sunt labore qui elit"
    },
    Backend: {
      techs: [{
        name: "go"
      }, {
        name: "grpc"
      }],
      reason: "Business & Product Needs",
      description: ""
    },
    Database: {
      techs: [{
        name: "PostgreSQL"
      }],
      reason: "Long-Term Strategy",
      description: "voluptate elit sunt commodo commodo anim duis do non esse et et consectetur pariatur velit laboris nostrud elit adipisicing sunt duis cillum dolor sit commodo proident ut occaecat do labore mollit cillum est deserunt et amet nostrud et commodo tempor ad deserunt ipsum magna culpa in reprehenderit ea esse exercitation magna excepteur aliqua irure enim non tempor officia mollit velit magna fugiat aute magna aliquip est quis ipsum veniam nostrud anim ea laboris labore magna cupidatat anim cillum laborum irure sint anim fugiat officia eu excepteur culpa sint nostrud dolor est id et consequat nostrud adipisicing exercitation dolore excepteur culpa ex aliqua adipisicing magna dolor amet excepteur ex ea voluptate laboris duis laboris voluptate dolor esse esse do esse eu eu officia dolore ex Lorem officia in aliqua consequat aute ut ex do ex magna magna officia cillum et sunt Lorem sit non et id anim Lorem aliquip qui reprehenderit ut nostrud veniam minim magna quis incididunt proident excepteur quis exercitation proident laboris anim velit magna proident nostrud consequat duis ex elit elit id duis duis exercitation dolor non deserunt eu mollit deserunt ea quis est eiusmod Lorem nulla adipisicing sunt ipsum consectetur dolore qui est sunt labore qui elit"
    },
    Authentication: {
      techs: [{
        name: "Auth0"
      }],
      reason: "Ecosystem & Integration",
      description: "Chose Auth0 for secure, managed authentication."
    },
    "Hosting / Infrastructure": {
      techs: [{
        name: "Vercel"
      }],
      reason: "Developer Experience",
      description: "Easy deployments and previews."
    },
    Payments: {
      techs: [{
        name: "Stripe"
      }],
      reason: "Business & Product Needs",
      description: "Test bla"
    },
    "Dev Tools / CI/CD": {
      techs: [{
        name: "Github Actions"
      }],
      reason: "Integration",
      description: "Seamless with GitHub repos."
    },
    "Monitoring / logs": {
      techs: [{
        name: "Sentry"
      }],
      reason: "Error Tracking",
      description: "Real-time error monitoring."
    },
    "Other Key tools": {
      techs: [{
        name: "Figma"
      }],
      reason: "Design Collaboration",
      description: "Centralized design and prototyping."
    }
  },
  updates: {
    Frontend: [{
      techs: [{
        name: "Angular"
      }],
      reason: "Scalability or Performance Limitations",
      description: "Initial MVP was built quickly with Angular due to team experience.",
      date: "2023-11-01"
    }, {
      techs: [{
        name: "React"
      }],
      reason: "Poor Integration or Compatibility",
      description: "Switched to React for better component reusability and ecosystem.",
      date: "2022-05-15"
    }],
    Backend: [
      // Add backend updates
    ],
    Database: [
      // Add database updates
    ],
    Authentication: [
      // Add authentication updates
    ],
    "Hosting / Infrastructure": [
      // Add hosting/infrastructure updates
    ],
    "Dev Tools / CI/CD": [
      // Add dev tools/CI/CD updates
    ],
    "Monitoring / logs": [
      // Add monitoring/logs updates
    ],
    "Other Key tools": [
      // Add other key tools updates
    ]
  }
};
const WHY_CATEGORIES = ["Performance & Architecture", "Developer Experience", "Business & Product Needs", "Ecosystem & Integration", "Long-Term Strategy"];
const WHY_SWITCHED_CATEGORIES = ["Scalability or Performance Limitations", "Poor Developer Experience", "High Costs or Inefficient Resource Use", "Immature Tooling or Ecosystem", "Poor Integration or Compatibility", "Low Team Familiarity or Hiring Difficulty", "Hard to Maintain or Extend", "Misaligned with Business Direction"];
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
  },
  vercel: {
    name: "Vercel",
    icon: getIconifyComponent("Vercel")
  },
  stripe: {
    name: "Stripe",
    icon: getIconifyComponent("Stripe")
  },
  linear: {
    name: "Linear",
    icon: getIconifyComponent("Linear")
  },
  supabase: {
    name: "Supabase",
    icon: getIconifyComponent("Supabase")
  },
  typescript: {
    name: "TypeScript",
    icon: getIconifyComponent("TypeScript")
  },
  kubernetes: {
    name: "Kubernetes",
    icon: getIconifyComponent("Kubernetes")
  },
  planetscale: {
    name: "PlanetScale",
    icon: getIconifyComponent("PlanetScale")
  },
  nodejs: {
    name: "Node.js",
    icon: getIconifyComponent("Node.js")
  },
  auth0: {
    name: "Auth0",
    icon: getIconifyComponent("Auth0")
  },
  sentry: {
    name: "Sentry",
    icon: getIconifyComponent("Sentry")
  },
  githubactions: {
    name: "Github Actions",
    icon: getIconifyComponent("GitHub Actions")
  },
  trpc: {
    name: "tRPC",
    icon: getIconifyComponent("tRPC")
  },
  shadcn: {
    name: "shadcn",
    icon: getIconifyComponent("shadcn")
  },
  tailwindcss: {
    name: "tailwindcss",
    icon: getIconifyComponent("Tailwind CSS")
  },
  prisma: {
    name: "prisma",
    icon: getIconifyComponent("Prisma")
  },
  angular: {
    name: "Angular",
    icon: getIconifyComponent("Angular")
  }
};
function getWhyBadge(reason) {
  return WHY_CATEGORIES.includes(reason) ? reason : "Other";
}
function getWhySwitchedBadge(reason) {
  return WHY_SWITCHED_CATEGORIES.includes(reason) ? reason : "Other";
}
function getTechIcon(techName) {
  var _a;
  if (!techName) return null;
  const key = techName.toLowerCase().replace(/\s|\./g, "");
  return ((_a = technologies[key]) == null ? void 0 : _a.icon) || getIconifyComponent(techName);
}
const SplitComponent = function StackDetails() {
  const stack = dummyStack;
  const [expanded, setExpanded] = useState({});
  const [openSheet, setOpenSheet] = useState(null);
  function isLongContext(context) {
    return context && context.length > 80;
  }
  return /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto py-12 px-4 flex flex-col gap-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-8", children: [
      /* @__PURE__ */ jsx("img", { src: stack.logo, alt: stack.name, className: "w-60 rounded-xl p-2" }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold mb-4", children: stack.name }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: stack.intro }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-8 flex-wrap mt-4 items-center", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground", children: "Company Size" }),
            /* @__PURE__ */ jsx("div", { className: "font-medium", children: stack.companyInfo.size })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground", children: "Website" }),
            /* @__PURE__ */ jsx("a", { href: stack.companyInfo.website, className: "font-medium underline text-primary", target: "_blank", rel: "noopener noreferrer", children: stack.companyInfo.website })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground", children: "Headquarters" }),
            /* @__PURE__ */ jsx("div", { className: "font-medium", children: stack.companyInfo.hq })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground", children: "Industry" }),
            /* @__PURE__ */ jsx(Badge, { variant: "secondary", children: stack.industry })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold mb-4", children: "Overview" }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-2 gap-6", children: Object.keys(stack.tech).map((category) => {
        const currentTech = stack.tech[category];
        if (!currentTech || !currentTech.techs) return null;
        const hasUpdates = stack.updates[category] && stack.updates[category].length > 0;
        const techs = currentTech.techs;
        const reason = currentTech.reason;
        const description = currentTech.description;
        return /* @__PURE__ */ jsxs(Card, { className: "flex flex-col text-left transition-colors relative", children: [
          /* @__PURE__ */ jsxs(CardHeader, { children: [
            /* @__PURE__ */ jsx("div", { className: "flex justify-end mb-2", children: /* @__PURE__ */ jsx(Badge, { variant: "secondary", children: getWhyBadge(reason) }) }),
            /* @__PURE__ */ jsx(CardTitle, { className: "text-xl font-extrabold tracking-tight", children: category })
          ] }),
          /* @__PURE__ */ jsxs(CardContent, { className: "flex flex-col gap-4 relative pt-2", children: [
            /* @__PURE__ */ jsx("div", { className: "flex flex-wrap  items-center justify-center mb-2 gap-6", children: techs.map((tech, idx) => /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-1", children: [
              /* @__PURE__ */ jsx("div", { className: "flex items-center gap-1.5 text-4xl min-h-10", children: getTechIcon(tech.name) || /* @__PURE__ */ jsx(CircleQuestionMark, {}) }),
              /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground text-center mt-1", children: tech.name })
            ] }, tech.name + idx)) }),
            /* @__PURE__ */ jsx("div", { children: description ? isLongContext(description) ? /* @__PURE__ */ jsxs(Sheet, { children: [
              /* @__PURE__ */ jsx(SheetTrigger, { asChild: true, children: /* @__PURE__ */ jsxs("div", { className: "text-sm text-muted-foreground text-left", children: [
                description.slice(0, 250),
                /* @__PURE__ */ jsx("button", { className: "text-primary text-sm ml-2 hover:underline cursor-pointer", children: "... more" })
              ] }) }),
              /* @__PURE__ */ jsxs(SheetContent, { side: "right", className: "min-w-[500px]", children: [
                /* @__PURE__ */ jsx(SheetHeader, { children: /* @__PURE__ */ jsx(SheetTitle, { children: "Full context" }) }),
                /* @__PURE__ */ jsx("div", { className: "px-4 text-sm", children: description }),
                /* @__PURE__ */ jsx(SheetFooter, { children: /* @__PURE__ */ jsx(SheetClose, { asChild: true, children: /* @__PURE__ */ jsx(Button, { variant: "secondary", children: "Close" }) }) })
              ] })
            ] }) : /* @__PURE__ */ jsx("span", { className: "text-sm text-muted-foreground", children: description }) : /* @__PURE__ */ jsx("span", { className: "text-sm text-muted-foreground italic", children: "No further context available." }) })
          ] }),
          /* @__PURE__ */ jsx(CardFooter, { children: hasUpdates && /* @__PURE__ */ jsx("div", { className: "pt-4 mt-2 border-t border-border basis-full", children: /* @__PURE__ */ jsxs(Sheet, { children: [
            /* @__PURE__ */ jsx(SheetTrigger, { asChild: true, children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
              /* @__PURE__ */ jsxs("span", { className: "text-sm text-muted-foreground", children: [
                stack.updates[category].length,
                " past change",
                stack.updates[category].length !== 1 ? "s" : ""
              ] }),
              /* @__PURE__ */ jsx(Button, { size: "icon", className: "size-8", children: /* @__PURE__ */ jsx(ChevronRightIcon, {}) })
            ] }) }),
            /* @__PURE__ */ jsxs(SheetContent, { side: "right", className: "min-w-[500px]", children: [
              /* @__PURE__ */ jsx(SheetHeader, { children: /* @__PURE__ */ jsx(SheetTitle, { children: "Past changes" }) }),
              /* @__PURE__ */ jsxs("div", { className: "relative flex flex-col gap-0 px-4 py-4", children: [
                /* @__PURE__ */ jsx("div", { className: "absolute left-6 top-0 bottom-0 w-px bg-border", "aria-hidden": "true" }),
                stack.updates[category].map((update, idx) => /* @__PURE__ */ jsxs("div", { className: "flex flex-row items-start relative", children: [
                  /* @__PURE__ */ jsx("div", { className: "relative w-12 flex flex-col items-center", children: /* @__PURE__ */ jsx("span", { className: "absolute left-[0.05rem] w-4 h-4 rounded-full bg-primary border-2 border-background z-10" }) }),
                  /* @__PURE__ */ jsxs("div", { className: "flex-1 pb-6", children: [
                    update.date && /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground mb-2", children: (() => {
                      const d = new Date(update.date);
                      const mm = String(d.getMonth() + 1).padStart(2, "0");
                      const yyyy = d.getFullYear();
                      return `${mm}/${yyyy}`;
                    })() }),
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
                      update.techs.map((tech, tIdx) => /* @__PURE__ */ jsx("span", { className: "flex items-center text-2xl", children: getTechIcon(tech.name) || /* @__PURE__ */ jsx("span", { className: "w-6 h-6 rounded-full border-2 border-muted flex items-center justify-center" }) }, tech.name + tIdx)),
                      /* @__PURE__ */ jsx(Badge, { variant: "secondary", children: getWhySwitchedBadge(update.reason) })
                    ] }),
                    /* @__PURE__ */ jsx("div", { className: "text-sm text-muted-foreground leading-snug", children: update.description })
                  ] })
                ] }, idx))
              ] }),
              /* @__PURE__ */ jsx(SheetFooter, { children: /* @__PURE__ */ jsx(SheetClose, { asChild: true, children: /* @__PURE__ */ jsx(Button, { variant: "secondary", children: "Close" }) }) })
            ] })
          ] }) }) })
        ] }, category);
      }) })
    ] })
  ] });
};

export { SplitComponent as component };
//# sourceMappingURL=_companyName-l6sVUmKV.mjs.map

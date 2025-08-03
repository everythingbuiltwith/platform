import { createFileRoute } from '@tanstack/react-router';
import { Badge } from "@/components/ui/badge";
import { useState } from 'react';
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { getIconifyComponent } from "@/lib/icons";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetClose } from "@/components/ui/sheet";
import { Button } from '@/components/ui/button';
import { ChevronRightIcon, CircleQuestionMark, ShieldQuestion } from 'lucide-react';

// Updated dummy data for demonstration
const dummyStack = {
  id: 'vercel',
  name: 'Vercel',
  logo: '/logos/vercel_white.svg',
  intro: 'The platform for frontend developers, providing the speed and reliability innovators need to create at the moment of inspiration.',
  industry: 'Cloud Infrastructure',
  companyInfo: {
    size: '201-500',
    website: 'https://vercel.com',
    hq: 'San Francisco, CA',
  },
  tech: {
    Frontend: {
      techs: [
        { name: 'Next.js' },
        { name: 'tRPC' },
        { name: 'shadcn' },
        { name: 'tailwindcss' },
        { name: 'prisma' },
        { name: 'not dound' },
      ],
      reason: 'Performance & Architecture',
      description: 'voluptate elit sunt commodo commodo anim duis do non esse et et consectetur pariatur velit laboris nostrud elit adipisicing sunt duis cillum dolor sit commodo proident ut occaecat do labore mollit cillum est deserunt et amet nostrud et commodo tempor ad deserunt ipsum magna culpa in reprehenderit ea esse exercitation magna excepteur aliqua irure enim non tempor officia mollit velit magna fugiat aute magna aliquip est quis ipsum veniam nostrud anim ea laboris labore magna cupidatat anim cillum laborum irure sint anim fugiat officia eu excepteur culpa sint nostrud dolor est id et consequat nostrud adipisicing exercitation dolore excepteur culpa ex aliqua adipisicing magna dolor amet excepteur ex ea voluptate laboris duis laboris voluptate dolor esse esse do esse eu eu officia dolore ex Lorem officia in aliqua consequat aute ut ex do ex magna magna officia cillum et sunt Lorem sit non et id anim Lorem aliquip qui reprehenderit ut nostrud veniam minim magna quis incididunt proident excepteur quis exercitation proident laboris anim velit magna proident nostrud consequat duis ex elit elit id duis duis exercitation dolor non deserunt eu mollit deserunt ea quis est eiusmod Lorem nulla adipisicing sunt ipsum consectetur dolore qui est sunt labore qui elit'
    },
    Backend: {
      techs: [
        { name: 'go' },
        { name: 'grpc' },
      ],
      reason: 'Business & Product Needs',
      description: ''
    },
    Database: {
      techs: [
        { name: 'PostgreSQL' },
      ],
      reason: 'Long-Term Strategy',
      description: 'voluptate elit sunt commodo commodo anim duis do non esse et et consectetur pariatur velit laboris nostrud elit adipisicing sunt duis cillum dolor sit commodo proident ut occaecat do labore mollit cillum est deserunt et amet nostrud et commodo tempor ad deserunt ipsum magna culpa in reprehenderit ea esse exercitation magna excepteur aliqua irure enim non tempor officia mollit velit magna fugiat aute magna aliquip est quis ipsum veniam nostrud anim ea laboris labore magna cupidatat anim cillum laborum irure sint anim fugiat officia eu excepteur culpa sint nostrud dolor est id et consequat nostrud adipisicing exercitation dolore excepteur culpa ex aliqua adipisicing magna dolor amet excepteur ex ea voluptate laboris duis laboris voluptate dolor esse esse do esse eu eu officia dolore ex Lorem officia in aliqua consequat aute ut ex do ex magna magna officia cillum et sunt Lorem sit non et id anim Lorem aliquip qui reprehenderit ut nostrud veniam minim magna quis incididunt proident excepteur quis exercitation proident laboris anim velit magna proident nostrud consequat duis ex elit elit id duis duis exercitation dolor non deserunt eu mollit deserunt ea quis est eiusmod Lorem nulla adipisicing sunt ipsum consectetur dolore qui est sunt labore qui elit'
    },
    Authentication: {
        techs: [
            { name: 'Auth0' },
        ],
        reason: 'Ecosystem & Integration',
        description: 'Chose Auth0 for secure, managed authentication.'
    },
    'Hosting / Infrastructure':{
        techs: [
            { name: 'Vercel' },
        ],
        reason: 'Developer Experience',
        description: 'Easy deployments and previews.'
    },
    Payments:{
        techs: [
            { name: 'Stripe' },
        ],
        reason: 'Business & Product Needs',
        description: 'Test bla'
    },
    'Dev Tools / CI/CD': {
        techs: [
            { name: 'Github Actions' },
        ],
        reason: 'Integration',
        description: 'Seamless with GitHub repos.'
      },
    'Monitoring / logs': {
        techs: [
            { name: 'Sentry' },
        ],
        reason: 'Error Tracking',
        description: 'Real-time error monitoring.'
    },
    'Other Key tools': {
        techs: [
            { name: 'Figma' },
        ],
        reason: 'Design Collaboration',
        description: 'Centralized design and prototyping.'
    },
  },
  updates: {
    Frontend: [
      {
        techs: [
          { name: 'Angular' },
        ],
        reason: 'Scalability or Performance Limitations',
        description: 'Initial MVP was built quickly with Angular due to team experience.',
        date: "2023-11-01"
      },
      {
        techs: [
          { name: 'React' },
        ],
        reason: 'Poor Integration or Compatibility',
        description: 'Switched to React for better component reusability and ecosystem.',
        date: "2022-05-15"
      },
    ],
    Backend: [
      // Add backend updates
    ],
    Database: [
      // Add database updates
    ],
    Authentication: [
      // Add authentication updates
    ],
    'Hosting / Infrastructure': [
      // Add hosting/infrastructure updates
    ],
    'Dev Tools / CI/CD': [
      // Add dev tools/CI/CD updates
    ],
    'Monitoring / logs': [
      // Add monitoring/logs updates
    ],
    'Other Key tools': [
      // Add other key tools updates
    ],
  },
  techHistory: {
    Frontend: [
      'Started with Angular',
      'Switched to React',
      'Now using Next.js',
    ],
    Backend: [
      'Started and stayed with Node.js',
    ],
    Database: [
      'Started and stayed with PostgreSQL',
    ],
    Authentication: [
      'Started and stayed with Auth0',
    ],
    'Hosting / Infrastructure': [
      'Started and stayed with Vercel',
    ],
    'Dev Tools / CI/CD': [
      'Started and stayed with GitHub Actions',
    ],
    'Monitoring / logs': [
      'Started and stayed with Sentry',
    ],
    'Other Key tools': [
      'Started and stayed with Figma',
    ],
  },
};

const WHY_CATEGORIES = [
  'Performance & Architecture',
  'Developer Experience',
  'Business & Product Needs',
  'Ecosystem & Integration',
  'Long-Term Strategy',
];

const WHY_SWITCHED_CATEGORIES = [
  'Scalability or Performance Limitations',
  'Poor Developer Experience',
  'High Costs or Inefficient Resource Use',
  'Immature Tooling or Ecosystem',
  'Poor Integration or Compatibility',
  'Low Team Familiarity or Hiring Difficulty',
  'Hard to Maintain or Extend',
  'Misaligned with Business Direction',
];

const technologies = {
  nextjs: { name: "Next.js", icon: getIconifyComponent("Next.js") },
  react: { name: "React", icon: getIconifyComponent("React") },
  postgresql: { name: "PostgreSQL", icon: getIconifyComponent("PostgreSQL") },
  go: { name: "Go", icon: getIconifyComponent("Go") },
  figma: { name: "Figma", icon: getIconifyComponent("Figma") },
  kafka: { name: "Kafka", icon: getIconifyComponent("Kafka") },
  vercel: { name: "Vercel", icon: getIconifyComponent("Vercel") },
  stripe: { name: "Stripe", icon: getIconifyComponent("Stripe") },
  linear: { name: "Linear", icon: getIconifyComponent("Linear") },
  supabase: { name: "Supabase", icon: getIconifyComponent("Supabase") },
  typescript: { name: "TypeScript", icon: getIconifyComponent("TypeScript") },
  kubernetes: { name: "Kubernetes", icon: getIconifyComponent("Kubernetes") },
  planetscale: { name: "PlanetScale", icon: getIconifyComponent("PlanetScale") },
  nodejs: { name: "Node.js", icon: getIconifyComponent("Node.js") },
  auth0: { name: "Auth0", icon: getIconifyComponent("Auth0") },
  sentry: { name: "Sentry", icon: getIconifyComponent("Sentry") },
  githubactions: { name: "Github Actions", icon: getIconifyComponent("GitHub Actions") },
  trpc: { name: "tRPC", icon: getIconifyComponent("tRPC") },
  shadcn: { name: "shadcn", icon: getIconifyComponent("shadcn") },
  tailwindcss: { name: "tailwindcss", icon: getIconifyComponent("Tailwind CSS") },
  prisma: { name: "prisma", icon: getIconifyComponent("Prisma") },
  angular: { name: "Angular", icon: getIconifyComponent("Angular") },
};

function getWhyBadge(reason) {
  return WHY_CATEGORIES.includes(reason) ? reason : 'Other';
}

function getWhySwitchedBadge(reason) {
  return WHY_SWITCHED_CATEGORIES.includes(reason) ? reason : 'Other';
}

function getTechIcon(techName) {
  if (!techName) return null;
  const key = techName.toLowerCase().replace(/\s|\./g, "");
  return technologies[key]?.icon || getIconifyComponent(techName);
}

export const Route = createFileRoute('/stacks/$companyName')({
  component: StackDetails,
});

function StackDetails() {
  // In a real app, fetch stack data by Route.useParams().stackId
  const stack = dummyStack;
  // Track expanded categories
  const [expanded, setExpanded] = useState({});
  const [openSheet, setOpenSheet] = useState<string | null>(null);

  // Helper for context length
  function isLongContext(context) {
    return context && context.length > 80;
  }

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 flex flex-col gap-8">
      <div className="flex items-center gap-8">
        <img src={stack.logo} alt={stack.name} className="w-60 rounded-xl p-2" />
        <div>
          <h1 className="text-3xl font-bold mb-4">{stack.name}</h1>
          <p className="text-muted-foreground">{stack.intro}</p>
          <div className="flex gap-8 flex-wrap mt-4 items-center">
            <div>
                <div className="text-xs text-muted-foreground">Company Size</div>
                <div className="font-medium">{stack.companyInfo.size}</div>
            </div>
            <div>
                <div className="text-xs text-muted-foreground">Website</div>
                <a href={stack.companyInfo.website} className="font-medium underline text-primary" target="_blank" rel="noopener noreferrer">{stack.companyInfo.website}</a>
            </div>
            <div>
                <div className="text-xs text-muted-foreground">Headquarters</div>
                <div className="font-medium">{stack.companyInfo.hq}</div>
            </div>
            <div>
                <div className="text-xs text-muted-foreground">Industry</div>
                <Badge variant="secondary">{stack.industry}</Badge>
            </div>
        </div>
        </div>
      </div>

      

      <div>
        <h2 className="text-2xl font-bold mb-4">Overview</h2>
        <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-2 gap-6">
          {Object.keys(stack.tech).map((category) => {
            const currentTech = stack.tech[category];
            if (!currentTech || !currentTech.techs) return null;
            const hasUpdates = stack.updates[category] && stack.updates[category].length > 0;
            const techs = currentTech.techs;
            const reason = currentTech.reason;
            const description = currentTech.description;
            return (
              <Card key={category} className="flex flex-col text-left transition-colors relative">
                <CardHeader>
                    <div className="flex justify-end mb-2">
                        <Badge variant="secondary">{getWhyBadge(reason)}</Badge>
                    </div>
                  <CardTitle className="text-xl font-extrabold tracking-tight">{category}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4 relative pt-2">
                  <div className="flex flex-wrap  items-center justify-center mb-2 gap-6">
                    {techs.map((tech, idx) => (
                      <div key={tech.name + idx} className="flex flex-col items-center gap-1">
                        <div className="flex items-center gap-1.5 text-4xl min-h-10">
                          {getTechIcon(tech.name) || <CircleQuestionMark />}
                        </div>
                        <span className="text-xs text-muted-foreground text-center mt-1">{tech.name}</span>
                      </div>
                    ))}
                  </div>
                  <div>
                    {description ? (
                      isLongContext(description) ? (
                        <Sheet>
                          <SheetTrigger asChild>
                            <div className='text-sm text-muted-foreground text-left'>
                                {description.slice(0, 250)}
                                <button className="text-primary text-sm ml-2 hover:underline cursor-pointer">
                                ... more
                                </button>
                            </div>
                          </SheetTrigger>
                          <SheetContent side="right" className="min-w-[500px]">
                            <SheetHeader>
                              <SheetTitle>Full context</SheetTitle>
                            </SheetHeader>
                            <div className="px-4 text-sm">{description}</div>
                            <SheetFooter>
                                <SheetClose asChild>
                                    <Button variant="secondary">Close</Button>
                                </SheetClose>
                            </SheetFooter>
                          </SheetContent>
                        </Sheet>
                      ) : (
                        <span className="text-sm text-muted-foreground">{description}</span>
                      )
                    ) : (
                      <span className="text-sm text-muted-foreground italic">No further context available.</span>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                {hasUpdates && (
                    <div className="pt-4 mt-2 border-t border-border basis-full">
                      <Sheet>
                        <SheetTrigger asChild>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">
                                    {stack.updates[category].length} past change{stack.updates[category].length !== 1 ? 's' : ''}
                                </span>
                                <Button size="icon" className="size-8">
                                    <ChevronRightIcon />
                                </Button>
                            </div>
                        </SheetTrigger>
                        <SheetContent side="right" className="min-w-[500px]">
                          <SheetHeader>
                            <SheetTitle>Past changes</SheetTitle>
                          </SheetHeader>
                          <div className="relative flex flex-col gap-0 px-4 py-4">
                            <div className="absolute left-6 top-0 bottom-0 w-px bg-border" aria-hidden="true" />
                            {stack.updates[category].map((update, idx) => (
                              <div key={idx} className="flex flex-row items-start relative">
                                <div className="relative w-12 flex flex-col items-center">
                                  <span className="absolute left-[0.05rem] w-4 h-4 rounded-full bg-primary border-2 border-background z-10" />
                                </div>
                                <div className="flex-1 pb-6">
                                  {update.date && (
                                    <div className="text-xs text-muted-foreground mb-2">
                                      {(() => {
                                        const d = new Date(update.date);
                                        const mm = String(d.getMonth() + 1).padStart(2, '0');
                                        const yyyy = d.getFullYear();
                                        return `${mm}/${yyyy}`;
                                      })()}
                                    </div>
                                  )}
                                  <div className="flex items-center gap-2 mb-4">
                                    {update.techs.map((tech, tIdx) => (
                                      <span key={tech.name + tIdx} className="flex items-center text-2xl">
                                        {getTechIcon(tech.name) || <span className="w-6 h-6 rounded-full border-2 border-muted flex items-center justify-center" />}
                                      </span>
                                    ))}
                                    <Badge variant="secondary">{getWhySwitchedBadge(update.reason)}</Badge>
                                  </div>
                                  <div className="text-sm text-muted-foreground leading-snug">
                                    {update.description}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                          <SheetFooter>
                                <SheetClose asChild>
                                    <Button variant="secondary">Close</Button>
                                </SheetClose>
                            </SheetFooter>
                        </SheetContent>
                      </Sheet>
                    </div>
                  )}
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
} 
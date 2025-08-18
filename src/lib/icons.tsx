import React from 'react';
import { Icon } from '@iconify/react';

// Tech icon mappings using Iconify - only currently used icons
export const techIcons = {
  // Frontend
  'nextjs': { name: "Next.js", icon: <Icon icon="logos:nextjs-icon" /> },
  'react': { name: "React", icon: <Icon icon="logos:react" /> },
  'angular': { name: "Angular", icon: <Icon icon="logos:angular-icon" /> },
  'tailwindcss': { name: "Tailwind CSS", icon: <Icon icon="logos:tailwindcss-icon" /> },
  'shadcn': { name: "shadcn/ui", icon: <Icon icon="simple-icons:shadcnui" /> },
  
  // Backend
  'go': { name: "Go", icon: <Icon icon="logos:go" /> },
  'golang': { name: "Go", icon: <Icon icon="logos:go" /> },
  'nodejs': { name: "Node.js", icon: <Icon icon="logos:nodejs-icon" /> },
  
  // Databases
  'postgresql': { name: "PostgreSQL", icon: <Icon icon="logos:postgresql" /> },
  'planetscale': { name: "PlanetScale", icon: <Icon icon="simple-icons:planetscale" /> },
  'supabase': { name: "Supabase", icon: <Icon icon="logos:supabase-icon" /> },
  
  // Cloud & Infrastructure
  'vercel': { name: "Vercel", icon: <Icon icon="logos:vercel" /> },
  'vercel-icon': { name: "Vercel", icon: <Icon icon="simple-icons:vercel" /> },
  'kubernetes': { name: "Kubernetes", icon: <Icon icon="logos:kubernetes" /> },
  
  // Payment & Fintech
  'stripe': { name: "Stripe", icon: <Icon icon="logos:stripe" /> },
  
  // Authentication & Security
  'auth0': { name: "Auth0", icon: <Icon icon="simple-icons:auth0" /> },
  
  // Development Tools
  'githubactions': { name: "GitHub Actions", icon: <Icon icon="logos:github-actions" /> },
  
  // Monitoring & Analytics
  'sentry': { name: "Sentry", icon: <Icon icon="logos:sentry-icon" /> },
  
  // Communication & Collaboration
  'linear': { name: "Linear", icon: <Icon icon="logos:linear" /> },
  'figma': { name: "Figma", icon: <Icon icon="logos:figma" /> },
  
  // APIs & Services
  'trpc': { name: "tRPC", icon: <Icon icon="logos:trpc" /> },
  
  // Message Queues & Streaming
  'kafka': { name: "Kafka", icon: <Icon icon="logos:apache-kafka" /> },
  
  // ORMs & Database Tools
  'prisma': { name: "Prisma", icon: <Icon icon="logos:prisma" /> },
  
  // Languages & Runtimes
  'typescript': { name: "TypeScript", icon: <Icon icon="logos:typescript-icon" /> },

  //Tools
  'grpc': { name: "gRPC", icon: <Icon icon="logos:grpc" /> },
  
  // Social Media
  'github': { name: "GitHub", icon: <Icon icon="fa6-brands:github" /> },
  'discord': { name: "Discord", icon: <Icon icon="logos:discord" /> },
  'twitter': { name: "Twitter", icon: <Icon icon="logos:twitter" /> },
  'x': { name: "X", icon: <Icon icon="fa6-brands:x-twitter" /> },
} as const;

// Helper function to get tech icon by name
export function getTechIcon(techName: string) {
  if (!techName) return null;
  
  // Normalize the tech name for lookup
  const normalizedName = techName.toLowerCase().replace(/[^a-z0-9]/g, '');
  
  // Direct match
  if (techIcons[normalizedName as keyof typeof techIcons]) {
    return techIcons[normalizedName as keyof typeof techIcons];
  }
  
  // Try to find a partial match
  const partialMatch = Object.entries(techIcons).find(([key, value]) => 
    key.includes(normalizedName) || 
    normalizedName.includes(key) ||
    value.name.toLowerCase().includes(techName.toLowerCase()) ||
    techName.toLowerCase().includes(value.name.toLowerCase())
  );
  
  if (partialMatch) {
    return partialMatch[1];
  }
  
  // Return null if no match found
  return null;
}

// Helper function to get iconify component by name
export function getIconifyComponent(iconName: string, size?: string) {
  const tech = getTechIcon(iconName);
  if (!tech) return null;
  
  // If size is provided, clone the icon with the size class
  if (size) {
    return React.cloneElement(tech.icon, { className: size });
  }
  
  return tech.icon;
}

// Helper function to get tech name by name
export function getTechName(techName: string) {
  const tech = getTechIcon(techName);
  return tech?.name || techName;
} 
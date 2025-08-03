import type { ReactNode } from 'react'
import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import { QueryClient } from '@tanstack/react-query';
import { Layout } from "@/components/layout";
import { SpeedInsights } from '@vercel/speed-insights/next';

import appCss from "@/styles/app.css?url"

export const Route = createRootRouteWithContext<{
    queryClient: QueryClient;
  }>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'TanStack Start Starterxx',
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  component: RootComponent,
})

function RootComponent() {
  return (
    <RootDocument>
      <Layout>
        <Outlet />
      </Layout>
    </RootDocument>
  )
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <SpeedInsights />
        <Scripts />
      </body>
    </html>
  )
}
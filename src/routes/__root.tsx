import type { ReactNode } from 'react'
import {
  Outlet,
  HeadContent,
  Scripts,
  createRootRouteWithContext,
  useRouteContext,
  useLocation
} from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { QueryClient } from '@tanstack/react-query';
import { ConvexQueryClient } from '@convex-dev/react-query'
import { ConvexReactClient } from 'convex/react'
import { getCookie, getWebRequest } from '@tanstack/react-start/server'
import { ConvexBetterAuthProvider } from '@convex-dev/better-auth/react'
import { authClient } from '@/lib/auth-client'
import { fetchSession, getCookieName } from '@/lib/server-auth-utils'
import { Layout } from "@/components/layout";
import { SpeedInsights } from '@vercel/speed-insights/react';
import "@fontsource/inter/400.css"
import "@fontsource/inter/600.css"
import "@fontsource/inter/700.css"

import appCss from "@/styles/app.css?url"

export const staticTitle = ' | Everything Built With'

// Server side session request
const fetchAuth = createServerFn({ method: 'GET' }).handler(async () => {
  const sessionCookieName = await getCookieName()
  const token = getCookie(sessionCookieName)
  const request = getWebRequest()
  const { session } = await fetchSession(request)
  return {
    userId: session?.user.id,
    token,
  }
})

export const Route = createRootRouteWithContext<{
    queryClient: QueryClient
    convexClient: ConvexReactClient
    convexQueryClient: ConvexQueryClient
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
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  beforeLoad: async (ctx) => {
    const auth = await fetchAuth()
    const { userId, token } = auth

    // During SSR only (the only time serverHttpClient exists),
    // set the auth token to make HTTP queries with.
    if (token) {
      ctx.context.convexQueryClient.serverHttpClient?.setAuth(token)
    }

    return {
      userId,
      token,
    }
  },
  component: RootComponent,
})

function RootComponent() {
  const context = useRouteContext({ from: Route.id })
  const location = useLocation()
  
  // Check if we're on the signin page
  const isSignInPage = location.pathname === '/signin'
  
  return (
    <ConvexBetterAuthProvider
      client={context.convexClient}
      authClient={authClient}
    >
      <RootDocument>
        {isSignInPage ? (
          <Outlet />
        ) : (
          <Layout>
            <Outlet />
          </Layout>
        )}
      </RootDocument>
    </ConvexBetterAuthProvider>
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
        <Scripts />
        <SpeedInsights />
      </body>
    </html>
  )
}
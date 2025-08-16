import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { Icon } from '@iconify/react'
import { authClient } from '@/lib/auth-client'
import { Authenticated, Unauthenticated, AuthLoading } from 'convex/react'
import { staticTitle } from './__root'

export const Route = createFileRoute('/signin')({
  head: () => ({
    meta: [
      {
        title: `Sign In${staticTitle}`
      },
    ],
  }),
  component: SignInPage,
})

function SignInPage() {
  return (
    <>
      <AuthLoading>
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-foreground" />
            <p className="text-foreground">Loading...</p>
          </div>
        </div>
      </AuthLoading>
      <Unauthenticated>
        <SignInForm />
      </Unauthenticated>
      <Authenticated>
        <AlreadySignedIn />
      </Authenticated>
    </>
  )
}

function SignInForm() {
  const [isLoading, setIsLoading] = useState<string | null>(null)
  
  const handleSocialSignIn = async (provider: 'google' | 'github') => {
    try {
      setIsLoading(provider)
      await authClient.signIn.social(
        { provider },
        {
          onError: (ctx) => {
            setIsLoading(null)
            console.error('Authentication error:', ctx.error)
            // You could use a toast notification here instead of alert
            alert(`Authentication failed: ${ctx.error.message}`)
          },
        },
      )
    } catch (error) {
      setIsLoading(null)
      console.error('Unexpected error during sign in:', error)
      alert('An unexpected error occurred during sign in')
    }
  }

  const handleGoogleSignIn = () => handleSocialSignIn('google')
  const handleGitHubSignIn = () => handleSocialSignIn('github')

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <Card className="w-full">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Sign in</CardTitle>
            <CardDescription className="text-center">
              Choose your preferred sign in method
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Google Sign In Button */}
            <Button
              onClick={handleGoogleSignIn}
              disabled={isLoading !== null}
              className="w-full"
              variant="outline"
              size="lg"
            >
              {isLoading === 'google' ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Icon icon="logos:google-icon" className="mr-2 h-4 w-4" />
              )}
              {isLoading === 'google' ? 'Signing in...' : 'Sign in with Google'}
            </Button>

            {/* GitHub Sign In Button */}
            <Button
              onClick={handleGitHubSignIn}
              disabled={isLoading !== null}
              className="w-full"
              variant="outline"
              size="lg"
            >
              {isLoading === 'github' ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Icon icon="logos:github-icon" className="mr-2 h-4 w-4" />
              )}
              {isLoading === 'github' ? 'Signing in...' : 'Sign in with GitHub'}
            </Button>
            
            <div className="text-center text-sm text-muted-foreground">
              By signing in, you agree to our terms of service and privacy policy.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function AlreadySignedIn() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <Card className="w-full">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Already signed in</CardTitle>
            <CardDescription>
              You are already signed in to your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              onClick={() => window.location.href = '/'}
              className="w-full"
            >
              Go to Home
            </Button>
            <Button 
              onClick={() => authClient.signOut()}
              variant="outline"
              className="w-full"
            >
              Sign Out
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

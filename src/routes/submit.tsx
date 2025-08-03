import { createFileRoute } from '@tanstack/react-router'
import { TechStackSubmissionForm } from '@/components/TechStackSubmissionForm'

export const Route = createFileRoute('/submit')({
  component: SubmitPage,
})

function SubmitPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Submit Your Tech Stack</h1>
          <p className="text-muted-foreground mt-2">
            Share your company's technology stack with the community
          </p>
        </header>
        <main>
          <TechStackSubmissionForm />
        </main>
      </div>
    </div>
  )
} 
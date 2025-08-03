import { useForm } from '@tanstack/react-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useState } from 'react'
import type { AnyFieldApi } from '@tanstack/react-form'

// Schema for tech category
const techCategorySchema = z.object({
  tools: z.string().min(1, 'Tools are required'),
  description: z.string().min(1, 'Description is required'),
  why: z.string().min(1, 'Please select a reason'),
})

// Main form schema
const formSchema = z.object({
  companyName: z.string().min(1, 'Company name is required'),
  website: z.string().url('Please enter a valid URL'),
  industry: z.string().min(1, 'Please select an industry'),
  frontend: techCategorySchema,
  backend: techCategorySchema,
  database: techCategorySchema,
  authentication: techCategorySchema,
  hosting: techCategorySchema,
  payments: techCategorySchema,
  devTools: techCategorySchema,
  monitoring: techCategorySchema,
  other: techCategorySchema,
  acceptTerms: z.boolean().refine(val => val === true, 'You must accept the terms of use'),
})

type FormData = z.infer<typeof formSchema>

// Industry options
const industries = [
  'Technology',
  'E-commerce',
  'Finance',
  'Healthcare',
  'Education',
  'Entertainment',
  'Travel',
  'Real Estate',
  'Food & Beverage',
  'Automotive',
  'Manufacturing',
  'Consulting',
  'Non-profit',
  'Other',
] as const

// Why categories
const whyCategories = [
  'Scalability',
  'Performance',
  'Developer Experience',
  'Cost Efficiency',
  'Security',
  'Ecosystem',
  'Team Expertise',
  'Integration',
  'Compliance',
  'Time to Market',
] as const

// Validation functions
const validators = {
  required: (value: string) => !value ? 'This field is required' : undefined,
  url: (value: string) => {
    if (!value) return 'Website is required'
    try {
      new URL(value)
      return undefined
    } catch {
      return 'Please enter a valid URL'
    }
  },
  techCategory: {
    tools: (value: string) => !value ? 'Tools are required' : undefined,
    description: (value: string) => !value ? 'Description is required' : undefined,
    why: (value: string) => !value ? 'Please select a reason' : undefined,
  },
  terms: (value: boolean) => !value ? 'You must accept the terms of use' : undefined,
}

function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
    <>
      {field.state.meta.isTouched && !field.state.meta.isValid ? (
        <p className="text-sm text-red-500" role="alert">
          {field.state.meta.errors.join(', ')}
        </p>
      ) : null}
      {field.state.meta.isValidating ? (
        <p className="text-sm text-blue-500">Validating...</p>
      ) : null}
    </>
  )
}

export function TechStackSubmissionForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm({
    defaultValues: {
      companyName: '',
      website: '',
      industry: '',
      frontend: { tools: '', description: '', why: '' },
      backend: { tools: '', description: '', why: '' },
      database: { tools: '', description: '', why: '' },
      authentication: { tools: '', description: '', why: '' },
      hosting: { tools: '', description: '', why: '' },
      payments: { tools: '', description: '', why: '' },
      devTools: { tools: '', description: '', why: '' },
      monitoring: { tools: '', description: '', why: '' },
      other: { tools: '', description: '', why: '' },
      acceptTerms: false,
    },
    validators: {
      onChange: formSchema,
    },
    onSubmit: async ({ value }) => {
      setIsSubmitting(true)
      try {
        console.log('Form submitted:', value)
        // TODO: Implement actual submission logic
        alert('Tech stack submitted successfully!')
      } catch (error) {
        console.error('Submission error:', error)
        alert('Error submitting tech stack. Please try again.')
      } finally {
        setIsSubmitting(false)
      }
    },
  })

  const TechCategorySection = ({ 
    title, 
    description, 
    fieldName 
  }: { 
    title: string
    description: string
    fieldName: keyof Pick<FormData, 'frontend' | 'backend' | 'database' | 'authentication' | 'hosting' | 'payments' | 'devTools' | 'monitoring' | 'other'>
  }) => (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor={`${fieldName}-tools`}>Tools (comma separated)</Label>
          <form.Field
            name={`${fieldName}.tools`}
            validators={{
              onChange: ({ value }) => validators.techCategory.tools(value),
              onBlur: ({ value }) => validators.techCategory.tools(value),
            }}
          >
            {(field) => (
              <>
                <Input
                  id={`${fieldName}-tools`}
                  placeholder="e.g., React, Vue.js, Angular"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-describedby={`${fieldName}-tools-error`}
                  aria-invalid={!field.state.meta.isValid}
                />
                <FieldInfo field={field} />
              </>
            )}
          </form.Field>
        </div>

        <div className="space-y-2">
          <Label htmlFor={`${fieldName}-description`}>Description</Label>
          <form.Field
            name={`${fieldName}.description`}
            validators={{
              onChange: ({ value }) => validators.techCategory.description(value),
              onBlur: ({ value }) => validators.techCategory.description(value),
            }}
          >
            {(field) => (
              <>
                <Textarea
                  id={`${fieldName}-description`}
                  placeholder="Describe how you use these tools..."
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-describedby={`${fieldName}-description-error`}
                  aria-invalid={!field.state.meta.isValid}
                />
                <FieldInfo field={field} />
              </>
            )}
          </form.Field>
        </div>

        <div className="space-y-2">
          <Label htmlFor={`${fieldName}-why`}>Why did you choose these tools?</Label>
          <form.Field
            name={`${fieldName}.why`}
            validators={{
              onChange: ({ value }) => validators.techCategory.why(value),
              onBlur: ({ value }) => validators.techCategory.why(value),
            }}
          >
            {(field) => (
              <>
                <Select
                  value={field.state.value}
                  onValueChange={field.handleChange}
                >
                  <SelectTrigger aria-describedby={`${fieldName}-why-error`} aria-invalid={!field.state.meta.isValid}>
                    <SelectValue placeholder="Select a reason" />
                  </SelectTrigger>
                  <SelectContent>
                    {whyCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FieldInfo field={field} />
              </>
            )}
          </form.Field>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
      className="space-y-8"
      noValidate
    >
      {/* Company Information */}
      <Card>
        <CardHeader>
          <CardTitle>Company Information</CardTitle>
          <CardDescription>Basic information about your company</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name</Label>
            <form.Field
              name="companyName"
              validators={{
                onChange: ({ value }) => validators.required(value),
                onBlur: ({ value }) => validators.required(value),
              }}
            >
              {(field) => (
                <>
                  <Input
                    id="companyName"
                    placeholder="Enter your company name"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-describedby="companyName-error"
                    aria-invalid={!field.state.meta.isValid}
                  />
                  <FieldInfo field={field} />
                </>
              )}
            </form.Field>
          </div>

          <div className="space-y-2">
            <Label htmlFor="website">Website</Label>
            <form.Field
              name="website"
              validators={{
                onChange: ({ value }) => validators.url(value),
                onBlur: ({ value }) => validators.url(value),
              }}
            >
              {(field) => (
                <>
                  <Input
                    id="website"
                    type="url"
                    placeholder="https://example.com"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-describedby="website-error"
                    aria-invalid={!field.state.meta.isValid}
                  />
                  <FieldInfo field={field} />
                </>
              )}
            </form.Field>
          </div>

          <div className="space-y-2">
            <Label htmlFor="industry">Industry</Label>
            <form.Field
              name="industry"
              validators={{
                onChange: ({ value }) => validators.required(value),
                onBlur: ({ value }) => validators.required(value),
              }}
            >
              {(field) => (
                <>
                  <Select
                    value={field.state.value}
                    onValueChange={field.handleChange}
                  >
                    <SelectTrigger aria-describedby="industry-error" aria-invalid={!field.state.meta.isValid}>
                      <SelectValue placeholder="Select your industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.map((industry) => (
                        <SelectItem key={industry} value={industry}>
                          {industry}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FieldInfo field={field} />
                </>
              )}
            </form.Field>
          </div>
        </CardContent>
      </Card>

      {/* Tech Categories */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight mb-2">Technology Stack</h2>
          <p className="text-muted-foreground">
            Tell us about the technologies you use across different categories
          </p>
        </div>

        <div className="grid gap-6">
          <TechCategorySection
            title="Frontend"
            description="Client-side technologies and frameworks"
            fieldName="frontend"
          />

          <TechCategorySection
            title="Backend"
            description="Server-side technologies and APIs"
            fieldName="backend"
          />

          <TechCategorySection
            title="Database"
            description="Data storage and management solutions"
            fieldName="database"
          />

          <TechCategorySection
            title="Authentication"
            description="User authentication and authorization"
            fieldName="authentication"
          />

          <TechCategorySection
            title="Hosting & Infrastructure"
            description="Cloud platforms and deployment solutions"
            fieldName="hosting"
          />

          <TechCategorySection
            title="Payments"
            description="Payment processing and financial tools"
            fieldName="payments"
          />

          <TechCategorySection
            title="Dev Tools & CI/CD"
            description="Development tools and continuous integration"
            fieldName="devTools"
          />

          <TechCategorySection
            title="Monitoring & Logs"
            description="Application monitoring and logging solutions"
            fieldName="monitoring"
          />

          <TechCategorySection
            title="Other Key Tools"
            description="Additional tools and services you use"
            fieldName="other"
          />
        </div>
      </div>

      {/* Terms and Submit */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <form.Field
              name="acceptTerms"
              validators={{
                onChange: ({ value }) => validators.terms(value),
              }}
            >
              {(field) => (
                <>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="acceptTerms"
                      checked={field.state.value}
                      onCheckedChange={(checked) => 
                        field.handleChange(checked as boolean)
                      }
                      aria-describedby="acceptTerms-error"
                      aria-invalid={!field.state.meta.isValid}
                    />
                    <Label htmlFor="acceptTerms" className="text-sm">
                      I accept the terms of use and agree to share this information publicly
                    </Label>
                  </div>
                  <FieldInfo field={field} />
                </>
              )}
            </form.Field>

            <Separator />

            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
            >
              {([canSubmit, isSubmitting]) => (
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={!canSubmit || isSubmitting}
                  aria-disabled={!canSubmit || isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Tech Stack'}
                </Button>
              )}
            </form.Subscribe>
          </div>
        </CardContent>
      </Card>
    </form>
  )
} 
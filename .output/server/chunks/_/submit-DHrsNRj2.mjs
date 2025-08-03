import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { useForm } from '@tanstack/react-form';
import { z } from 'zod';
import { B as Button, c as cn } from './ssr.mjs';
import * as LabelPrimitive from '@radix-ui/react-label';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { ChevronDownIcon, CheckIcon, ChevronUpIcon } from 'lucide-react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardContent } from './card-CiHul3yY.mjs';
import * as SeparatorPrimitive from '@radix-ui/react-separator';
import { useState } from 'react';
import '@tanstack/react-router';
import '@tanstack/react-query';
import '@tanstack/react-router-with-query';
import '@convex-dev/react-query';
import 'convex/react';
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

function Input({ className, type, ...props }) {
  return /* @__PURE__ */ jsx(
    "input",
    {
      type,
      "data-slot": "input",
      className: cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      ),
      ...props
    }
  );
}
function Label({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    LabelPrimitive.Root,
    {
      "data-slot": "label",
      className: cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      ),
      ...props
    }
  );
}
function Textarea({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "textarea",
    {
      "data-slot": "textarea",
      className: cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      ),
      ...props
    }
  );
}
function Checkbox({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    CheckboxPrimitive.Root,
    {
      "data-slot": "checkbox",
      className: cn(
        "peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx(
        CheckboxPrimitive.Indicator,
        {
          "data-slot": "checkbox-indicator",
          className: "flex items-center justify-center text-current transition-none",
          children: /* @__PURE__ */ jsx(CheckIcon, { className: "size-3.5" })
        }
      )
    }
  );
}
function Select({
  ...props
}) {
  return /* @__PURE__ */ jsx(SelectPrimitive.Root, { "data-slot": "select", ...props });
}
function SelectValue({
  ...props
}) {
  return /* @__PURE__ */ jsx(SelectPrimitive.Value, { "data-slot": "select-value", ...props });
}
function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    SelectPrimitive.Trigger,
    {
      "data-slot": "select-trigger",
      "data-size": size,
      className: cn(
        "border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsx(SelectPrimitive.Icon, { asChild: true, children: /* @__PURE__ */ jsx(ChevronDownIcon, { className: "size-4 opacity-50" }) })
      ]
    }
  );
}
function SelectContent({
  className,
  children,
  position = "popper",
  ...props
}) {
  return /* @__PURE__ */ jsx(SelectPrimitive.Portal, { children: /* @__PURE__ */ jsxs(
    SelectPrimitive.Content,
    {
      "data-slot": "select-content",
      className: cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border shadow-md",
        position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      ),
      position,
      ...props,
      children: [
        /* @__PURE__ */ jsx(SelectScrollUpButton, {}),
        /* @__PURE__ */ jsx(
          SelectPrimitive.Viewport,
          {
            className: cn(
              "p-1",
              position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"
            ),
            children
          }
        ),
        /* @__PURE__ */ jsx(SelectScrollDownButton, {})
      ]
    }
  ) });
}
function SelectItem({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    SelectPrimitive.Item,
    {
      "data-slot": "select-item",
      className: cn(
        "focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsx("span", { className: "absolute right-2 flex size-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(SelectPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(CheckIcon, { className: "size-4" }) }) }),
        /* @__PURE__ */ jsx(SelectPrimitive.ItemText, { children })
      ]
    }
  );
}
function SelectScrollUpButton({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    SelectPrimitive.ScrollUpButton,
    {
      "data-slot": "select-scroll-up-button",
      className: cn(
        "flex cursor-default items-center justify-center py-1",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx(ChevronUpIcon, { className: "size-4" })
    }
  );
}
function SelectScrollDownButton({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    SelectPrimitive.ScrollDownButton,
    {
      "data-slot": "select-scroll-down-button",
      className: cn(
        "flex cursor-default items-center justify-center py-1",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx(ChevronDownIcon, { className: "size-4" })
    }
  );
}
function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    SeparatorPrimitive.Root,
    {
      "data-slot": "separator",
      decorative,
      orientation,
      className: cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      ),
      ...props
    }
  );
}
const techCategorySchema = z.object({
  tools: z.string().min(1, "Tools are required"),
  description: z.string().min(1, "Description is required"),
  why: z.string().min(1, "Please select a reason")
});
const formSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  website: z.string().url("Please enter a valid URL"),
  industry: z.string().min(1, "Please select an industry"),
  frontend: techCategorySchema,
  backend: techCategorySchema,
  database: techCategorySchema,
  authentication: techCategorySchema,
  hosting: techCategorySchema,
  payments: techCategorySchema,
  devTools: techCategorySchema,
  monitoring: techCategorySchema,
  other: techCategorySchema,
  acceptTerms: z.boolean().refine((val) => val === true, "You must accept the terms of use")
});
const industries = [
  "Technology",
  "E-commerce",
  "Finance",
  "Healthcare",
  "Education",
  "Entertainment",
  "Travel",
  "Real Estate",
  "Food & Beverage",
  "Automotive",
  "Manufacturing",
  "Consulting",
  "Non-profit",
  "Other"
];
const whyCategories = [
  "Scalability",
  "Performance",
  "Developer Experience",
  "Cost Efficiency",
  "Security",
  "Ecosystem",
  "Team Expertise",
  "Integration",
  "Compliance",
  "Time to Market"
];
const validators = {
  required: (value) => !value ? "This field is required" : void 0,
  url: (value) => {
    if (!value) return "Website is required";
    try {
      new URL(value);
      return void 0;
    } catch {
      return "Please enter a valid URL";
    }
  },
  techCategory: {
    tools: (value) => !value ? "Tools are required" : void 0,
    description: (value) => !value ? "Description is required" : void 0,
    why: (value) => !value ? "Please select a reason" : void 0
  },
  terms: (value) => !value ? "You must accept the terms of use" : void 0
};
function FieldInfo({ field }) {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    field.state.meta.isTouched && !field.state.meta.isValid ? /* @__PURE__ */ jsx("p", { className: "text-sm text-red-500", role: "alert", children: field.state.meta.errors.join(", ") }) : null,
    field.state.meta.isValidating ? /* @__PURE__ */ jsx("p", { className: "text-sm text-blue-500", children: "Validating..." }) : null
  ] });
}
function TechStackSubmissionForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm({
    defaultValues: {
      companyName: "",
      website: "",
      industry: "",
      frontend: { tools: "", description: "", why: "" },
      backend: { tools: "", description: "", why: "" },
      database: { tools: "", description: "", why: "" },
      authentication: { tools: "", description: "", why: "" },
      hosting: { tools: "", description: "", why: "" },
      payments: { tools: "", description: "", why: "" },
      devTools: { tools: "", description: "", why: "" },
      monitoring: { tools: "", description: "", why: "" },
      other: { tools: "", description: "", why: "" },
      acceptTerms: false
    },
    validators: {
      onChange: formSchema
    },
    onSubmit: async ({ value }) => {
      setIsSubmitting(true);
      try {
        console.log("Form submitted:", value);
        alert("Tech stack submitted successfully!");
      } catch (error) {
        console.error("Submission error:", error);
        alert("Error submitting tech stack. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  });
  const TechCategorySection = ({
    title,
    description,
    fieldName
  }) => /* @__PURE__ */ jsxs(Card, { children: [
    /* @__PURE__ */ jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsx(CardTitle, { children: title }),
      /* @__PURE__ */ jsx(CardDescription, { children: description })
    ] }),
    /* @__PURE__ */ jsxs(CardContent, { className: "space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: `${fieldName}-tools`, children: "Tools (comma separated)" }),
        /* @__PURE__ */ jsx(
          form.Field,
          {
            name: `${fieldName}.tools`,
            validators: {
              onChange: ({ value }) => validators.techCategory.tools(value),
              onBlur: ({ value }) => validators.techCategory.tools(value)
            },
            children: (field) => /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: `${fieldName}-tools`,
                  placeholder: "e.g., React, Vue.js, Angular",
                  value: field.state.value,
                  onBlur: field.handleBlur,
                  onChange: (e) => field.handleChange(e.target.value),
                  "aria-describedby": `${fieldName}-tools-error`,
                  "aria-invalid": !field.state.meta.isValid
                }
              ),
              /* @__PURE__ */ jsx(FieldInfo, { field })
            ] })
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: `${fieldName}-description`, children: "Description" }),
        /* @__PURE__ */ jsx(
          form.Field,
          {
            name: `${fieldName}.description`,
            validators: {
              onChange: ({ value }) => validators.techCategory.description(value),
              onBlur: ({ value }) => validators.techCategory.description(value)
            },
            children: (field) => /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(
                Textarea,
                {
                  id: `${fieldName}-description`,
                  placeholder: "Describe how you use these tools...",
                  value: field.state.value,
                  onBlur: field.handleBlur,
                  onChange: (e) => field.handleChange(e.target.value),
                  "aria-describedby": `${fieldName}-description-error`,
                  "aria-invalid": !field.state.meta.isValid
                }
              ),
              /* @__PURE__ */ jsx(FieldInfo, { field })
            ] })
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: `${fieldName}-why`, children: "Why did you choose these tools?" }),
        /* @__PURE__ */ jsx(
          form.Field,
          {
            name: `${fieldName}.why`,
            validators: {
              onChange: ({ value }) => validators.techCategory.why(value),
              onBlur: ({ value }) => validators.techCategory.why(value)
            },
            children: (field) => /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsxs(
                Select,
                {
                  value: field.state.value,
                  onValueChange: field.handleChange,
                  children: [
                    /* @__PURE__ */ jsx(SelectTrigger, { "aria-describedby": `${fieldName}-why-error`, "aria-invalid": !field.state.meta.isValid, children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select a reason" }) }),
                    /* @__PURE__ */ jsx(SelectContent, { children: whyCategories.map((category) => /* @__PURE__ */ jsx(SelectItem, { value: category, children: category }, category)) })
                  ]
                }
              ),
              /* @__PURE__ */ jsx(FieldInfo, { field })
            ] })
          }
        )
      ] })
    ] })
  ] });
  return /* @__PURE__ */ jsxs(
    "form",
    {
      onSubmit: (e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      },
      className: "space-y-8",
      noValidate: true,
      children: [
        /* @__PURE__ */ jsxs(Card, { children: [
          /* @__PURE__ */ jsxs(CardHeader, { children: [
            /* @__PURE__ */ jsx(CardTitle, { children: "Company Information" }),
            /* @__PURE__ */ jsx(CardDescription, { children: "Basic information about your company" })
          ] }),
          /* @__PURE__ */ jsxs(CardContent, { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "companyName", children: "Company Name" }),
              /* @__PURE__ */ jsx(
                form.Field,
                {
                  name: "companyName",
                  validators: {
                    onChange: ({ value }) => validators.required(value),
                    onBlur: ({ value }) => validators.required(value)
                  },
                  children: (field) => /* @__PURE__ */ jsxs(Fragment, { children: [
                    /* @__PURE__ */ jsx(
                      Input,
                      {
                        id: "companyName",
                        placeholder: "Enter your company name",
                        value: field.state.value,
                        onBlur: field.handleBlur,
                        onChange: (e) => field.handleChange(e.target.value),
                        "aria-describedby": "companyName-error",
                        "aria-invalid": !field.state.meta.isValid
                      }
                    ),
                    /* @__PURE__ */ jsx(FieldInfo, { field })
                  ] })
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "website", children: "Website" }),
              /* @__PURE__ */ jsx(
                form.Field,
                {
                  name: "website",
                  validators: {
                    onChange: ({ value }) => validators.url(value),
                    onBlur: ({ value }) => validators.url(value)
                  },
                  children: (field) => /* @__PURE__ */ jsxs(Fragment, { children: [
                    /* @__PURE__ */ jsx(
                      Input,
                      {
                        id: "website",
                        type: "url",
                        placeholder: "https://example.com",
                        value: field.state.value,
                        onBlur: field.handleBlur,
                        onChange: (e) => field.handleChange(e.target.value),
                        "aria-describedby": "website-error",
                        "aria-invalid": !field.state.meta.isValid
                      }
                    ),
                    /* @__PURE__ */ jsx(FieldInfo, { field })
                  ] })
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "industry", children: "Industry" }),
              /* @__PURE__ */ jsx(
                form.Field,
                {
                  name: "industry",
                  validators: {
                    onChange: ({ value }) => validators.required(value),
                    onBlur: ({ value }) => validators.required(value)
                  },
                  children: (field) => /* @__PURE__ */ jsxs(Fragment, { children: [
                    /* @__PURE__ */ jsxs(
                      Select,
                      {
                        value: field.state.value,
                        onValueChange: field.handleChange,
                        children: [
                          /* @__PURE__ */ jsx(SelectTrigger, { "aria-describedby": "industry-error", "aria-invalid": !field.state.meta.isValid, children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select your industry" }) }),
                          /* @__PURE__ */ jsx(SelectContent, { children: industries.map((industry) => /* @__PURE__ */ jsx(SelectItem, { value: industry, children: industry }, industry)) })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsx(FieldInfo, { field })
                  ] })
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold tracking-tight mb-2", children: "Technology Stack" }),
            /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Tell us about the technologies you use across different categories" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid gap-6", children: [
            /* @__PURE__ */ jsx(
              TechCategorySection,
              {
                title: "Frontend",
                description: "Client-side technologies and frameworks",
                fieldName: "frontend"
              }
            ),
            /* @__PURE__ */ jsx(
              TechCategorySection,
              {
                title: "Backend",
                description: "Server-side technologies and APIs",
                fieldName: "backend"
              }
            ),
            /* @__PURE__ */ jsx(
              TechCategorySection,
              {
                title: "Database",
                description: "Data storage and management solutions",
                fieldName: "database"
              }
            ),
            /* @__PURE__ */ jsx(
              TechCategorySection,
              {
                title: "Authentication",
                description: "User authentication and authorization",
                fieldName: "authentication"
              }
            ),
            /* @__PURE__ */ jsx(
              TechCategorySection,
              {
                title: "Hosting & Infrastructure",
                description: "Cloud platforms and deployment solutions",
                fieldName: "hosting"
              }
            ),
            /* @__PURE__ */ jsx(
              TechCategorySection,
              {
                title: "Payments",
                description: "Payment processing and financial tools",
                fieldName: "payments"
              }
            ),
            /* @__PURE__ */ jsx(
              TechCategorySection,
              {
                title: "Dev Tools & CI/CD",
                description: "Development tools and continuous integration",
                fieldName: "devTools"
              }
            ),
            /* @__PURE__ */ jsx(
              TechCategorySection,
              {
                title: "Monitoring & Logs",
                description: "Application monitoring and logging solutions",
                fieldName: "monitoring"
              }
            ),
            /* @__PURE__ */ jsx(
              TechCategorySection,
              {
                title: "Other Key Tools",
                description: "Additional tools and services you use",
                fieldName: "other"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsx(CardContent, { className: "pt-6", children: /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsx(
            form.Field,
            {
              name: "acceptTerms",
              validators: {
                onChange: ({ value }) => validators.terms(value)
              },
              children: (field) => /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
                  /* @__PURE__ */ jsx(
                    Checkbox,
                    {
                      id: "acceptTerms",
                      checked: field.state.value,
                      onCheckedChange: (checked) => field.handleChange(checked),
                      "aria-describedby": "acceptTerms-error",
                      "aria-invalid": !field.state.meta.isValid
                    }
                  ),
                  /* @__PURE__ */ jsx(Label, { htmlFor: "acceptTerms", className: "text-sm", children: "I accept the terms of use and agree to share this information publicly" })
                ] }),
                /* @__PURE__ */ jsx(FieldInfo, { field })
              ] })
            }
          ),
          /* @__PURE__ */ jsx(Separator, {}),
          /* @__PURE__ */ jsx(
            form.Subscribe,
            {
              selector: (state) => [state.canSubmit, state.isSubmitting],
              children: ([canSubmit, isSubmitting2]) => /* @__PURE__ */ jsx(
                Button,
                {
                  type: "submit",
                  className: "w-full",
                  disabled: !canSubmit || isSubmitting2,
                  "aria-disabled": !canSubmit || isSubmitting2,
                  children: isSubmitting2 ? "Submitting..." : "Submit Tech Stack"
                }
              )
            }
          )
        ] }) }) })
      ]
    }
  );
}
const SplitComponent = function SubmitPage() {
  return /* @__PURE__ */ jsx("div", { className: "container mx-auto py-8 px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto", children: [
    /* @__PURE__ */ jsxs("header", { className: "mb-8", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold tracking-tight", children: "Submit Your Tech Stack" }),
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mt-2", children: "Share your company's technology stack with the community" })
    ] }),
    /* @__PURE__ */ jsx("main", { children: /* @__PURE__ */ jsx(TechStackSubmissionForm, {}) })
  ] }) });
};

export { SplitComponent as component };
//# sourceMappingURL=submit-DHrsNRj2.mjs.map

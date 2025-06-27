# Step-by-Step Plan for Iteration 1: everythingbuiltwith.com

## 1. Project Setup & Initial Configuration
- [ ] Ensure TanStack Start is initialized and running locally
- [ ] Set up version control (if not already)
- [ ] Configure TypeScript, Prettier, and ESLint for code quality
- [ ] Install and configure Tailwind CSS v4
- [ ] Install and set up Shadcn UI components

## 2. Design System & Theming
- [ ] Set up global dark mode (default and only mode for now)
- [ ] Choose and apply Inter font as the main font
- [ ] Define and apply a main red color theme using Tailwind v4
- [ ] Use Shadcn UI components for modern, accessible UI
- [ ] Create basic layout components (Header, Footer, Container)
- [ ] Add placeholder logo and favicon

## 3. Routing & Page Structure
- [ ] Define main routes: Home, Tech Stacks, Submit Tech Stack, Imprint, Privacy, Contact
- [ ] Set up navigation bar with links to all main pages and social links

## 4. Tech Stack Data Model & Backend
- [ ] Define Convex schema for tech stacks (company, website, intro, industry, tech choices, etc.)
- [ ] Implement Convex functions for fetching and listing tech stacks
- [ ] Seed initial tech stack data (manually or via script)

## 5. Tech Stack Listing & Filtering
- [ ] Build a page to list all tech stacks in a grid or list view
- [ ] Implement filtering by industry and tech choices
- [ ] Add search functionality for company name and tech

## 6. Tech Stack Detail Page
- [ ] Create a detail page for each tech stack
- [ ] Show all company and tech stack details
- [ ] Add navigation back to list

## 7. Submit Tech Stack Form
- [ ] Build a form for users to submit a new tech stack
- [ ] Validate form fields (required, correct format, etc.)
- [ ] On submit, send form data to a designated email address (use a service like EmailJS or similar)
- [ ] Show success/failure feedback to user

## 8. Legal & Info Pages
- [ ] Create Imprint page with required legal info
- [ ] Create Privacy Policy page
- [ ] Add Contact page with contact form or email link
- [ ] Integrate c15t for cookie banner

## 9. Analytics & Feature Flags
- [ ] Integrate Posthog for analytics and feature flags

## 10. Polish & QA
- [ ] Review all pages for design consistency and responsiveness
- [ ] Test all forms and filtering/search features
- [ ] Check accessibility basics (contrast, keyboard nav)
- [ ] Add meta tags and Open Graph info for SEO/social

## 11. Deployment
- [ ] Set up deployment pipeline (Vercel, as planned)
- [ ] Update DNS settings in Ionos portal to point everythingbuiltwith.com to Vercel
- [ ] Replace the current GitHub Pages intro page with the new site
- [ ] Deploy to production domain (everythingbuiltwith.com)
- [ ] Final smoke test on production

---

**Note:**
- Always use the latest documentation for all tools and libraries
- If anything is unclear, ask for feedback before proceeding
- Work in small, incremental steps 
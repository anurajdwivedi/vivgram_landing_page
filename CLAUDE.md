# Vivgram Landing Page - Project Context

## Project Overview
Vivgram is a **Research Operations & Lifecycle Management Platform** for animal research facilities. This repo is its **marketing landing page** built with Next.js 15 (App Router).

- **Live URL**: https://vivgram.com
- **Staging App**: https://staging.compmed.io/auth/sign-in
- **Repo**: https://github.com/anurajdwivedi/vivgram_landing_page
- **Deployed on**: Vercel (auto-deploys from `main` branch)

## Tech Stack
- **Framework**: Next.js 15.1.12 (App Router) + React 19 + TypeScript 5
- **Styling**: Tailwind CSS 3.4.1 with custom design system
- **Animations**: Framer Motion 12.35 (scroll-triggered, stagger, hover effects) — hero uses CSS-only animations
- **Forms**: react-hook-form 7.71 + Zod 4.3 validation
- **Icons**: lucide-react 0.577
- **Font**: Lato (Google Fonts) — weights 300, 400, 700, 900
- **UI Components**: shadcn/ui (base-nova style) with CVA variants

## Git Workflow
- **`main`** — production branch, auto-deploys to Vercel
- **`dev`** — development branch, all work happens here
- **Push to `dev` only** unless explicitly asked to merge to `main`
- Always commit and push to `dev` first, then merge to `main` when deploying

## Design System

### Colors (Tailwind custom)
- **Primary 700**: `#0D4297` (main CTA, buttons, active states)
- **Primary 900**: `#082B63` (hero/dark section backgrounds)
- **Primary 500**: `#2563EB` (accents)
- **Gradient**: `from-[#082B63] via-[#0D4297] to-[#082B63]` (hero, mid-CTA, security)
- **Dark sections**: `bg-[#0F172A]` (footer)

### Shadows
- `card`: subtle elevation — `0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)`
- `btn-primary`: `0 1px 3px rgba(13,66,151,0.3), 0 1px 2px rgba(13,66,151,0.2)`
- `dashboard`: `0 25px 50px -12px rgba(0,0,0,0.15)`

### Animation Patterns
- **Hero**: CSS-only `animate-fade-up` keyframe with staggered `animationDelay` (no framer-motion)
- **Custom easing**: `[0.22, 1, 0.36, 1]` / `cubic-bezier(0.22, 1, 0.36, 1)` used everywhere
- **fadeUp**: opacity 0→1, y 20→0, 0.5s duration
- **Stagger children**: 0.08-0.1s delay between items
- **Scroll-triggered**: via Framer Motion `useInView` with `once: true` (non-hero sections)
- **CountUp**: Uses native `IntersectionObserver` (not framer-motion)
- **CSS animations**: `marquee-scroll` (30s), `float` (5s), `fade-up` (0.5s)
- **Reduced motion**: CSS `@media (prefers-reduced-motion)` + `useReducedMotion` hook

## Directory Structure
```
app/
├── page.tsx              # Homepage composition (dynamic imports for code-splitting)
├── layout.tsx            # Root layout, metadata, JSON-LD, fonts
├── globals.css           # Global styles, dot-grid, grain, animations, fade-up keyframe
├── sitemap.ts            # XML sitemap
components/
├── layout/
│   ├── navbar.tsx        # Fixed header, scroll-aware, full-screen mobile menu overlay
│   └── footer.tsx        # Dark footer, Team iTek link
├── sections/             # 16 page sections
│   ├── hero.tsx          # CSS animations, dashboard screenshot in browser frame, CountUp metrics
│   ├── marquee.tsx       # Scrolling feature strip
│   ├── problem-section.tsx
│   ├── features-section.tsx   # 6 feature cards with SVG illustrations
│   ├── how-it-works.tsx       # 6-step workflow timeline
│   ├── roles-section.tsx      # 5 role tabs with keyboard nav
│   ├── product-preview.tsx    # Video/screenshot preview
│   ├── testimonial-section.tsx
│   ├── mid-cta.tsx
│   ├── security-section.tsx   # 4 security feature cards
│   ├── faq-section.tsx        # 8-question accordion with ARIA
│   ├── cta-section.tsx        # Contact form (react-hook-form + Zod)
│   ├── benefits-section.tsx
│   ├── social-proof.tsx
│   ├── solution-section.tsx
│   └── workflow-section.tsx
├── shared/
│   ├── animated-section.tsx   # Fade-in on scroll wrapper
│   ├── container.tsx          # Max-width 7xl container
│   └── section-header.tsx     # Reusable section title
└── ui/
    ├── button.tsx         # CVA button variants
    ├── card.tsx           # Card layout components
    ├── badge.tsx          # Badge component
    └── separator.tsx      # Divider
lib/
├── constants.ts           # ALL data: nav links, features, roles, FAQ, etc.
├── animations.ts          # Framer Motion variants
├── utils.ts               # cn() utility (clsx + tailwind-merge)
└── hooks/
    └── use-reduced-motion.ts  # Accessibility hook
public/
├── dashboard-preview.webp # Hero dashboard screenshot (WebP, ~86KB)
├── dashboard-preview.png  # Original PNG version (345KB, kept as fallback)
├── manifest.json          # PWA manifest
└── robots.txt             # SEO robots
```

## Performance Optimizations
- **Image**: Dashboard screenshot converted from PNG (345KB) to WebP (86KB) — 75% reduction
- **Hero animations**: Pure CSS `animate-fade-up` keyframe instead of framer-motion (reduces TBT)
- **CountUp**: Uses native `IntersectionObserver` instead of framer-motion `useInView`
- **Code-splitting**: All below-the-fold sections use `next/dynamic` imports in `page.tsx`
- **Next.js image config**: AVIF/WebP auto-format, responsive `deviceSizes` and `imageSizes`
- **Responsive sizes**: Hero image uses `sizes="(max-width: 1024px) 100vw, 58vw"`
- **Font**: `display: "swap"` strategy, latin subset only

## Page Section Order (app/page.tsx)
1. Navbar (eagerly loaded)
2. Hero (eagerly loaded, CSS animations)
3. Marquee (eagerly loaded)
4. Problem Section (dynamic import)
5. Features Section (dynamic import)
6. How It Works (dynamic import)
7. Roles Section (dynamic import)
8. Product Preview (dynamic import)
9. Testimonial Section (dynamic import)
10. Mid CTA (dynamic import)
11. Security Section (dynamic import)
12. FAQ Section (dynamic import)
13. CTA Section (dynamic import)
14. Footer (dynamic import)

## Hero Section Details
- **Layout**: Flex row — left 42% (copy), right 58% (dashboard)
- **Dashboard**: Real screenshot (`/dashboard-preview.webp`) in a browser chrome frame
- **Browser frame**: macOS dots (red/yellow/green) + URL bar showing `vivgram.com`
- **Dashboard bleeds to right edge** — `rounded-l-2xl border-r-0`, no right padding
- **Badge**: "No More Spreadsheet Chaos"
- **Headline**: "Stop Managing Your Facility in Spreadsheets"
- **CTAs**: "Request a Demo" (white, primary) + "Watch Overview" (outline)
- **Value props**: 3 checkmark items below CTAs
- **Social metrics bar**: 3 CountUp animated stats at bottom
- **Animations**: CSS `FadeUp` component with staggered delays (100ms, 200ms, 300ms, etc.)

## Mobile Menu (navbar.tsx)
- Full-screen overlay (`fixed inset-0 z-40 bg-white`) using framer-motion `AnimatePresence`
- Has its own header with logo + close (X) button
- Covers entire viewport — no content bleeds through
- Links: Why Vivgram, Features, Roles, Platform, Log In, Request a Demo

## Branding
- **Logo**: Text-only "Vivgram" (no dot icon) — `text-xl font-bold`
- **Subtitle**: "Powered by Team iTek" in navbar (no link)
- **Footer**: Team iTek links to https://teamitekllc.com/
- **Mock browser URLs**: Always use `vivgram.com` (not app.vivgram.com)

## SEO & Accessibility (Completed Audit)
- Full OG/Twitter Card metadata + canonical URL
- JSON-LD SoftwareApplication schema
- sitemap.ts + robots.txt + manifest.json
- Skip-to-content link in navbar → `<main id="main-content">`
- WCAG 2.1 AA color contrast (4.5:1 minimum)
- All decorative elements have `aria-hidden="true"`
- All SVG illustrations have `role="img"` + `aria-label`
- FAQ: `aria-expanded`, `aria-controls`, `role="region"`, heading tags
- Form: `aria-required`, `aria-invalid`, `aria-describedby`, `role="alert"`
- Roles tabs: Arrow key navigation (ArrowRight/Left/Home/End)
- Video: `poster`, `<track>` captions, `aria-label` on play button
- `prefers-reduced-motion` support (CSS + JS hook)
- External links: `target="_blank" rel="noopener noreferrer"`
- Internal navigation: Next.js `<Link>` component (not `<a>`)

## Key Data in lib/constants.ts
- `navLinks`: 4 items (Why Vivgram, Features, Roles, Platform)
- `marqueeItems`: 9 scrolling feature names
- `socialMetrics`: [{value: 50, suffix: "%", label: "Time Saved..."}, ...]
- `benefits`: 6 cards with lucide icons
- `features`: 6 cards with descriptions
- `roles`: 5 objects with name, color, capabilities[], image description
- `workflowSteps`: 6 steps
- `securityFeatures`: 4 items
- `footerColumns`: 3 columns (Product, Solutions, Company)

## Important Notes
- All section backgrounds alternate: white → gradient/dark → white
- The `bg-dot-grid` CSS class creates a dot pattern overlay on dark sections
- The `Container` component = `max-w-7xl mx-auto px-6 lg:px-8`
- Hero uses CSS animations with `FadeUp` wrapper component (no framer-motion)
- Other sections use Framer Motion `useInView` with `once: true` for scroll animations
- The hero dashboard image uses `object-cover object-left-top` with `minHeight: 560px`
- PageSpeed scores (as of Mar 2024): Mobile ~85 Performance, 95 Accessibility, 96 Best Practices, 100 SEO
- Always update this CLAUDE.md when making changes to the project

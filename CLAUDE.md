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
├── page.tsx              # Vivgram homepage (renders LandingPage with brand="Vivgram")
├── mousapp/page.tsx      # MousApp homepage (renders LandingPage with brand="MousApp")
├── layout.tsx            # Root layout, metadata, JSON-LD, fonts, icon refs
├── opengraph-image.tsx   # Dynamic OG image generation (1200x630) with logo
├── favicon.ico           # Favicon (32x32, generated from logo)
├── globals.css           # Global styles, dot-grid, grain, animations, fade-up keyframe
├── sitemap.ts            # XML sitemap
components/
├── layout/
│   ├── navbar.tsx        # Fixed header, brand switcher, scroll-aware, mobile menu
│   └── footer.tsx        # Dark footer, Team iTek link (uses brand context)
├── landing-page.tsx      # Shared landing page component (accepts brand prop)
├── sections/             # Page sections
│   ├── hero.tsx          # CSS animations, person image, CountUp metrics, "Contact Us" CTA
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
├── brand-context.tsx      # BrandProvider, useBrand hook, brandText utility
├── constants.ts           # ALL data: nav links, features, roles, FAQ, etc. (uses {brand} placeholders)
├── animations.ts          # Framer Motion variants
├── utils.ts               # cn() utility (clsx + tailwind-merge)
└── hooks/
    └── use-reduced-motion.ts  # Accessibility hook
public/
├── logo.png               # Vivgram logo (468x458, mouse+bars icon with text, transparent PNG)
├── favicon-16x16.png      # 16px favicon
├── favicon-32x32.png      # 32px favicon
├── apple-touch-icon.png   # 180px Apple touch icon
├── icon-192x192.png       # 192px PWA icon
├── icon-512x512.png       # 512px PWA icon
├── hero-person.png        # Hero person image, transparent background (1200x800, ~527KB)
├── hero-person.jpg        # Original person image with white bg (kept as source)
├── dashboard-preview.webp # Dashboard screenshot (WebP, ~86KB) — kept for reference
├── dashboard-preview.png  # Original PNG version (345KB) — kept for reference
├── manifest.json          # PWA manifest (references all icon sizes)
└── robots.txt             # SEO robots
```

## Performance Optimizations
- **Image**: Dashboard screenshot converted from PNG (345KB) to WebP (86KB) — 75% reduction
- **Hero animations**: Pure CSS `animate-fade-up` keyframe instead of framer-motion (reduces TBT)
- **CountUp**: Uses native `IntersectionObserver` instead of framer-motion `useInView`
- **Code-splitting**: All below-the-fold sections use `next/dynamic` imports in `page.tsx`
- **Next.js image config**: AVIF/WebP auto-format, responsive `deviceSizes` and `imageSizes`
- **Responsive sizes**: Hero person uses `sizes="(max-width: 768px) 60vw, (max-width: 1024px) 45vw, 400px"`
- **Font**: `display: "swap"` strategy, latin subset only

## Multi-Brand Architecture
- **BrandContext**: `lib/brand-context.tsx` — provides `useBrand()` hook and `brandText()` utility
- **Brands**: "Vivgram" (`/`) and "MousApp" (`/mousapp`) — identical content, different app name
- **Shared component**: `components/landing-page.tsx` — accepts `brand` prop, wraps in `BrandProvider`
- **Routes**: `app/page.tsx` → Vivgram, `app/mousapp/page.tsx` → MousApp
- **Brand switcher**: Dark bar fixed above navbar with dropdown to switch between brands
- **Constants**: Role descriptions use `{brand}` placeholders, replaced at render via `brandText()`
- **Nav links**: `getNavLinks(brand)` returns brand-specific nav (e.g., "Why Vivgram" / "Why MousApp")

## Page Section Order (components/landing-page.tsx)
1. Navbar (eagerly loaded, includes brand switcher bar)
2. Hero (eagerly loaded, CSS animations)
3. Marquee (eagerly loaded)
4. Problem Section (dynamic import)
5. Features Section (dynamic import)
6. How It Works (dynamic import)
7. Roles Section (dynamic import)
8. Testimonial Section (dynamic import)
9. Mid CTA (dynamic import)
10. Security Section (dynamic import)
11. FAQ Section (dynamic import)
12. CTA Section (dynamic import)
13. Footer (dynamic import)

## Hero Section Details
- **Layout**: Flex row — left 50% (copy), right 45% (person image, flex-1)
- **Person image**: `/hero-person.png` — professional in blue shirt, arms crossed (transparent bg via rembg, 495x678)
- **No decorative elements** behind the person — clean, minimal look
- **Person positioning**: `justify-center` — centered within the right container
- **Person sizing**: `lg:h-[540px] xl:h-[600px]` with responsive mobile sizing (`w-[70%] md:w-[60%]`)
- **Badge**: "No More Spreadsheet Chaos"
- **Headline**: "Stop Managing Your Facility in Spreadsheets" (fits 2 lines at `lg:text-[2.75rem] xl:text-[3.25rem]`)
- **CTA**: Single "Contact Us" button (white, primary) — "Watch Overview" removed
- **Value props**: 3 checkmark items below CTA
- **Social metrics bar**: 3 CountUp animated stats at bottom
- **Animations**: CSS `FadeUp` component with staggered delays (100ms, 200ms, 300ms, etc.)

## Navbar (navbar.tsx)
- Brand switcher bar: dark `bg-[#061B3F]` fixed bar at `z-[60]` above navbar (34px height)
- Navbar sits at `top-[34px]` to account for switcher bar
- "Contact Us" button hidden by default, appears on scroll (`opacity-0 → opacity-100` with translate transition)
- On scroll: white bg with blur, "Contact Us" button slides in with primary-700 style
- All text (logo name, nav links) uses `brand` from context

## Mobile Menu (navbar.tsx)
- Full-screen overlay (`fixed inset-0 z-40 bg-white`) using framer-motion `AnimatePresence`
- Has its own header with logo + close (X) button
- Covers entire viewport — no content bleeds through
- Links: Why {brand}, Features, Roles, Platform, Log In, Contact Us

## Branding
- **Logo**: Image (`/logo.png`) — mouse silhouette + bar chart icon in rounded square frame
- **Logo usage**: Navbar (desktop + mobile) and footer show 36x35px logo image + "Vivgram" text
- **Logo on dark bg**: Uses `brightness-0 invert` CSS filter to make logo white
- **Subtitle**: "Powered by Team iTek" in navbar (no link)
- **Footer**: Team iTek links to https://teamitekllc.com/
- **Mock browser URLs**: Always use `vivgram.com` (not app.vivgram.com)
- **Favicon**: Generated from logo at 16x16 and 32x32 (ICO in `app/favicon.ico`)
- **OG Image**: Dynamic via `app/opengraph-image.tsx` — shows logo + brand gradient + tagline stats

## SEO & Accessibility (Completed Audit)
- `metadataBase` set to `https://vivgram.com` for proper OG/icon URL resolution
- Full OG/Twitter Card metadata + canonical URL
- Dynamic OG image (`app/opengraph-image.tsx`) with logo, brand gradient, and tagline
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
- `getNavLinks(brand)`: 4 items (Why {brand}, Features, Roles, Platform)
- `navLinks`: default Vivgram nav links (backward compat)
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
- Hero uses person image with decorative background shape (Cayuse-style layout)
- PageSpeed scores (as of Mar 2024): Mobile ~85 Performance, 95 Accessibility, 96 Best Practices, 100 SEO
- Always update this CLAUDE.md when making changes to the project

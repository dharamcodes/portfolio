# Dharmendra Awasthi — Professional Portfolio

A premium, modern developer portfolio website for Dharmendra Awasthi (Tech Lead / Lead Engineer). Built with **Next.js 16**, **React 19**, and **Vanilla CSS** to deliver high-performance static pages, custom transitions, and deep integration with search engines and LLM search agents.

---

## 🚀 Tech Stack

- **Framework**: Next.js 16 (App Router, Static HTML Export)
- **UI & Logic**: React 19, TypeScript
- **Styling**: Vanilla CSS (Custom properties, modern flex/grid grids, Glassmorphic overlays)
- **State & Theme**: `next-themes` (Dark/Light mode support)
- **Analytics**: Vercel Web Analytics
- **Crawl Observability**: Programmatic Robots & Sitemap compilers

---

## ✨ Features & Optimizations

### 1. Dynamic Content Pipeline
All website sections, SEO metadata, and structured schemas are driven dynamically from a single source of truth: [`src/data/resume.json`](file:///Users/dharam.dev/devspace/portfolio/src/data/resume.json). Modifying this JSON immediately compiles updates across the home page, privacy policy page, metadata headers, sitemaps, and LLM text targets.

### 2. Large Language Model & AI Search Ingestion (LLMO / GEO)
Optimized to ensure AI search engines (like Gemini, Perplexity, and ChatGPT Search) parse and represent Dharmendra's profile with high accuracy:
- **`llms.txt` & `llms-full.txt`**: Serves structured markdown-encoded versions of the resume directly at the root (`/llms.txt`, `/llms-full.txt`).
- **Dynamic Schema.org `@graph`**: Generates nested JSON-LD linked schemas for the `Person` profile. The graph maps education history, skills, featured projects (as `SoftwareSourceCode` items), and publications (as `BlogPosting` items) so crawlers index them semantically.
- **AI Crawler Directives**: Programmatic [`robots.ts`](file:///Users/dharam.dev/devspace/portfolio/src/app/robots.ts) explicitly configures rules allowing AI crawlers (`GPTBot`, `ClaudeBot`, `PerplexityBot`, etc.) direct access to the structured markdown files.

### 3. Hydration-Safe Transitions & Animations
- **Alternating Scroll Reveals**: Uses a client-side [`ScrollReveal.tsx`](file:///Users/dharam.dev/devspace/portfolio/src/components/ScrollReveal.tsx) component wrapper with an `IntersectionObserver` to trigger alternating left/right slide-in CSS transitions as sections scroll into view.
- **Horizontal Page Transitions**: Injects a custom `.page-slide-in` CSS animation to translate content from the side on layout mounts.
- **Hydration Mismatch Mitigation**: Extracted critical SVG positioning and layout typography inline styles to static stylesheet class rules in [`globals.css`](file:///Users/dharam.dev/devspace/portfolio/src/app/globals.css). This prevents third-party dark mode or translator browser extensions (e.g. *Dark Reader*) from modifying inline style attributes before mounting, ensuring zero-warning React console logs.

### 4. Interactive UI Elements
- **Card-level Interactivity**: Project showcases are compiled as active clickable card anchors. Hovering displays code exploration overlays and clicking anywhere on the card navigates directly to the project's repository.
- **Light/Dark Mode**: High-contrast, accessibility-audited color profiles mapped via CSS variables.

---

## 📦 Directory Structure

```txt
├── public/                  # Static assets (images, PDFs, LLM markdown assets)
│   ├── llms.txt             # High-level resume markdown for LLMs
│   ├── llms-full.txt        # Full work experience resume markdown for LLMs
│   └── Resume_Dharmendra.pdf
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── globals.css      # Design tokens, variables, and animations
│   │   ├── layout.tsx       # Root layout compiling dynamic metadata & JSON-LD
│   │   ├── page.tsx         # Home view rendering components from resume.json
│   │   ├── privacy/         # Privacy Policy page
│   │   ├── robots.ts        # Programmatic robots.txt generator (force-static)
│   │   └── sitemap.ts       # Programmatic sitemap.xml generator (force-static)
│   ├── components/          # Shared components (Header, Theme toggle)
│   └── data/
│       └── resume.json      # Single source of truth database
├── package.json
└── next.config.ts           # Configured for static HTML exports
```

---

## 🛠 Local Development

```bash
# Install dependencies
npm install

# Run hot-reloading development server
npm run dev

# Run static HTML compilation export (outputs to /out)
npm run build
```

---

## 🌐 Deployment to GitHub Pages / Vercel

The build pipeline compiles to static files (`output: 'export'`) under `/out`.

### Build configuration
Set your target deployment URL by specifying the `NEXT_PUBLIC_SITE_URL` build-time environment variable:
```bash
NEXT_PUBLIC_SITE_URL=https://dharam.dev npm run build
```
This ensures sitemap URLs, robots rules, canonical tags, and OpenGraph images resolve with absolute URLs.

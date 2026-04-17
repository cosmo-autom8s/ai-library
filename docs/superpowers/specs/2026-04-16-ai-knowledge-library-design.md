# AI Knowledge Library — Design Spec

> Design spec for the Autom8Lab AI Knowledge Library. Approved 2026-04-16.
> Primary design reference: theresanaiforthat.com (TAAFT)

---

## 1. Product Overview

A public AI Knowledge Library — a Next.js dashboard-style app that serves as a searchable, browsable home for AI resources: prompts, agents, workflows, tools, curated external resources, and blog posts. Organized by business problem, tagged by tool, searchable across everything.

**Part of the 75 Hard AI Challenge.** Every commit is timestamped proof-of-work. Git history = progress story.

**Brand:** Autom8Lab — sharp, practical, technical, calm, operational. Dark, premium, useful.

---

## 2. Design Reference

Primary inspiration: [theresanaiforthat.com](https://theresanaiforthat.com)

**Approach:** Hybrid — TAAFT layout structure as the blueprint, built with shadcn/ui components, skinned with Autom8Lab design tokens. The saved TAAFT HTML/screenshots are layout references, not code to copy.

**Reference files in `docs/design-references/`:**

| File | What it shows | Used for |
|---|---|---|
| `There's An AI For That - frontpage exact.html` | Full page save with assets | CSS/layout reference |
| `There's An AI For That® — single-page.html` | SingleFile self-contained save | Offline reference |
| `TAAFT - Homepage ss - top.png` | Top nav, hero, type chips, search, tabs | Homepage above-the-fold layout |
| `TAAFT - Homepage ss - first scroll.png` | Scroll transition, card feed begins | Sticky scroll behavior reference |
| `TAAFT - Homepage ss - second scroll - just released section.png` | Full card feed, two-column layout | Entry card anatomy |
| `TAAFT - Homepage ss - third scroll - just released section and navbar on the left.png` | Left sidebar expanded | Sidebar navigation structure |
| `TAAFT - Personal page from the top header.png` | Category page with subcategory chips, filters | Category page layout |
| `TAAFT - Models page from the middle of front page.png` | Type filter page with search, sort, date range | Filter/search UX patterns |

---

## 3. Page Structure & Layout

### Global Shell

- **Top nav bar** — fixed/sticky. Left: Autom8Lab logo. Center: 7 category pills. Right: search icon (Cmd+K shortcut).
- **Left sidebar** — collapsible icon rail on desktop (expands on hover to show labels), hamburger drawer on mobile. Contains: Home, Search, About.
- **Main content area** — centered, max-width container, generous padding.

### Homepage (top to bottom)

1. **Hero** — "AI Knowledge Library" heading (Satoshi), one-line subtitle positioning Autom8Lab
2. **Type chips row** — Prompts (count), Agents (count), Workflows (count), Tools (count), Resources (count), Posts (count). Clickable filters on the feed.
3. **Search bar** — centered, prominent, Cmd+K hint
4. **Tabs** — Latest / Featured / Trending. **Sticky behavior:** pins below top nav when scrolled to.
5. **Entry card feed** — two-column grid on desktop, single column mobile.

### Sticky Scroll Behavior (critical UX detail)

Three layers:
1. **Top nav** — always fixed at top
2. **Hero + type chips + search** — static/stationary. Content scrolls OVER it, creating a parallax/overlay effect. Disappears behind the rising card feed.
3. **Tab row** — becomes sticky once it reaches the top nav. Pins there as the header for the scrolling feed.

### Category Page (`/category/[slug]`)

- Breadcrumb (Home > Category Name)
- Category title + entry count + short intro copy
- Tag sub-filter chips (tools relevant to this category)
- Entry card grid, filterable

### Entry Detail Page (`/entry/[slug]`)

- Full-width article layout, MDX rendered with syntax highlighting
- Top or sidebar meta: category, type badge, tags, published date
- "Related entries" section at bottom

### Tag Page (`/tag/[tag]`)

- Similar to category page, filtered by tool tag

### About Page (`/about`)

- Static MDX page with positioning copy

---

## 4. Entry Card Anatomy

Each card in the feed grid contains:

- **Icon/thumbnail** — left side. Tool logo/favicon for entries with `sourceUrl`, type icon for others
- **Title** — Satoshi, bold, clickable (links to detail page)
- **Description** — 1-2 lines, Cabinet Grotesk, truncated
- **Tags** — small pill badges (e.g. `Claude`, `n8n`)
- **Type badge** — colored indicator: Prompt / Agent / Workflow / Tool / Resource / Post
- **Category label** — subtle, shows business problem area
- **Date** — relative ("2h ago") or absolute ("Apr 16, 2026")
- **Featured indicator** — amber `#f59e0b` badge for `featured: true` entries

**Card styling:**
- Glass surface: `rgba(255,255,255,0.03)` with border `rgba(255,255,255,0.06)`
- Hover: subtle border brighten or opacity shift
- Rounded corners, generous internal padding
- No heavy shadows, no decorative animation

---

## 5. Data Architecture & Content Pipeline

### Content Storage

MDX files in the git repo. No database, no CMS.

```
/content/
  entries/
    my-first-prompt.mdx
    sales-outreach-agent.mdx
    n8n-lead-scoring-workflow.mdx
    week-1-recap.mdx          <- type: 'post'
```

Flat directory — no nesting by category or type. Velite handles filtering via schema fields.

### Entry Schema (Velite)

```typescript
{
  title: string              // entry name
  slug: string               // auto from filename
  description: string        // 1-2 sentences for card display
  category: enum             // one of 7 business problem slugs
  type: enum                 // 'prompt' | 'agent' | 'workflow' | 'tool' | 'resource' | 'post'
  tags: string[]             // tools/tech (e.g. ['claude', 'n8n'])
  featured: boolean          // editor's pick, amber highlight
  publishedAt: date          // ISO date, used for sorting
  sourceUrl?: string         // optional external link
  body: MDX                  // full content, rendered on detail page
}
```

### MDX File Format

```mdx
---
title: "Sales Outreach Email Generator"
description: "A Claude prompt that generates personalized cold outreach emails based on prospect LinkedIn data."
category: sales
type: prompt
tags: [claude, prompt-engineering, sales]
featured: true
publishedAt: 2026-04-16
sourceUrl: ""
---

## What it does

...full MDX content here...
```

### Build Pipeline

1. Velite reads `/content/entries/*.mdx` at build time
2. Validates every file against the schema (type-safe, catches errors)
3. Generates typed data: `import { entries } from '.velite'`
4. Pages query this data — filter by category, type, tag, sort by date
5. Counts computed at build time (e.g. "Prompts (12)" in type chips)

---

## 6. Categories & Taxonomy

### 7 Business Problem Categories

| Category | Slug | Short Label (nav pill) |
|---|---|---|
| AI for Sales & Lead Generation | `sales` | Sales |
| AI for Operations & Workflow Efficiency | `operations` | Operations |
| AI for Content & Marketing | `content-marketing` | Content |
| AI for Client Communication & Support | `client-support` | Client Support |
| AI for Data, Reporting & Decision Making | `data-decisions` | Data |
| AI for Personal Productivity & Learning | `productivity` | Productivity |
| AI for Personal Development & Growth | `personal` | Personal Dev |

### Entry Types

| Type | Description |
|---|---|
| `prompt` | Standalone prompts, prompt templates |
| `agent` | AI agent configurations, system prompts |
| `workflow` | Multi-step automations (n8n, Make, etc.) |
| `tool` | Software tools, utilities, scripts |
| `resource` | Curated external links, guides, references |
| `post` | Blog posts, recaps, announcements |

### Tags

Start loose, consolidate in Week 4. Examples: `claude`, `chatgpt`, `n8n`, `make`, `zapier`, `claude-code`, `prompt-engineering`, `workflow-automation`, `rag`, `llm`, `ai-agents`.

---

## 7. Navigation & Routing

### URL Structure

| Page | Route |
|---|---|
| Homepage | `/` |
| Category | `/category/[slug]` |
| Entry detail | `/entry/[slug]` |
| Tag | `/tag/[tag]` |
| About | `/about` |

### Top Nav (category pills)

- 7 pills, always visible on desktop, horizontally scrollable on mobile
- Active state: `#3b82f6` blue background on current category page

### Left Sidebar (icon rail)

- Home, Search, About
- Icon-only on desktop, expands on hover to show labels
- Mobile: hamburger menu opens drawer overlay

### Search (Cmd+K)

- Fuse.js client-side fuzzy search across title, description, and tags
- Triggered by: search bar click, sidebar search icon, Cmd+K shortcut
- Results appear as filtered card grid inline
- v1: text search only, no advanced filter dropdowns

### Type Chips (homepage)

- Clicking a type chip filters the homepage feed to that type
- Click again to deselect (show all)
- Filters, not navigation — they don't change the URL

---

## 8. Visual Design System

### Colors (dark-only v1, light-mode ready architecture)

| Token | Value | Usage |
|---|---|---|
| Background | `#0b0f1a` | Main page background |
| Card surface | `rgba(255,255,255,0.03)` | Glass card fill |
| Card border | `rgba(255,255,255,0.06)` | Glass card border |
| Border/divider | `#1e293b` | Inputs, secondary buttons, dividers |
| Heading text | `#f1f5f9` | Primary headings, important labels |
| Body text | `#94a3b8` | Main body copy |
| Helper text | `#64748b` | Captions, footer detail |
| Action blue | `#3b82f6` | CTAs, badges, selected/active states |
| Blue hover | `#60a5fa` | Hover state for blue elements |
| Amber accent | `#f59e0b` | Featured badges, special highlights (sparingly) |

**Rule:** All tokens defined globally in Tailwind config. One place to change everything.

### Typography

| Role | Font | Usage |
|---|---|---|
| Display | Satoshi (self-hosted) | Hero, section headings, card titles |
| Body | Cabinet Grotesk (self-hosted) | Body text, nav, forms, helper text |

Tailwind mapping:
```js
fontFamily: {
  display: ['Satoshi', 'system-ui', 'sans-serif'],
  body: ['Cabinet Grotesk', 'system-ui', 'sans-serif'],
}
```

### Component Styling

- Glass cards: subtle depth via surface transparency + border, no heavy shadows
- Rounded corners on cards, pills, inputs
- Generous spacing — no cramped layouts
- Hover states: subtle border brighten or opacity shift
- Type badges: each type gets a distinct muted color for visual scanning
- Featured badge: amber `#f59e0b`
- No loud gradients, no decorative animations

### Responsive

- Mobile-first build
- Card grid: 2 columns desktop, 1 column mobile
- Top nav pills: horizontal scroll on mobile
- Sidebar: hidden on mobile, hamburger opens drawer

---

## 9. Technical Implementation

### Stack

- **Next.js 16** (App Router)
- **Tailwind v4** + **shadcn/ui**
- **Velite** for MDX processing
- **Fuse.js** for client-side search
- **Vercel** for deployment
- **`vercel.ts`** for project config

### Rendering Strategy

- All pages statically generated at build time (SSG)
- No server-side rendering — content changes only on deploy
- `generateStaticParams` for entry, category, and tag pages

### Component Architecture

Server Components by default. `'use client'` only where needed.

| Component | Type | Purpose |
|---|---|---|
| `TopNav` | Server | Category pills, logo, search trigger |
| `Sidebar` | Client | Collapsible icon rail, mobile drawer |
| `HeroSection` | Server | Heading, subtitle |
| `TypeChips` | Client | Filterable type pills with counts |
| `SearchBar` | Client | Fuse.js input, Cmd+K trigger |
| `TabRow` | Client | Latest/Featured/Trending, sticky on scroll |
| `EntryCard` | Server | Individual card in feed grid |
| `EntryGrid` | Client | Two-column grid, handles filter state |
| `CategoryPage` | Server | Category layout with sub-filters |
| `EntryDetail` | Server | Full MDX article renderer |
| `TagPills` | Server | Clickable tag badges |

### SEO

- Next.js Metadata API for per-page title/description
- OG images (static v1, dynamic later)
- Sitemap generated from entry slugs at build time

---

## 10. Scope Boundary

### v1 Includes
- Homepage with hero, type chips, search, tabs, entry feed
- 7 category pages
- Entry detail pages (full MDX rendering)
- Tag pages
- About page
- Client-side fuzzy search
- Sticky scroll behavior (TAAFT-style)
- Glass card design system
- Mobile-responsive layout
- SEO basics (metadata, sitemap)
- 3 dummy entries to validate schema

### v1 Does NOT Include
- Authentication / user accounts
- Comments or community features
- Admin panel or CMS
- Server-side search
- Analytics (Week 4 task)
- Light mode (architecture supports it, not built yet)
- Dynamic OG images
- RSS feed
- Newsletter signup
- "For You" personalization (tab exists as placeholder, shows same as Latest)

---

## 11. Open Questions (to resolve during implementation)

- Exact subdomain for production deploy
- Existing resources page URL for redirect planning
- "Trending" tab in v1: alias for "Featured" (shows `featured: true` entries). No algorithm until there's usage data.
- OG image approach (static placeholder vs. generated)

# AI Knowledge Library Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a public AI Knowledge Library — a TAAFT-inspired dashboard app for browsing, filtering, and searching AI resources (prompts, agents, workflows, tools, curated links, blog posts), skinned with the Autom8Lab brand.

**Architecture:** Next.js 16 App Router with static site generation. MDX files in `/content/entries/` are the content source, processed by Velite at build time into typed collections. shadcn/ui components styled with Autom8Lab design tokens. Fuse.js for client-side search.

**Tech Stack:** Next.js 16, Tailwind v4, shadcn/ui, Velite, Fuse.js, Vercel

**Design Reference:** theresanaiforthat.com — screenshots and saved HTML in `docs/design-references/`

---

## File Structure

```
ai-knowledge-library/
├── content/
│   └── entries/                    # MDX library entries (flat)
│       ├── sales-outreach-prompt.mdx
│       ├── n8n-lead-scoring.mdx
│       └── welcome-post.mdx
├── public/
│   └── fonts/
│       ├── Satoshi-Variable.woff2
│       ├── Satoshi-VariableItalic.woff2
│       ├── CabinetGrotesk-Variable.woff2
│       └── OFL.txt
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout: TopNav + Sidebar + main area
│   │   ├── page.tsx                # Homepage
│   │   ├── globals.css             # Tailwind directives + font faces + design tokens
│   │   ├── category/
│   │   │   └── [slug]/
│   │   │       └── page.tsx        # Category page
│   │   ├── entry/
│   │   │   └── [slug]/
│   │   │       └── page.tsx        # Entry detail page
│   │   ├── tag/
│   │   │   └── [tag]/
│   │   │       └── page.tsx        # Tag page
│   │   └── about/
│   │       └── page.tsx            # About page
│   ├── components/
│   │   ├── top-nav.tsx             # Fixed top bar: logo + category pills + search trigger
│   │   ├── sidebar.tsx             # Collapsible icon rail + mobile drawer
│   │   ├── hero-section.tsx        # Homepage hero: heading + subtitle
│   │   ├── type-chips.tsx          # Filterable type pills with counts
│   │   ├── search-bar.tsx          # Fuse.js search input + Cmd+K
│   │   ├── tab-row.tsx             # Latest/Featured/Trending tabs, sticky
│   │   ├── entry-card.tsx          # Single card for the feed grid
│   │   ├── entry-grid.tsx          # Two-column grid with filter state
│   │   ├── entry-detail.tsx        # MDX article renderer with meta
│   │   ├── tag-pills.tsx           # Clickable tag badges
│   │   ├── breadcrumb.tsx          # Breadcrumb navigation
│   │   └── mdx-components.tsx      # Custom MDX component overrides
│   └── lib/
│       ├── entries.ts              # Helper functions: sort, filter, group entries
│       ├── search.ts               # Fuse.js search configuration
│       └── constants.ts            # Categories, types, type colors definitions
├── velite.config.ts                # Velite schema + content config
├── vercel.ts                       # Vercel project config
├── next.config.ts                  # Next.js config (Velite plugin)
├── tailwind.config.ts              # Design tokens: colors, fonts, spacing
├── tsconfig.json
├── package.json
└── .gitignore
```

---

### Task 1: Scaffold Next.js 16 + Tailwind v4 + shadcn/ui

**Files:**
- Create: `package.json`, `next.config.ts`, `tsconfig.json`, `.gitignore`
- Create: `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`

- [ ] **Step 1: Create Next.js 16 app**

```bash
cd /Users/cosmo/Documents/AIProjects/ai-knowledge-library
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm
```

When prompted, accept defaults. This creates the Next.js 16 scaffold with Tailwind v4 and App Router.

- [ ] **Step 2: Verify it runs**

```bash
npm run dev
```

Open `http://localhost:3000` — should see the default Next.js page. Stop the dev server after confirming.

- [ ] **Step 3: Initialize shadcn/ui**

```bash
npx shadcn@latest init
```

When prompted:
- Style: Default
- Base color: Slate
- CSS variables: Yes

This creates `components.json` and sets up the shadcn/ui integration.

- [ ] **Step 4: Install shadcn/ui components we'll need**

```bash
npx shadcn@latest add badge button input tabs scroll-area sheet separator
```

- [ ] **Step 5: Verify build**

```bash
npm run build
```

Expected: Build succeeds with no errors.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: scaffold Next.js 16 + Tailwind v4 + shadcn/ui"
```

---

### Task 2: Design Tokens — Colors, Fonts, Global Styles

**Files:**
- Create: `public/fonts/Satoshi-Variable.woff2`, `public/fonts/CabinetGrotesk-Variable.woff2`
- Modify: `tailwind.config.ts`
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Download and add self-hosted fonts**

Download Satoshi from https://www.fontshare.com/fonts/satoshi and Cabinet Grotesk from https://www.fontshare.com/fonts/cabinet-grotesk. Extract the variable `.woff2` files and place them in `public/fonts/`:

```
public/fonts/
  Satoshi-Variable.woff2
  Satoshi-VariableItalic.woff2
  CabinetGrotesk-Variable.woff2
```

- [ ] **Step 2: Add @font-face declarations and design tokens to globals.css**

Replace the contents of `src/app/globals.css` with:

```css
@import "tailwindcss";

@font-face {
  font-family: 'Satoshi';
  src: url('/fonts/Satoshi-Variable.woff2') format('woff2');
  font-weight: 300 900;
  font-display: swap;
  font-style: normal;
}

@font-face {
  font-family: 'Satoshi';
  src: url('/fonts/Satoshi-VariableItalic.woff2') format('woff2');
  font-weight: 300 900;
  font-display: swap;
  font-style: italic;
}

@font-face {
  font-family: 'Cabinet Grotesk';
  src: url('/fonts/CabinetGrotesk-Variable.woff2') format('woff2');
  font-weight: 100 900;
  font-display: swap;
  font-style: normal;
}

@theme {
  --font-display: 'Satoshi', system-ui, sans-serif;
  --font-body: 'Cabinet Grotesk', system-ui, sans-serif;

  --color-background: #0b0f1a;
  --color-card-surface: rgba(255, 255, 255, 0.03);
  --color-card-border: rgba(255, 255, 255, 0.06);
  --color-border: #1e293b;
  --color-heading: #f1f5f9;
  --color-body: #94a3b8;
  --color-helper: #64748b;
  --color-action: #3b82f6;
  --color-action-hover: #60a5fa;
  --color-accent: #f59e0b;
}

body {
  font-family: var(--font-body);
  background-color: var(--color-background);
  color: var(--color-body);
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-display);
  color: var(--color-heading);
}
```

- [ ] **Step 3: Update root layout to use body font**

Replace `src/app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Knowledge Library — Autom8Lab",
  description:
    "A searchable library of AI prompts, agents, workflows, tools, and resources organized by business problem.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
```

- [ ] **Step 4: Add a minimal test page to verify tokens**

Replace `src/app/page.tsx`:

```tsx
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-8">
      <h1 className="font-display text-5xl font-bold text-heading">
        AI Knowledge Library
      </h1>
      <p className="font-body text-body text-lg">
        Prompts, agents, workflows, tools, and resources.
      </p>
      <span className="rounded-full bg-action px-4 py-1 text-sm font-medium text-white">
        Featured
      </span>
      <span className="rounded-full bg-accent px-4 py-1 text-sm font-medium text-black">
        Highlight
      </span>
    </main>
  );
}
```

- [ ] **Step 5: Verify in browser**

```bash
npm run dev
```

Open `http://localhost:3000`. Confirm:
- Dark background (`#0b0f1a`)
- Satoshi font on the heading
- Cabinet Grotesk on the body text
- Blue "Featured" badge
- Amber "Highlight" badge

- [ ] **Step 6: Verify build**

```bash
npm run build
```

Expected: Build succeeds.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: add Autom8Lab design tokens, self-hosted fonts, global styles"
```

---

### Task 3: Velite Setup + Entry Schema + Dummy Content

**Files:**
- Create: `velite.config.ts`
- Create: `content/entries/sales-outreach-prompt.mdx`
- Create: `content/entries/n8n-lead-scoring.mdx`
- Create: `content/entries/welcome-post.mdx`
- Create: `src/lib/constants.ts`
- Modify: `next.config.ts`
- Modify: `tsconfig.json`
- Modify: `.gitignore`

- [ ] **Step 1: Install Velite**

```bash
npm install velite --save-dev
```

- [ ] **Step 2: Create the Velite config with entry schema**

Create `velite.config.ts`:

```ts
import { defineConfig, defineCollection, s } from "velite";

const categories = [
  "sales",
  "operations",
  "content-marketing",
  "client-support",
  "data-decisions",
  "productivity",
  "personal",
] as const;

const entryTypes = [
  "prompt",
  "agent",
  "workflow",
  "tool",
  "resource",
  "post",
] as const;

const entries = defineCollection({
  name: "Entry",
  pattern: "entries/**/*.mdx",
  schema: s.object({
    title: s.string().max(200),
    slug: s.slug("entries"),
    description: s.string().max(500),
    category: s.enum(categories),
    type: s.enum(entryTypes),
    tags: s.array(s.string()),
    featured: s.boolean().default(false),
    publishedAt: s.isodate(),
    sourceUrl: s.string().optional().default(""),
    body: s.mdx(),
  }),
});

export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  collections: { entries },
});
```

- [ ] **Step 3: Create constants file for categories and types**

Create `src/lib/constants.ts`:

```ts
export const CATEGORIES = [
  { name: "AI for Sales & Lead Generation", slug: "sales", label: "Sales" },
  { name: "AI for Operations & Workflow Efficiency", slug: "operations", label: "Operations" },
  { name: "AI for Content & Marketing", slug: "content-marketing", label: "Content" },
  { name: "AI for Client Communication & Support", slug: "client-support", label: "Client Support" },
  { name: "AI for Data, Reporting & Decision Making", slug: "data-decisions", label: "Data" },
  { name: "AI for Personal Productivity & Learning", slug: "productivity", label: "Productivity" },
  { name: "AI for Personal Development & Growth", slug: "personal", label: "Personal Dev" },
] as const;

export const ENTRY_TYPES = [
  { value: "prompt", label: "Prompts" },
  { value: "agent", label: "Agents" },
  { value: "workflow", label: "Workflows" },
  { value: "tool", label: "Tools" },
  { value: "resource", label: "Resources" },
  { value: "post", label: "Posts" },
] as const;

export const TYPE_COLORS: Record<string, string> = {
  prompt: "bg-blue-500/20 text-blue-400",
  agent: "bg-purple-500/20 text-purple-400",
  workflow: "bg-green-500/20 text-green-400",
  tool: "bg-orange-500/20 text-orange-400",
  resource: "bg-cyan-500/20 text-cyan-400",
  post: "bg-pink-500/20 text-pink-400",
};
```

- [ ] **Step 4: Integrate Velite with Next.js**

Replace `next.config.ts`:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config) {
    config.plugins.push(new VeliteWebpackPlugin());
    return config;
  },
};

export default nextConfig;

class VeliteWebpackPlugin {
  static started = false;
  apply(compiler: import("webpack").Compiler) {
    compiler.hooks.beforeCompile.tapPromise("VeliteWebpackPlugin", async () => {
      if (VeliteWebpackPlugin.started) return;
      VeliteWebpackPlugin.started = true;
      const dev = compiler.options.mode === "development";
      const { build } = await import("velite");
      await build({ watch: dev, clean: !dev });
    });
  }
}
```

- [ ] **Step 5: Add .velite to .gitignore and configure tsconfig**

Append to `.gitignore`:

```
# Velite
.velite
```

Add to `tsconfig.json` in the `compilerOptions.paths` section:

```json
"#site/content": ["./.velite"]
```

- [ ] **Step 6: Create 3 dummy MDX entries**

Create `content/entries/sales-outreach-prompt.mdx`:

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

This prompt takes a prospect's LinkedIn profile URL and generates a personalized cold outreach email that references their specific role, recent activity, and company context.

## The prompt

```
You are a sales development representative. Given the following LinkedIn profile information about a prospect, write a personalized cold outreach email.

Profile: {profile_data}

Rules:
- Reference something specific from their profile
- Keep it under 150 words
- End with a clear, low-commitment CTA
- No generic flattery
```

## Why it works

Most cold emails fail because they're generic. This prompt forces specificity by requiring profile data as input, making every email feel hand-written.
```

Create `content/entries/n8n-lead-scoring.mdx`:

```mdx
---
title: "n8n Lead Scoring Workflow"
description: "An automated workflow that scores inbound leads based on firmographic data and engagement signals."
category: operations
type: workflow
tags: [n8n, workflow-automation, sales]
featured: false
publishedAt: 2026-04-16
sourceUrl: ""
---

## What it does

This n8n workflow triggers on new form submissions, enriches the lead with firmographic data, scores them against your ICP criteria, and routes high-scoring leads directly to your calendar booking link.

## How it works

1. **Trigger:** Webhook receives form submission
2. **Enrich:** Pulls company data from Clearbit/Apollo
3. **Score:** Assigns points based on company size, industry, role title
4. **Route:** High scores → calendar link. Low scores → nurture sequence.

## Why it works

Manual lead qualification wastes SDR time on leads that were never going to close. This workflow handles the first pass automatically — your team only talks to qualified prospects.
```

Create `content/entries/welcome-post.mdx`:

```mdx
---
title: "Welcome to the AI Knowledge Library"
description: "What this library is, why it exists, and how to use it."
category: personal
type: post
tags: [ai-knowledge-library, 75-hard-ai]
featured: true
publishedAt: 2026-04-16
sourceUrl: ""
---

## What is this?

The AI Knowledge Library is a public collection of AI prompts, agents, workflows, tools, and curated resources — organized by business problem, tagged by tool, searchable across everything.

## Why it exists

This library is being built live as part of the 75 Hard AI Challenge. Every commit is timestamped proof-of-work. The git history is the progress story.

## How to use it

- **Browse by category** — click a business problem in the top nav
- **Filter by type** — use the type chips to see only prompts, agents, workflows, etc.
- **Search** — hit Cmd+K or click the search bar
- **Browse by tool** — click any tag to see everything using that tool
```

- [ ] **Step 7: Verify Velite processes the entries**

```bash
npm run dev
```

Check the terminal output — Velite should log that it processed 3 entries. The `.velite` directory should be created with generated data. Stop the dev server.

- [ ] **Step 8: Verify the generated data is importable**

Temporarily update `src/app/page.tsx` to confirm the data works:

```tsx
import { entries } from "#site/content";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-8">
      <h1 className="font-display text-5xl font-bold text-heading">
        AI Knowledge Library
      </h1>
      <p className="text-body">Found {entries.length} entries</p>
      <ul className="space-y-2">
        {entries.map((entry) => (
          <li key={entry.slug} className="text-heading">
            {entry.title} — <span className="text-action">{entry.type}</span>
          </li>
        ))}
      </ul>
    </main>
  );
}
```

```bash
npm run dev
```

Open `http://localhost:3000` — should see "Found 3 entries" and the three entry titles listed. Stop the dev server.

- [ ] **Step 9: Verify build**

```bash
npm run build
```

Expected: Build succeeds.

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "feat: add Velite MDX pipeline, entry schema, 3 dummy entries"
```

---

### Task 4: Entry Helper Functions

**Files:**
- Create: `src/lib/entries.ts`

- [ ] **Step 1: Create entry helper functions**

Create `src/lib/entries.ts`:

```ts
import { entries } from "#site/content";

export type Entry = (typeof entries)[number];

export function getAllEntries(): Entry[] {
  return entries.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getFeaturedEntries(): Entry[] {
  return getAllEntries().filter((entry) => entry.featured);
}

export function getEntriesByCategory(categorySlug: string): Entry[] {
  return getAllEntries().filter((entry) => entry.category === categorySlug);
}

export function getEntriesByType(type: string): Entry[] {
  return getAllEntries().filter((entry) => entry.type === type);
}

export function getEntriesByTag(tag: string): Entry[] {
  return getAllEntries().filter((entry) => entry.tags.includes(tag));
}

export function getEntryBySlug(slug: string): Entry | undefined {
  return entries.find((entry) => entry.slug === slug);
}

export function getAllTags(): { tag: string; count: number }[] {
  const tagMap = new Map<string, number>();
  for (const entry of entries) {
    for (const tag of entry.tags) {
      tagMap.set(tag, (tagMap.get(tag) ?? 0) + 1);
    }
  }
  return Array.from(tagMap.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

export function getTypeCounts(): { type: string; count: number }[] {
  const typeMap = new Map<string, number>();
  for (const entry of entries) {
    typeMap.set(entry.type, (typeMap.get(entry.type) ?? 0) + 1);
  }
  return Array.from(typeMap.entries()).map(([type, count]) => ({
    type,
    count,
  }));
}

export function getRelatedEntries(entry: Entry, limit = 3): Entry[] {
  return getAllEntries()
    .filter((e) => e.slug !== entry.slug)
    .filter(
      (e) =>
        e.category === entry.category ||
        e.tags.some((tag) => entry.tags.includes(tag))
    )
    .slice(0, limit);
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffHours < 1) return "Just now";
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/lib/entries.ts
git commit -m "feat: add entry helper functions (sort, filter, group, format)"
```

---

### Task 5: Layout Shell — TopNav + Sidebar

**Files:**
- Create: `src/components/top-nav.tsx`
- Create: `src/components/sidebar.tsx`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Create the TopNav component**

Create `src/components/top-nav.tsx`:

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CATEGORIES } from "@/lib/constants";
import { Search } from "lucide-react";

export function TopNav() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 right-0 left-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="flex h-14 items-center gap-4 px-4">
        {/* Logo */}
        <Link href="/" className="shrink-0 font-display text-lg font-bold text-heading">
          Autom8Lab
        </Link>

        {/* Category pills — scrollable */}
        <nav className="flex flex-1 items-center gap-2 overflow-x-auto scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isActive = pathname === `/category/${cat.slug}`;
            return (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className={`shrink-0 rounded-full px-3 py-1 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-action text-white"
                    : "text-helper hover:text-heading hover:bg-card-surface"
                }`}
              >
                {cat.label}
              </Link>
            );
          })}
        </nav>

        {/* Search trigger */}
        <button
          className="flex shrink-0 items-center gap-2 rounded-lg border border-border px-3 py-1.5 text-sm text-helper transition-colors hover:border-action hover:text-heading"
          aria-label="Search"
        >
          <Search className="h-4 w-4" />
          <span className="hidden sm:inline">Search</span>
          <kbd className="hidden rounded bg-card-surface px-1.5 py-0.5 text-xs text-helper sm:inline">
            ⌘K
          </kbd>
        </button>
      </div>
    </header>
  );
}
```

- [ ] **Step 2: Create the Sidebar component**

Create `src/components/sidebar.tsx`:

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, Info, Menu, X } from "lucide-react";
import { useState } from "react";

const NAV_ITEMS = [
  { href: "/", icon: Home, label: "Home" },
  { href: "#search", icon: Search, label: "Search" },
  { href: "/about", icon: Info, label: "About" },
];

export function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed top-3.5 left-4 z-[60] block p-1 text-helper lg:hidden"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Desktop sidebar — icon rail */}
      <aside className="fixed top-14 left-0 z-40 hidden h-[calc(100vh-3.5rem)] w-14 flex-col items-center gap-1 border-r border-border bg-background pt-4 lg:flex group hover:w-48 transition-all duration-200 overflow-hidden">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex w-full items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                isActive
                  ? "text-action"
                  : "text-helper hover:text-heading"
              }`}
              title={item.label}
            >
              <Icon className="h-5 w-5 shrink-0" />
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                {item.label}
              </span>
            </Link>
          );
        })}
      </aside>

      {/* Mobile drawer overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[70] lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="absolute top-0 left-0 h-full w-64 border-r border-border bg-background p-6">
            <button
              onClick={() => setMobileOpen(false)}
              className="mb-6 text-helper hover:text-heading"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
            <nav className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                      isActive
                        ? "bg-action/10 text-action"
                        : "text-helper hover:text-heading hover:bg-card-surface"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </aside>
        </div>
      )}
    </>
  );
}
```

- [ ] **Step 3: Update root layout to include TopNav and Sidebar**

Replace `src/app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { TopNav } from "@/components/top-nav";
import { Sidebar } from "@/components/sidebar";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Knowledge Library — Autom8Lab",
  description:
    "A searchable library of AI prompts, agents, workflows, tools, and resources organized by business problem.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <TopNav />
        <Sidebar />
        <main className="pt-14 lg:pl-14">
          {children}
        </main>
      </body>
    </html>
  );
}
```

- [ ] **Step 4: Install lucide-react for icons**

```bash
npm install lucide-react
```

- [ ] **Step 5: Verify in browser**

```bash
npm run dev
```

Open `http://localhost:3000`. Confirm:
- Fixed top nav with logo, category pills, search trigger
- Left sidebar with Home/Search/About icons (desktop)
- Sidebar expands on hover to show labels
- Mobile: hamburger icon opens drawer
- Content area offset correctly (top padding + left padding)

- [ ] **Step 6: Verify build**

```bash
npm run build
```

Expected: Build succeeds.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: add layout shell — TopNav with category pills, Sidebar with icon rail"
```

---

### Task 6: Homepage — Hero, Type Chips, Search Bar, Tab Row

**Files:**
- Create: `src/components/hero-section.tsx`
- Create: `src/components/type-chips.tsx`
- Create: `src/components/search-bar.tsx`
- Create: `src/components/tab-row.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create HeroSection component**

Create `src/components/hero-section.tsx`:

```tsx
export function HeroSection() {
  return (
    <section className="flex flex-col items-center gap-4 px-4 pt-12 pb-6 text-center">
      <p className="text-sm text-helper">autom8lab.com</p>
      <h1 className="font-display text-4xl font-black tracking-tight text-heading sm:text-5xl md:text-6xl">
        AI KNOWLEDGE LIBRARY
      </h1>
    </section>
  );
}
```

- [ ] **Step 2: Create TypeChips component**

Create `src/components/type-chips.tsx`:

```tsx
"use client";

import { ENTRY_TYPES, TYPE_COLORS } from "@/lib/constants";

interface TypeChipsProps {
  counts: { type: string; count: number }[];
  activeType: string | null;
  onToggle: (type: string | null) => void;
}

export function TypeChips({ counts, activeType, onToggle }: TypeChipsProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2 px-4">
      {ENTRY_TYPES.map((et) => {
        const countObj = counts.find((c) => c.type === et.value);
        const count = countObj?.count ?? 0;
        const isActive = activeType === et.value;
        const colors = TYPE_COLORS[et.value] ?? "bg-card-surface text-body";

        return (
          <button
            key={et.value}
            onClick={() => onToggle(isActive ? null : et.value)}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium transition-colors ${
              isActive
                ? "ring-2 ring-action " + colors
                : "bg-card-surface text-body hover:text-heading border border-card-border"
            }`}
          >
            {et.label}
            <span className="rounded-full bg-background/50 px-1.5 py-0.5 text-xs">
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
```

- [ ] **Step 3: Create SearchBar component**

Create `src/components/search-bar.tsx`:

```tsx
"use client";

import { Search } from "lucide-react";
import { useEffect, useRef } from "react";

interface SearchBarProps {
  query: string;
  onChange: (query: string) => void;
}

export function SearchBar({ query, onChange }: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="mx-auto w-full max-w-lg px-4">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-xl border border-border bg-card-surface py-2.5 pr-16 pl-4 text-heading placeholder:text-helper focus:border-action focus:outline-none focus:ring-1 focus:ring-action"
        />
        <div className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-1.5">
          <kbd className="rounded bg-background px-1.5 py-0.5 text-xs text-helper">
            ⌘K
          </kbd>
          <Search className="h-5 w-5 text-helper" />
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Create TabRow component with sticky behavior**

Create `src/components/tab-row.tsx`:

```tsx
"use client";

interface TabRowProps {
  activeTab: "latest" | "featured" | "trending";
  onTabChange: (tab: "latest" | "featured" | "trending") => void;
}

const TABS = [
  { id: "latest" as const, label: "Latest", icon: "⚡" },
  { id: "featured" as const, label: "Featured", icon: "⭐" },
  { id: "trending" as const, label: "Trending", icon: "📈" },
];

export function TabRow({ activeTab, onTabChange }: TabRowProps) {
  return (
    <div className="sticky top-14 z-30 flex justify-center gap-2 border-b border-border bg-background/95 py-3 backdrop-blur-sm">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
            activeTab === tab.id
              ? "bg-action text-white"
              : "text-helper hover:text-heading hover:bg-card-surface"
          }`}
        >
          <span>{tab.icon}</span>
          {tab.label}
        </button>
      ))}
    </div>
  );
}
```

- [ ] **Step 5: Wire up the homepage with all components**

Replace `src/app/page.tsx`:

```tsx
import { getAllEntries, getFeaturedEntries, getTypeCounts } from "@/lib/entries";
import { HomeContent } from "./home-content";

export default function Home() {
  const allEntries = getAllEntries();
  const featuredEntries = getFeaturedEntries();
  const typeCounts = getTypeCounts();

  return (
    <HomeContent
      allEntries={allEntries}
      featuredEntries={featuredEntries}
      typeCounts={typeCounts}
    />
  );
}
```

Create `src/app/home-content.tsx`:

```tsx
"use client";

import { useState, useMemo } from "react";
import { HeroSection } from "@/components/hero-section";
import { TypeChips } from "@/components/type-chips";
import { SearchBar } from "@/components/search-bar";
import { TabRow } from "@/components/tab-row";
import type { Entry } from "@/lib/entries";

interface HomeContentProps {
  allEntries: Entry[];
  featuredEntries: Entry[];
  typeCounts: { type: string; count: number }[];
}

export function HomeContent({
  allEntries,
  featuredEntries,
  typeCounts,
}: HomeContentProps) {
  const [activeTab, setActiveTab] = useState<"latest" | "featured" | "trending">("latest");
  const [activeType, setActiveType] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const displayEntries = useMemo(() => {
    let result =
      activeTab === "featured" || activeTab === "trending"
        ? featuredEntries
        : allEntries;

    if (activeType) {
      result = result.filter((e) => e.type === activeType);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.description.toLowerCase().includes(q) ||
          e.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    return result;
  }, [allEntries, featuredEntries, activeTab, activeType, searchQuery]);

  return (
    <div>
      {/* Static hero area — content scrolls over this */}
      <div className="relative">
        <div className="flex flex-col gap-6 pb-8">
          <HeroSection />
          <TypeChips
            counts={typeCounts}
            activeType={activeType}
            onToggle={setActiveType}
          />
          <SearchBar query={searchQuery} onChange={setSearchQuery} />
        </div>
      </div>

      {/* Sticky tabs + scrolling feed */}
      <div className="relative bg-background rounded-t-2xl border-t border-card-border min-h-screen">
        <TabRow activeTab={activeTab} onTabChange={setActiveTab} />
        <div className="mx-auto max-w-5xl px-4 py-6">
          <h2 className="mb-6 flex items-center gap-2 font-display text-xl font-bold text-heading">
            ✈ Just released
          </h2>
          {displayEntries.length === 0 ? (
            <p className="text-center text-helper py-12">No entries found.</p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {displayEntries.map((entry) => (
                <div
                  key={entry.slug}
                  className="rounded-xl border border-card-border bg-card-surface p-4"
                >
                  <p className="font-display font-bold text-heading">
                    {entry.title}
                  </p>
                  <p className="mt-1 text-sm text-body line-clamp-2">
                    {entry.description}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {entry.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-background px-2 py-0.5 text-xs text-helper"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 6: Verify in browser**

```bash
npm run dev
```

Open `http://localhost:3000`. Confirm:
- Hero section with "AI KNOWLEDGE LIBRARY" heading
- Type chips with counts (Prompts 1, Workflows 1, Posts 1, etc.)
- Search bar with ⌘K hint
- Tabs: Latest / Featured / Trending
- Card feed shows 3 dummy entries in a 2-column grid
- Clicking type chips filters the feed
- Typing in search filters the feed
- Switching tabs changes the entries shown
- Tab row sticks below top nav on scroll
- Content area scrolls over the hero section

- [ ] **Step 7: Verify build**

```bash
npm run build
```

Expected: Build succeeds.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: homepage with hero, type chips, search, tabs, entry feed"
```

---

### Task 7: Entry Card Component

**Files:**
- Create: `src/components/entry-card.tsx`
- Modify: `src/app/home-content.tsx`

- [ ] **Step 1: Create the EntryCard component**

Create `src/components/entry-card.tsx`:

```tsx
import Link from "next/link";
import { TYPE_COLORS } from "@/lib/constants";
import { CATEGORIES } from "@/lib/constants";
import { formatDate } from "@/lib/entries";
import type { Entry } from "@/lib/entries";

interface EntryCardProps {
  entry: Entry;
}

export function EntryCard({ entry }: EntryCardProps) {
  const typeColor = TYPE_COLORS[entry.type] ?? "bg-card-surface text-body";
  const category = CATEGORIES.find((c) => c.slug === entry.category);

  return (
    <Link
      href={`/entry/${entry.slug}`}
      className="group rounded-xl border border-card-border bg-card-surface p-4 transition-colors hover:border-border"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-display font-bold text-heading group-hover:text-action transition-colors truncate">
              {entry.title}
            </h3>
            {entry.featured && (
              <span className="shrink-0 rounded-full bg-accent/20 px-2 py-0.5 text-xs font-medium text-accent">
                Featured
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-body line-clamp-2">
            {entry.description}
          </p>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-1.5">
        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${typeColor}`}>
          {entry.type}
        </span>
        {entry.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-background px-2 py-0.5 text-xs text-helper"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-helper">
        <span>{category?.label}</span>
        <span>{formatDate(entry.publishedAt)}</span>
      </div>
    </Link>
  );
}
```

- [ ] **Step 2: Update home-content to use EntryCard**

In `src/app/home-content.tsx`, replace the inline card rendering. Replace the `<div className="grid gap-4 md:grid-cols-2">` block with:

```tsx
import { EntryCard } from "@/components/entry-card";
```

(Add import at top of file)

Replace the grid block:

```tsx
<div className="grid gap-4 md:grid-cols-2">
  {displayEntries.map((entry) => (
    <EntryCard key={entry.slug} entry={entry} />
  ))}
</div>
```

- [ ] **Step 3: Verify in browser**

```bash
npm run dev
```

Open `http://localhost:3000`. Confirm:
- Cards show title, description, tags, type badge with color, category, date
- Featured entries show amber "Featured" badge
- Cards are clickable (link to `/entry/[slug]` — will 404 for now, that's fine)
- Hover state: border brightens, title turns blue

- [ ] **Step 4: Verify build**

```bash
npm run build
```

Expected: Build succeeds.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: EntryCard component with type colors, featured badge, glass styling"
```

---

### Task 8: Entry Detail Page

**Files:**
- Create: `src/app/entry/[slug]/page.tsx`
- Create: `src/components/entry-detail.tsx`
- Create: `src/components/tag-pills.tsx`
- Create: `src/components/mdx-components.tsx`

- [ ] **Step 1: Create MDX components override**

Create `src/components/mdx-components.tsx`:

```tsx
import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  h2: (props) => (
    <h2
      className="mt-8 mb-4 font-display text-2xl font-bold text-heading"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="mt-6 mb-3 font-display text-xl font-semibold text-heading"
      {...props}
    />
  ),
  p: (props) => <p className="mb-4 leading-relaxed text-body" {...props} />,
  ul: (props) => <ul className="mb-4 list-disc pl-6 text-body" {...props} />,
  ol: (props) => <ol className="mb-4 list-decimal pl-6 text-body" {...props} />,
  li: (props) => <li className="mb-1" {...props} />,
  code: (props) => (
    <code
      className="rounded bg-card-surface px-1.5 py-0.5 text-sm text-action"
      {...props}
    />
  ),
  pre: (props) => (
    <pre
      className="mb-4 overflow-x-auto rounded-lg border border-border bg-background p-4 text-sm"
      {...props}
    />
  ),
  a: (props) => (
    <a className="text-action underline hover:text-action-hover" {...props} />
  ),
  blockquote: (props) => (
    <blockquote
      className="mb-4 border-l-2 border-action pl-4 italic text-helper"
      {...props}
    />
  ),
  strong: (props) => (
    <strong className="font-semibold text-heading" {...props} />
  ),
};
```

- [ ] **Step 2: Create TagPills component**

Create `src/components/tag-pills.tsx`:

```tsx
import Link from "next/link";

interface TagPillsProps {
  tags: string[];
}

export function TagPills({ tags }: TagPillsProps) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {tags.map((tag) => (
        <Link
          key={tag}
          href={`/tag/${tag}`}
          className="rounded-full bg-card-surface border border-card-border px-2.5 py-0.5 text-xs text-helper transition-colors hover:text-heading hover:border-border"
        >
          {tag}
        </Link>
      ))}
    </div>
  );
}
```

- [ ] **Step 3: Create EntryDetail component**

Create `src/components/entry-detail.tsx`:

```tsx
import { CATEGORIES } from "@/lib/constants";
import { TYPE_COLORS } from "@/lib/constants";
import { formatDate } from "@/lib/entries";
import { TagPills } from "./tag-pills";
import type { Entry } from "@/lib/entries";

interface EntryDetailProps {
  entry: Entry;
}

export function EntryDetail({ entry }: EntryDetailProps) {
  const category = CATEGORIES.find((c) => c.slug === entry.category);
  const typeColor = TYPE_COLORS[entry.type] ?? "bg-card-surface text-body";

  return (
    <article className="mx-auto max-w-3xl px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-helper">
        <a href="/" className="hover:text-heading">Home</a>
        <span className="mx-2">/</span>
        <a href={`/category/${entry.category}`} className="hover:text-heading">
          {category?.label}
        </a>
        <span className="mx-2">/</span>
        <span className="text-body">{entry.title}</span>
      </nav>

      {/* Meta header */}
      <header className="mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${typeColor}`}>
            {entry.type}
          </span>
          {entry.featured && (
            <span className="rounded-full bg-accent/20 px-2.5 py-0.5 text-xs font-medium text-accent">
              Featured
            </span>
          )}
          <span className="text-xs text-helper">
            {formatDate(entry.publishedAt)}
          </span>
        </div>
        <h1 className="font-display text-3xl font-bold text-heading sm:text-4xl">
          {entry.title}
        </h1>
        <p className="mt-3 text-lg text-body">{entry.description}</p>
        <div className="mt-4">
          <TagPills tags={entry.tags} />
        </div>
        {entry.sourceUrl && (
          <a
            href={entry.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-sm text-action hover:text-action-hover"
          >
            View source →
          </a>
        )}
      </header>

      {/* Divider */}
      <hr className="mb-8 border-border" />
    </article>
  );
}
```

- [ ] **Step 4: Create the entry detail page route**

Create `src/app/entry/[slug]/page.tsx`:

```tsx
import { notFound } from "next/navigation";
import { entries } from "#site/content";
import { getEntryBySlug, getRelatedEntries } from "@/lib/entries";
import { EntryDetail } from "@/components/entry-detail";
import { EntryCard } from "@/components/entry-card";
import { mdxComponents } from "@/components/mdx-components";
import * as runtime from "react/jsx-runtime";
import type { Metadata } from "next";

interface EntryPageProps {
  params: Promise<{ slug: string }>;
}

function getMDXComponent(code: string) {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
}

export async function generateStaticParams() {
  return entries.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({
  params,
}: EntryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = getEntryBySlug(slug);
  if (!entry) return {};
  return {
    title: `${entry.title} — AI Knowledge Library`,
    description: entry.description,
  };
}

export default async function EntryPage({ params }: EntryPageProps) {
  const { slug } = await params;
  const entry = getEntryBySlug(slug);
  if (!entry) notFound();

  const MDXContent = getMDXComponent(entry.body);
  const related = getRelatedEntries(entry);

  return (
    <div>
      <EntryDetail entry={entry} />

      {/* MDX body */}
      <div className="mx-auto max-w-3xl px-4">
        <MDXContent components={mdxComponents} />
      </div>

      {/* Related entries */}
      {related.length > 0 && (
        <section className="mx-auto max-w-3xl px-4 py-12">
          <h2 className="mb-4 font-display text-xl font-bold text-heading">
            Related entries
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {related.map((r) => (
              <EntryCard key={r.slug} entry={r} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
```

- [ ] **Step 5: Verify in browser**

```bash
npm run dev
```

Open `http://localhost:3000`, click on a card. Confirm:
- Entry detail page loads at `/entry/[slug]`
- Breadcrumb: Home / Category / Title
- Type badge, featured badge, date, tags all render
- MDX body renders with styled headings, paragraphs, code blocks
- Related entries section at bottom
- Tags are clickable (will 404 for now — tag pages built in Task 10)

- [ ] **Step 6: Verify build**

```bash
npm run build
```

Expected: Build succeeds. All 3 entry pages statically generated.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: entry detail page with MDX rendering, breadcrumbs, related entries"
```

---

### Task 9: Category Pages

**Files:**
- Create: `src/app/category/[slug]/page.tsx`
- Create: `src/components/breadcrumb.tsx`

- [ ] **Step 1: Create Breadcrumb component**

Create `src/components/breadcrumb.tsx`:

```tsx
import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="mb-6 text-sm text-helper">
      {items.map((item, i) => (
        <span key={i}>
          {i > 0 && <span className="mx-2">/</span>}
          {item.href ? (
            <Link href={item.href} className="hover:text-heading transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-body">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
```

- [ ] **Step 2: Create the category page route**

Create `src/app/category/[slug]/page.tsx`:

```tsx
import { notFound } from "next/navigation";
import { CATEGORIES } from "@/lib/constants";
import { getEntriesByCategory, getAllTags } from "@/lib/entries";
import { EntryCard } from "@/components/entry-card";
import { Breadcrumb } from "@/components/breadcrumb";
import { TagPills } from "@/components/tag-pills";
import type { Metadata } from "next";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return CATEGORIES.map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = CATEGORIES.find((c) => c.slug === slug);
  if (!category) return {};
  return {
    title: `${category.name} — AI Knowledge Library`,
    description: `AI resources for ${category.name.toLowerCase()}.`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = CATEGORIES.find((c) => c.slug === slug);
  if (!category) notFound();

  const categoryEntries = getEntriesByCategory(slug);

  // Get tags that appear in this category's entries
  const categoryTags = Array.from(
    new Set(categoryEntries.flatMap((e) => e.tags))
  );

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: category.label },
        ]}
      />

      <header className="mb-8 rounded-xl border border-card-border bg-card-surface p-6">
        <h1 className="font-display text-3xl font-bold text-heading">
          {category.name}
        </h1>
        <p className="mt-2 text-body">
          {categoryEntries.length} resource{categoryEntries.length !== 1 ? "s" : ""}
        </p>
        {categoryTags.length > 0 && (
          <div className="mt-4">
            <TagPills tags={categoryTags} />
          </div>
        )}
      </header>

      {categoryEntries.length === 0 ? (
        <p className="text-center text-helper py-12">
          No entries in this category yet.
        </p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {categoryEntries.map((entry) => (
            <EntryCard key={entry.slug} entry={entry} />
          ))}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 3: Verify in browser**

```bash
npm run dev
```

Click a category pill in the top nav. Confirm:
- Category page loads at `/category/[slug]`
- Breadcrumb: Home / Category Label
- Category title, entry count, tag chips
- Entry cards grid below
- Empty categories show "No entries in this category yet."

- [ ] **Step 4: Verify build**

```bash
npm run build
```

Expected: Build succeeds. All 7 category pages statically generated.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: category pages with breadcrumbs, tag chips, entry grid"
```

---

### Task 10: Tag Pages

**Files:**
- Create: `src/app/tag/[tag]/page.tsx`

- [ ] **Step 1: Create the tag page route**

Create `src/app/tag/[tag]/page.tsx`:

```tsx
import { notFound } from "next/navigation";
import { getAllTags, getEntriesByTag } from "@/lib/entries";
import { EntryCard } from "@/components/entry-card";
import { Breadcrumb } from "@/components/breadcrumb";
import type { Metadata } from "next";

interface TagPageProps {
  params: Promise<{ tag: string }>;
}

export async function generateStaticParams() {
  return getAllTags().map((t) => ({ tag: t.tag }));
}

export async function generateMetadata({
  params,
}: TagPageProps): Promise<Metadata> {
  const { tag } = await params;
  return {
    title: `${tag} — AI Knowledge Library`,
    description: `AI resources tagged with ${tag}.`,
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params;
  const tagEntries = getEntriesByTag(tag);

  if (tagEntries.length === 0) notFound();

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: tag },
        ]}
      />

      <header className="mb-8 rounded-xl border border-card-border bg-card-surface p-6">
        <h1 className="font-display text-3xl font-bold text-heading">
          {tag}
        </h1>
        <p className="mt-2 text-body">
          {tagEntries.length} resource{tagEntries.length !== 1 ? "s" : ""} tagged with{" "}
          <span className="text-heading">{tag}</span>
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {tagEntries.map((entry) => (
          <EntryCard key={entry.slug} entry={entry} />
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify in browser**

```bash
npm run dev
```

Go to an entry detail page, click a tag. Confirm:
- Tag page loads at `/tag/[tag]`
- Shows tag name, entry count, filtered card grid

- [ ] **Step 3: Verify build**

```bash
npm run build
```

Expected: Build succeeds. Tag pages generated for all unique tags.

- [ ] **Step 4: Commit**

```bash
git add src/app/tag/
git commit -m "feat: tag pages with filtered entry grid"
```

---

### Task 11: About Page

**Files:**
- Create: `src/app/about/page.tsx`

- [ ] **Step 1: Create the about page**

Create `src/app/about/page.tsx`:

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — AI Knowledge Library",
  description: "What the AI Knowledge Library is, who built it, and how to use it.",
};

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="font-display text-3xl font-bold text-heading sm:text-4xl">
        About this library
      </h1>

      <div className="mt-8 space-y-6 text-body leading-relaxed">
        <p>
          The AI Knowledge Library is a public collection of AI prompts, agents,
          workflows, tools, and curated resources — organized by business problem,
          tagged by tool, searchable across everything.
        </p>

        <p>
          Built by{" "}
          <a
            href="https://autom8lab.com"
            className="text-action hover:text-action-hover"
          >
            Autom8Lab
          </a>{" "}
          as part of the 75 Hard AI Challenge. Every entry is a commit. The git
          history is the progress story.
        </p>

        <h2 className="font-display text-2xl font-bold text-heading pt-4">
          How to use it
        </h2>

        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong className="text-heading">Browse by category</strong> — click a
            business problem in the top nav
          </li>
          <li>
            <strong className="text-heading">Filter by type</strong> — use the type
            chips to see only prompts, agents, workflows, etc.
          </li>
          <li>
            <strong className="text-heading">Search</strong> — hit ⌘K or click the
            search bar
          </li>
          <li>
            <strong className="text-heading">Browse by tool</strong> — click any tag
            to see everything using that tool
          </li>
        </ul>

        <h2 className="font-display text-2xl font-bold text-heading pt-4">
          What kind of resources?
        </h2>

        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong className="text-heading">Prompts</strong> — standalone prompts
            and templates
          </li>
          <li>
            <strong className="text-heading">Agents</strong> — AI agent
            configurations and system prompts
          </li>
          <li>
            <strong className="text-heading">Workflows</strong> — multi-step
            automations (n8n, Make, etc.)
          </li>
          <li>
            <strong className="text-heading">Tools</strong> — software tools,
            utilities, scripts
          </li>
          <li>
            <strong className="text-heading">Resources</strong> — curated external
            links, guides, references
          </li>
        </ul>
      </div>
    </article>
  );
}
```

- [ ] **Step 2: Verify in browser**

```bash
npm run dev
```

Navigate to `/about`. Confirm the page renders correctly with proper typography and spacing.

- [ ] **Step 3: Verify build**

```bash
npm run build
```

Expected: Build succeeds.

- [ ] **Step 4: Commit**

```bash
git add src/app/about/
git commit -m "feat: about page with library overview and usage guide"
```

---

### Task 12: Fuse.js Search Integration

**Files:**
- Create: `src/lib/search.ts`
- Modify: `src/app/home-content.tsx`

- [ ] **Step 1: Install Fuse.js**

```bash
npm install fuse.js
```

- [ ] **Step 2: Create search configuration**

Create `src/lib/search.ts`:

```ts
import Fuse from "fuse.js";
import type { Entry } from "./entries";

export function createSearchIndex(entries: Entry[]) {
  return new Fuse(entries, {
    keys: [
      { name: "title", weight: 2 },
      { name: "description", weight: 1.5 },
      { name: "tags", weight: 1 },
    ],
    threshold: 0.3,
    includeScore: true,
  });
}

export function searchEntries(
  index: Fuse<Entry>,
  query: string
): Entry[] {
  if (!query.trim()) return [];
  return index.search(query).map((result) => result.item);
}
```

- [ ] **Step 3: Update home-content to use Fuse.js search**

In `src/app/home-content.tsx`, replace the simple string-matching search with Fuse.js. Update the imports and the `displayEntries` logic:

Add imports at top:

```tsx
import { createSearchIndex, searchEntries } from "@/lib/search";
```

Replace the `displayEntries` useMemo:

```tsx
const searchIndex = useMemo(
  () => createSearchIndex(allEntries),
  [allEntries]
);

const displayEntries = useMemo(() => {
  let result: Entry[];

  if (searchQuery.trim()) {
    result = searchEntries(searchIndex, searchQuery);
  } else {
    result =
      activeTab === "featured" || activeTab === "trending"
        ? featuredEntries
        : allEntries;
  }

  if (activeType) {
    result = result.filter((e) => e.type === activeType);
  }

  return result;
}, [allEntries, featuredEntries, searchIndex, activeTab, activeType, searchQuery]);
```

- [ ] **Step 4: Verify in browser**

```bash
npm run dev
```

Open `http://localhost:3000`. Type "sales" in the search bar. Confirm fuzzy search returns relevant entries. Try "claud" (partial) — should still match entries tagged with "claude".

- [ ] **Step 5: Verify build**

```bash
npm run build
```

Expected: Build succeeds.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: Fuse.js fuzzy search integration"
```

---

### Task 13: SEO — Metadata + Sitemap

**Files:**
- Create: `src/app/sitemap.ts`
- Create: `src/app/robots.ts`

- [ ] **Step 1: Create sitemap generator**

Create `src/app/sitemap.ts`:

```ts
import { entries } from "#site/content";
import { CATEGORIES } from "@/lib/constants";
import { getAllTags } from "@/lib/entries";
import type { MetadataRoute } from "next";

const BASE_URL = "https://ai.autom8lab.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const entryUrls = entries.map((entry) => ({
    url: `${BASE_URL}/entry/${entry.slug}`,
    lastModified: new Date(entry.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const categoryUrls = CATEGORIES.map((cat) => ({
    url: `${BASE_URL}/category/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const tagUrls = getAllTags().map((t) => ({
    url: `${BASE_URL}/tag/${t.tag}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.5,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    ...categoryUrls,
    ...entryUrls,
    ...tagUrls,
  ];
}
```

- [ ] **Step 2: Create robots.txt**

Create `src/app/robots.ts`:

```ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://ai.autom8lab.com/sitemap.xml",
  };
}
```

- [ ] **Step 3: Verify build**

```bash
npm run build
```

Expected: Build succeeds. Check that `/sitemap.xml` and `/robots.txt` are in the build output.

- [ ] **Step 4: Commit**

```bash
git add src/app/sitemap.ts src/app/robots.ts
git commit -m "feat: SEO — sitemap and robots.txt generation"
```

---

### Task 14: Vercel Deployment Config

**Files:**
- Create: `vercel.ts`

- [ ] **Step 1: Install Vercel config package**

```bash
npm install @vercel/config
```

- [ ] **Step 2: Create vercel.ts config**

Create `vercel.ts`:

```ts
import type { VercelConfig } from "@vercel/config/v1";

export const config: VercelConfig = {
  buildCommand: "npm run build",
  framework: "nextjs",
};
```

- [ ] **Step 3: Verify build**

```bash
npm run build
```

Expected: Build succeeds.

- [ ] **Step 4: Commit**

```bash
git add vercel.ts package.json package-lock.json
git commit -m "feat: add Vercel deployment config"
```

---

### Task 15: Final Verification + Update EntryDetail Breadcrumb

**Files:**
- Modify: `src/components/entry-detail.tsx` (replace inline breadcrumb with Breadcrumb component)

- [ ] **Step 1: Update EntryDetail to use shared Breadcrumb component**

In `src/components/entry-detail.tsx`, replace the inline breadcrumb `<nav>` with the shared component.

Add import:

```tsx
import { Breadcrumb } from "./breadcrumb";
```

Replace the `<nav className="mb-6 text-sm text-helper">...</nav>` block with:

```tsx
<Breadcrumb
  items={[
    { label: "Home", href: "/" },
    { label: category?.label ?? entry.category, href: `/category/${entry.category}` },
    { label: entry.title },
  ]}
/>
```

- [ ] **Step 2: Full browser walkthrough**

```bash
npm run dev
```

Test the complete flow:
1. Homepage loads — hero, type chips, search, tabs, card feed
2. Click a type chip — feed filters
3. Search for something — fuzzy results appear
4. Switch tabs — Latest/Featured/Trending
5. Click a category pill — category page loads with breadcrumb, entries
6. Click an entry card — detail page with MDX body, related entries
7. Click a tag — tag page loads with filtered entries
8. Navigate to `/about` — about page renders
9. Sidebar: hover to expand, click links
10. Mobile: resize to mobile width, hamburger works, cards stack single-column
11. Verify ⌘K focuses the search bar

- [ ] **Step 3: Production build check**

```bash
npm run build
```

Expected: Build succeeds with no warnings. All static pages generated.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "fix: use shared Breadcrumb in entry detail, final verification pass"
```

---

## Summary

| Task | What it builds | Key files |
|------|---------------|-----------|
| 1 | Next.js + Tailwind + shadcn scaffold | `package.json`, `src/app/` |
| 2 | Design tokens, fonts, global styles | `globals.css`, `tailwind.config.ts`, `public/fonts/` |
| 3 | Velite pipeline + schema + 3 dummy entries | `velite.config.ts`, `content/entries/`, `src/lib/constants.ts` |
| 4 | Entry helper functions | `src/lib/entries.ts` |
| 5 | Layout shell — TopNav + Sidebar | `src/components/top-nav.tsx`, `src/components/sidebar.tsx` |
| 6 | Homepage — hero, chips, search, tabs, feed | `src/app/page.tsx`, `src/app/home-content.tsx`, 4 components |
| 7 | EntryCard component | `src/components/entry-card.tsx` |
| 8 | Entry detail page + MDX rendering | `src/app/entry/[slug]/page.tsx`, 3 components |
| 9 | Category pages | `src/app/category/[slug]/page.tsx`, breadcrumb component |
| 10 | Tag pages | `src/app/tag/[tag]/page.tsx` |
| 11 | About page | `src/app/about/page.tsx` |
| 12 | Fuse.js search | `src/lib/search.ts` |
| 13 | SEO — sitemap + robots | `src/app/sitemap.ts`, `src/app/robots.ts` |
| 14 | Vercel deployment config | `vercel.ts` |
| 15 | Final verification + cleanup | Breadcrumb fix, full walkthrough |

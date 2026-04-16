# AI Knowledge Library

## What This Is

A public AI Knowledge Library — a Next.js dashboard-style app for browsing, filtering, and searching AI resources (prompts, agents, workflows, tools, curated links). Organized by business problem, tagged by tool, searchable across everything.

This is the BUILD project for the 75 Hard AI Challenge. Every commit is timestamped proof-of-work. The git history IS the progress story.

## Tech Stack

- **Next.js 15** (App Router)
- **Tailwind v4** + **shadcn/ui**
- **Velite or next-mdx-remote** for MDX processing
- **Fuse.js** for client-side search (v1)
- **Vercel** for deployment
- **`vercel.ts`** for project config (not vercel.json)

## Architecture

- **Content source:** MDX files in `/content/` directory, processed at build time
- **Entry schema:** Unified shape with `type` discriminator (`prompt | agent | workflow | tool | resource`)
- **Deployment:** Standalone app on a subdomain (TBD — e.g. `library.cosmo.com` or `ai.cosmo.com`), own Vercel project, zero coupling with main site

## Categories (7 business-problem areas)

| Category | Slug |
|----------|------|
| AI for Sales & Lead Generation | `sales` |
| AI for Operations & Workflow Efficiency | `operations` |
| AI for Content & Marketing | `content-marketing` |
| AI for Client Communication & Support | `client-support` |
| AI for Data, Reporting & Decision Making | `data-decisions` |
| AI for Personal Productivity & Learning | `productivity` |
| AI for Personal Development & Growth | `personal` |

## Entry Schema (starting point — will be refined)

```typescript
{
  title: string
  slug: string           // auto from filename
  description: string    // 1-2 sentences
  category: Category     // one of the 7 business problems
  type: 'prompt' | 'agent' | 'workflow' | 'tool' | 'resource'
  tags: string[]         // tools/tech used
  featured: boolean      // editor's pick for dashboard
  publishedAt: string    // ISO date
  body: MDX              // the actual content
  sourceUrl?: string     // optional external link
}
```

## Navigation — Dual-Axis Discovery

- **Primary axis:** Browse by business problem category (consultant-facing)
- **Secondary axis:** Filter/search by tool tags (technical-facing)
- Same entry, two discovery paths

## Content Strategy

- **Own creations** = full entries with body content (prompts, agents, workflows)
- **Curated external** = lighter entries (title, description, why it's good, link out)
- Both live in the same system, differentiated by content depth

## 30-Day Build Phases

- **Week 1 (Apr 16–22):** Foundation — scaffold app, lock schema, deploy staging
- **Week 2 (Apr 23–29):** UI shell — dashboard, category pages, tags, search, 10 real entries
- **Week 3 (Apr 30–May 6):** Excavation sprint — pull everything from all sources, target 50+ entries
- **Week 4 (May 7–13):** Polish & launch — quality pass, design polish, production deploy

## Conventions

- Commits should be meaningful and descriptive — they're public proof-of-work
- MDX content lives in `/content/` organized by type or category (TBD during scaffold)
- Tags start loose, consolidate in Week 4
- Mobile-first responsive design
- Dark mode support planned

## Key Files

- `/content/` — MDX library entries
- `/src/app/` — Next.js App Router pages
- `/src/components/` — React components (shadcn/ui based)
- `/vercel.ts` — Vercel project configuration

## Planning Doc

Full 30-day build plan lives in Obsidian:
`cosmo-vault/04-projects/75-Hard-AI-Challenge/planning/75 Hard AI — AI Knowledge Library (30-Day Build Plan).md`

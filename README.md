# AI Knowledge Library

Version `0.1.1`

Cosmo's curated library of AI Knowledge — prompts, agents, skills, workflows, tools, curated resources, and lessons learned — organized so that both him and anyone else can actually find and use them.

I've spent years building AI solutions, and the useful stuff ended up everywhere: Claude projects, ChatGPT history, n8n workflows, Obsidian notes, client folders, bookmarks, half-finished docs. This library pulls all of it into one place. Everything is organized by business problem, tagged by tool, and searchable across the board. Whether you're looking for a specific prompt, an automation workflow, or just want to browse what's possible with AI — it's here.

Built by Cosmin 'Cosmo' Lungu ([Autom8Lab](https://autom8lab.com)) as the BUILD project for the **75 Hard AI Challenge** — 75 days of daily commits to go from scattered knowledge to a structured, public resource.

## Status

`0.1.1` is ready for publishing as a static Vercel deployment candidate.

Implemented:
- Next.js 16 App Router project created with `create-next-app`
- Tailwind v4 and shadcn/ui integration
- Autom8Lab black/blue brand system
- Self-hosted Satoshi and Cabinet Grotesk fonts
- Velite MDX content pipeline
- Homepage with hero, type filters, search, tabs, and card feed
- Category, tag, entry detail, and about pages
- Client-side fuzzy search with Fuse.js
- Sitemap and robots routes
- Vercel project config

## How it works

- **Browse by business problem** — 7 categories: Sales, Operations, Content & Marketing, Client Support, Data & Decisions, Productivity, Personal Development
- **Filter by type** — Prompts, Agents, Workflows, Tools, Resources, Posts
- **Search by tool** — Click any tag (Claude, n8n, Make, etc.) to find everything using it
- **Fuzzy search** — Hit Cmd+K to search across the whole library

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

If port `3000` is busy:

```bash
npm run dev -- -p 3001
```

## Build

```bash
npm run build
```

The build runs Velite first, validates content, and then generates the static Next.js routes.

## Versioning

Every commit must update the project version before it is committed. This keeps the visible app version, package metadata, and Git history aligned.

Use semantic versioning:
- Patch version: update the last number for normal commits, fixes, docs, small UI changes, and content updates. Example: `0.1.1` -> `0.1.2`.
- Minor version: update the middle number for meaningful feature groups or larger milestones. Example: `0.1.9` -> `0.2.0`.
- Major version: update the first number for breaking changes, major redesigns, or production-level releases. Example: `0.9.8` -> `1.0.0`.

The sidebar displays the version from `package.json`, so `package.json` and `package-lock.json` are the version source of truth.

Recommended command for a normal commit:

```bash
npm version patch --no-git-tag-version
```

## Tech stack

- **Next.js 16** (App Router) + **Tailwind v4** + **shadcn/ui**
- **Velite** for MDX content processing at build time
- **Fuse.js** for client-side fuzzy search
- **Vercel** for deployment
- MDX files in `/content/entries/` — no database, no CMS

## Content

Library entries live as MDX files in `/content/entries/`. Each file has frontmatter (title, description, category, type, tags) and a markdown body. Velite validates and processes them at build time.

Adding a new entry = creating one `.mdx` file and pushing a commit.

Required frontmatter:

```mdx
---
title: "Sales Outreach Email Generator"
description: "A Claude prompt that generates personalized cold outreach emails."
category: sales
type: prompt
tags: [claude, prompt-engineering, sales]
featured: true
publishedAt: 2026-04-16
sourceUrl: ""
---
```

## Design

Dark, premium aesthetic inspired by [theresanaiforthat.com](https://theresanaiforthat.com). The layout, information density, left rail, tabs, search prominence, and card-feed structure follow the TAAFT references. The colors and typography are Autom8Lab.

Brand source of truth:
- [Branding guide](docs/BRANDING.md)

Current core colors:

| Token | Value | Usage |
|---|---:|---|
| `--background` | `#0b0f1a` | App canvas |
| `--card-surface` | `rgba(255, 255, 255, 0.03)` | Glass cards |
| `--card-border` | `rgba(255, 255, 255, 0.06)` | Glass card borders |
| `--border` | `#1e293b` | Dividers and controls |
| `--heading` | `#f1f5f9` | Headings |
| `--body` | `#94a3b8` | Body copy |
| `--helper` | `#64748b` | Metadata |
| `--action` | `#3b82f6` | Links, CTAs, active states |
| `--action-hover` | `#60a5fa` | Hover states |
| `--featured` | `#f59e0b` | Featured badges |

Implementation source:
- `src/app/globals.css` for global tokens
- `src/lib/constants.ts` for type badge colors
- `docs/design-references/` for visual layout references

## Project docs

- [Branding guide](docs/BRANDING.md)
- [Design spec](docs/superpowers/specs/2026-04-16-ai-knowledge-library-design.md)
- [Implementation plan](docs/superpowers/plans/2026-04-16-ai-knowledge-library.md)

## Publishing checklist

- `npm run build` passes
- `npm run lint` passes
- `npm audit` has no known vulnerabilities
- `package.json` version matches the intended release version
- Vercel can build with the checked-in `vercel.ts`
- Starter MDX content exists in `/content/entries/`
- Brand tokens are documented in [docs/BRANDING.md](docs/BRANDING.md)

# AI Library

Cosmo's curated library of AI Knowledge — prompts, agents, skills, workflows, tools, curated resources, and lessons learned — organized so that both him and anyone else can actually find and use them.

I've spent years building AI solutions, and the useful stuff ended up everywhere: Claude projects, ChatGPT history, n8n workflows, Obsidian notes, client folders, bookmarks, half-finished docs. This library pulls all of it into one place. Everything is organized by business problem, tagged by tool, and searchable across the board. Whether you're looking for a specific prompt, an automation workflow, or just want to browse what's possible with AI — it's here.

Built by Cosmin 'Cosmo' Lungu ([Autom8Lab](https://autom8lab.com)) as the BUILD project for the **75 Hard AI Challenge** — 75 days of daily commits to go from scattered knowledge to a structured, public resource.

## How it works

- **Browse by business problem** — 7 categories: Sales, Operations, Content & Marketing, Client Support, Data & Decisions, Productivity, Personal Development
- **Filter by type** — Prompts, Agents, Workflows, Tools, Resources, Posts
- **Search by tool** — Click any tag (Claude, n8n, Make, etc.) to find everything using it
- **Fuzzy search** — Hit Cmd+K to search across the whole library

## Tech stack

- **Next.js 16** (App Router) + **Tailwind v4** + **shadcn/ui**
- **Velite** for MDX content processing at build time
- **Fuse.js** for client-side fuzzy search
- **Vercel** for deployment
- MDX files in `/content/entries/` — no database, no CMS

## Content

Library entries live as MDX files in `/content/entries/`. Each file has frontmatter (title, description, category, type, tags) and a markdown body. Velite validates and processes them at build time.

Adding a new entry = creating one `.mdx` file and pushing a commit.

## Design

Dark, premium aesthetic inspired by [theresanaiforthat.com](https://theresanaiforthat.com). Glass-style cards, clean blue action color, Satoshi + Cabinet Grotesk typography. Design references in `docs/design-references/`.

## Project docs

- [Design spec](docs/superpowers/specs/2026-04-16-ai-knowledge-library-design.md)
- [Implementation plan](docs/superpowers/plans/2026-04-16-ai-knowledge-library.md)

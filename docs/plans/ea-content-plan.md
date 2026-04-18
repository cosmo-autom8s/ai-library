# Content Plan: AI Executive Assistant → Library Entries

**Created:** 2026-04-18
**Author:** Cosmo + Claude
**Status:** Ready for implementation
**Source project:** [AI Executive Assistant](https://github.com/cosmo-autom8s/ai-executive-assistant)

---

## Context

### What is the AI Knowledge Library?

A Next.js dashboard app for browsing, filtering, and searching AI resources — prompts, agents, workflows, tools, curated links. Organized by business problem, tagged by tool, searchable across everything. Built as the BUILD project for the 75 Hard AI Challenge.

- **Repo:** `/Users/cosmo/Documents/AIProjects/ai-knowledge-library`
- **Content location:** MDX files in `/content/entries/`
- **Schema:** Defined in `velite.config.ts` — each entry has title, slug, description, category, type, tags, featured, publishedAt, sourceUrl, and MDX body
- **Existing entries for format reference:** `welcome-post.mdx`, `sales-outreach-prompt.mdx`, `n8n-lead-scoring.mdx`

### What is the AI Executive Assistant?

A personal executive assistant that lives in the terminal, built on Claude Code. It manages your day, tracks tasks, preps meetings, and keeps you accountable. Works with your existing tools (via MCP) or completely standalone.

- **Repo:** https://github.com/cosmo-autom8s/ai-executive-assistant
- **Architecture:** Three layers — skills (13 slash commands) → profile (personality + preferences) → context (file-based memory across sessions)
- **Key files:** Skills in `.claude/commands/ea-*.md`, guide in `EA-GUIDE.md`, templates in `templates/`

### Why these entries?

The EA is Cosmo's first AI agent build. It contains multiple angles of content — the agent itself, individual prompts that are reusable standalone, workflow patterns, architectural lessons, beginner-friendly explainers, and personal narrative. These 9 entries extract maximum value from one project while each standing on its own as a genuinely useful library entry.

### Audience

Mixed — from beginners who are exploring what's possible with AI to practitioners who want reusable prompts and patterns. Some entries go deep and specific (architecture, velocity tracking), others go simple and general (lessons learned, MCP explainer). Both are valuable.

### Entry format

Each entry is an MDX file with this frontmatter structure:

```mdx
---
title: "Entry Title"
slug: entry-slug
description: "1-2 sentence description."
category: one-of-seven-categories
type: prompt | agent | workflow | tool | resource | post
tags: [tag1, tag2, tag3]
featured: true | false
publishedAt: 2026-04-18
sourceUrl: ""
---

## Section heading

Body content in markdown...
```

**Categories:** `sales`, `operations`, `content-marketing`, `client-support`, `data-decisions`, `productivity`, `personal`

**Writing style:** Direct, no fluff. Sections follow a pattern like "What it does" → "How it works" / "The prompt" → "Why it works." Keep entries concise but substantive. Reference other library entries where relevant with relative links.

---

## Entries to Create (9 total)

### Task 1: AI Executive Assistant (Overview)

- **File:** `content/entries/ai-executive-assistant.mdx`
- **Type:** `agent` | **Category:** `productivity` | **Featured:** yes
- **Tags:** `claude-code`, `ai-executive-assistant`, `agent-architecture`, `productivity`
- **sourceUrl:** `https://github.com/cosmo-autom8s/ai-executive-assistant`

**Description:** A terminal-based AI executive assistant built on Claude Code that manages your day, tracks tasks, preps meetings, and keeps you accountable.

**Body outline:**
- **What it is** — personal EA that lives in your terminal, built on Claude Code. Not a chatbot — a persistent agent with memory across sessions.
- **Why I built it** — knowledge and tasks scattered across tools, wanted one system that understands how I work and holds me accountable.
- **How it works** — the three-layer architecture: skills (what it can do) → profile (how it does it for you) → context files (what it remembers). Brief explanation of each layer.
- **The daily flow** — Morning Brief → work + task capture/delegation → Afternoon Check-in → Night Cleanup → feeds into next morning. Visual or list format.
- **All 13 commands** — table from the README (command + one-liner description).
- **Getting started** — install instructions, link to repo.

**Source material:** README.md, EA-GUIDE.md

**Notes:** This is the anchor entry. All other EA entries reference back to this one. Write it as a "product page" for your own creation — what it is, why it exists, how to get it.

---

### Task 2: Energy-Optimized Daily Planning Prompt

- **File:** `content/entries/energy-optimized-daily-planning.mdx`
- **Type:** `prompt` | **Category:** `productivity` | **Featured:** no
- **Tags:** `claude-code`, `ai-executive-assistant`, `prompt-engineering`, `energy-management`, `task-management`
- **sourceUrl:** `https://github.com/cosmo-autom8s/ai-executive-assistant`

**Description:** A prompt framework that builds your daily plan around energy levels — matching deep work to peak focus, admin to low-energy windows, with an 80% capacity buffer to prevent overcommitting.

**Body outline:**
- **What it does** — pulls calendar, tasks, email, and context → splits tasks by size → scores Top 3 by Impact × Urgency → matches to energy windows → applies 80% capacity buffer.
- **The framework** — step by step:
  1. Gather data (calendar, tasks, context)
  2. Split by size: S tasks → Quick Wins, M/L tasks → Top 3 candidates
  3. Score M/L tasks: Impact × Urgency
  4. Capacity check: sum task sizes vs. available hours, apply 80% buffer
  5. Energy matching: deep work → peak, creative → creative window, admin → low-energy
  6. Context bundling: group related tasks to reduce switching
- **The output template** — the actual format (Top 3, Quick Wins, Calendar, Energy Plan)
- **Why it works** — most planning ignores energy. You put your hardest task at 3pm after three meetings and wonder why you can't focus. This prompt forces alignment between what you need to do and when you're capable of doing it.
- **Reference** — link back to the AI Executive Assistant entry, mention this is the `/ea-morning-brief` skill.

**Source material:** `.claude/commands/ea-morning-brief.md` (Phases 2-3 are the core framework)

---

### Task 3: Pre-Meeting Briefing Prompt

- **File:** `content/entries/pre-meeting-briefing-prompt.mdx`
- **Type:** `prompt` | **Category:** `operations` | **Featured:** no
- **Tags:** `claude-code`, `ai-executive-assistant`, `prompt-engineering`, `meeting-prep`
- **sourceUrl:** `https://github.com/cosmo-autom8s/ai-executive-assistant`

**Description:** A structured prompt that generates a pre-meeting brief — who you're meeting, why it matters, what's open, and the questions you should ask.

**Body outline:**
- **What it does** — generates a one-page brief before any meeting so you walk in prepared with context, open items, and a clear desired outcome.
- **The quick-scan header** — WHO / WHY IT MATTERS / TOP QUESTION format. Three lines that give you the essence in 10 seconds.
- **The full brief structure:**
  - Meeting details (who, when, where)
  - Why this meeting matters (stakes, context)
  - 3 priorities for this meeting
  - Context from previous interactions (last met, decisions made, commitments)
  - Open items (tasks, waiting-on items related to attendees)
  - Questions to ask
  - Watch-fors
  - Desired outcome
  - Next step to propose
- **How to feed it context** — what data sources make this better (calendar, CRM, task tool, notes from last meeting)
- **Why "desired outcome" is the most important field** — most people go into meetings without knowing what success looks like. This one field forces clarity.
- **Reference** — link back to AI Executive Assistant entry.

**Source material:** `.claude/commands/ea-meeting-prep.md`

---

### Task 4: Daily Productivity Cycle

- **File:** `content/entries/daily-productivity-cycle.mdx`
- **Type:** `workflow` | **Category:** `operations` | **Featured:** no
- **Tags:** `claude-code`, `ai-executive-assistant`, `workflow-automation`, `task-management`, `productivity`
- **sourceUrl:** `https://github.com/cosmo-autom8s/ai-executive-assistant`

**Description:** A four-phase daily workflow — morning planning, active work, afternoon review, and nightly cleanup — where each phase feeds into the next so you never start from zero.

**Body outline:**
- **What it is** — a daily operating rhythm where an AI assistant handles the meta-work (planning, reviewing, organizing) so you focus on the actual work.
- **The four phases:**
  1. **Morning Brief** — pull data, build energy-optimized plan, set Top 3 + Quick Wins
  2. **During the day** — capture tasks as they come, delegate with tracking, prep for meetings
  3. **Afternoon Check-in** — review what got done vs. planned, update statuses, plan tomorrow
  4. **Night Cleanup** — autonomous: size unsized tasks, flag overdue, rebuild task cache, draft tomorrow's plan
- **The feedback loop** — night cleanup writes a DRAFT → morning brief reads it as a head start → the cycle compounds. You never open a blank page.
- **The weekly layer** — Monday planning (set sprint goal, slot tasks into days) → daily cycles → Friday retro (velocity, patterns, recommendations)
- **The monthly layer** — 3 focus areas that everything below filters against. If a task doesn't connect to a monthly goal, it's flagged as an orphan.
- **Why it works** — it's not about any single phase, it's the chain. Each phase primes the next. The system gets smarter over time because the velocity data accumulates.
- **Reference** — link to the morning brief prompt entry, the retro entry, and the main EA entry.

**Source material:** EA-GUIDE.md (daily rhythm section), ea-morning-brief.md, ea-checkin.md, ea-night-cleanup.md

---

### Task 5: Weekly Retrospective with Velocity Tracking

- **File:** `content/entries/weekly-retro-velocity-tracking.mdx`
- **Type:** `prompt` | **Category:** `data-decisions` | **Featured:** no
- **Tags:** `claude-code`, `ai-executive-assistant`, `prompt-engineering`, `velocity-tracking`, `retrospective`, `productivity`
- **sourceUrl:** `https://github.com/cosmo-autom8s/ai-executive-assistant`

**Description:** A data-driven weekly retrospective prompt that calculates completion rate, overcommit score, and 3-week rolling trends to surface productivity patterns you can't see in the moment.

**Body outline:**
- **What it does** — analyzes your week with real numbers before asking how it felt. Planned vs. actual, completion rate, overcommit score, pattern detection, monthly goal alignment.
- **The metrics:**
  - Completion rate: completed / planned (percentage)
  - Overcommit score: planned / completed (>1.5 means you're chronically overcommitting)
  - 3-week rolling average — spot trends, not noise
- **Pattern detection prompts** — what to look for:
  - Meeting-heavy days killing deep work
  - Energy crashes (what happened the day before?)
  - Scope creep from unplanned tasks crowding out planned work
  - Context switching vs. bundling effectiveness
- **Monthly goal alignment check** — for each goal: how many tasks supported it, did it get attention or was it ignored, is it on track?
- **The output template** — the full retro format with numbers, sprint goal check, wins, misses, patterns, recommendations
- **Why quantitative before qualitative** — most retros are just vibes. "This week felt busy." This prompt forces numbers first, then asks what the numbers miss. The overcommit score alone is worth the whole retro — most people don't realize they're planning 150% of what they can actually do.
- **Reference** — link to the EA entry and the daily workflow entry.

**Source material:** `.claude/commands/ea-weekly-retro.md`

---

### Task 6: Building a Stateful Agent on Claude Code

- **File:** `content/entries/building-stateful-agent-claude-code.mdx`
- **Type:** `post` | **Category:** `productivity` | **Featured:** yes
- **Tags:** `claude-code`, `ai-executive-assistant`, `agent-architecture`, `prompt-engineering`, `mcp`
- **sourceUrl:** `https://github.com/cosmo-autom8s/ai-executive-assistant`

**Description:** How to turn Claude Code into a persistent agent using the three-layer pattern — skills for capabilities, a profile for identity, and context files for memory across sessions.

**Body outline:**
- **The problem** — Claude Code is powerful but stateless by default. Each conversation starts fresh. How do you build something that remembers, adapts, and operates across sessions?
- **The three-layer pattern:**
  1. **Skills (capabilities)** — each `.md` file in `~/.claude/commands/` becomes a slash command. A skill is just a detailed prompt with structure. The EA has 13 of them.
  2. **Profile (identity)** — a single file (`ea-profile.md`) that tells the agent who you are, how you work, and what to watch for. This is what makes it personal without fine-tuning.
  3. **Context files (memory)** — markdown files in `~/.claude/ea-context/` that persist between sessions: today's plan, weekly goals, velocity data, delegation log, decisions, waiting-on items.
- **The autonomous boundary** — the night cleanup skill as the case study. What the agent CAN do without permission (read, write context, update task properties) vs. what it CANNOT (change task status, delete, send messages). Designing guardrails for autonomous operation.
- **The distribution pattern** — `install.sh` copies skills to the right location, creates context directory from templates, generates a profile. `uninstall.sh` cleans up. The agent is portable.
- **Key insight** — you don't need a framework, a database, or a vector store to build a stateful agent. Files + prompts + a clear architecture pattern is enough.
- **Reference** — link to the EA entry and the lessons learned entry.

**Source material:** All skill files (for architecture examples), install.sh, templates/

---

### Task 7: Lessons Learned Building My First AI Agent

- **File:** `content/entries/lessons-learned-first-ai-agent.mdx`
- **Type:** `post` | **Category:** `personal` | **Featured:** no
- **Tags:** `claude-code`, `ai-executive-assistant`, `lessons-learned`, `agent-architecture`
- **sourceUrl:** `https://github.com/cosmo-autom8s/ai-executive-assistant`

**Description:** What I learned building my first AI agent from scratch — what surprised me, what I got wrong, and what I'd tell someone starting today.

**Body outline:**
- **Why I built it** — the origin story. What was the problem, what was the trigger to actually build something.
- **What I expected vs. what happened** — preconceptions about building an agent vs. reality.
- **The "it's not a chatbot" moment** — when the distinction between a prompt and an agent clicked. What makes an agent an agent (persistence, context, proactive behavior, accountability).
- **Mistakes I made early** — specific things that didn't work and how I course-corrected. (Cosmo to fill in with real experiences.)
- **What surprised me** — things that were easier or harder than expected. Capabilities that emerged that weren't planned.
- **What I'd do differently** — with hindsight, what would the v2 approach look like?
- **Advice for someone starting today** — practical, beginner-friendly. Not "learn prompt engineering" but specific, actionable tips.
- **Reference** — link to the EA entry, the architecture post, and the MCP post.

**Source material:** This is primarily Cosmo's personal narrative. The README and EA-GUIDE provide factual grounding, but the content is experiential. **This entry requires Cosmo's direct input** — the agent writing it should ask for stories, surprises, and mistakes rather than fabricating them.

**IMPORTANT:** Do not invent personal experiences. Ask Cosmo what actually happened. Placeholder sections are better than fabricated stories.

---

### Task 8: How MCP Integrations Supercharge Your AI Agent

- **File:** `content/entries/mcp-integrations-supercharge-ai-agent.mdx`
- **Type:** `post` | **Category:** `operations` | **Featured:** no
- **Tags:** `claude-code`, `ai-executive-assistant`, `mcp`, `notion`, `google-calendar`, `gmail`, `integrations`
- **sourceUrl:** `https://github.com/cosmo-autom8s/ai-executive-assistant`

**Description:** How connecting your tools via MCP transforms an AI agent from a smart guesser into an informed operator — and why it's simpler than you think.

**Body outline:**
- **What is MCP** — in plain language. A standard way for AI to talk to your existing tools. No custom APIs, no webhooks, no code.
- **The before and after** — what the EA can do standalone (works with local context files, asks you questions) vs. with tools connected (pulls real calendar data, reads actual tasks, scans your email). Concrete examples of each.
- **The four tool categories and what each unlocks:**
  - Task manager (Notion, Todoist, Linear) → real task data, auto-sizing, daily plans from actual work
  - Calendar (Google Calendar, Outlook) → schedule-aware planning, meeting prep, free time detection
  - Knowledge base (Obsidian, Apple Notes) → energy awareness from daily notes, yesterday's context
  - Email (Gmail, Outlook) → urgent item flagging, morning inbox scan
- **How simple it actually is** — one command: `claude mcp add [tool]`. Or just tell Claude Code "connect my Notion." That's it.
- **The insight** — AI agents are only as good as the data they can access. A brilliant model with no context is just guessing. MCP is the bridge between "smart" and "useful."
- **Which integrations had the biggest impact** — Cosmo's personal ranking and why. (Cosmo to provide.)
- **Reference** — link to the EA entry, the architecture post.

**Source material:** README.md (tool categories section), EA-GUIDE.md (tool section), ea-morning-brief.md (shows how each tool category is used in practice)

**Note:** Like Entry 7, this benefits from Cosmo's personal take on which integrations mattered most. Ask rather than assume.

---

### Task 9: The 80% Rule — Task Sizing and Capacity Planning

- **File:** `content/entries/task-sizing-capacity-planning.mdx`
- **Type:** `prompt` | **Category:** `productivity` | **Featured:** no
- **Tags:** `claude-code`, `ai-executive-assistant`, `prompt-engineering`, `task-management`, `capacity-planning`
- **sourceUrl:** `https://github.com/cosmo-autom8s/ai-executive-assistant`

**Description:** A simple framework for sizing tasks, setting daily capacity, and applying the 80% buffer rule so you stop overcommitting and start finishing what you planned.

**Body outline:**
- **The problem** — most people plan as if every hour is productive and every task takes the expected time. Then they feel like failures when they finish 60% of what they planned. The problem isn't execution — it's planning.
- **The sizing framework:**
  - S = <30 minutes (quick follow-ups, replies, approvals)
  - M = 30min–2hr (drafts, calls, research, meeting prep)
  - L = 2hr+ (deep work, presentations, strategy)
- **Default daily capacity** — 1L + 2M + 2S (~5-6h actual work). That's a full productive day for most humans.
- **The 80% buffer rule** — only plan for 80% of available hours after meetings. Why: interruptions, context switching, bathroom breaks, thinking time. If you have 6 free hours, plan 4.8h of tasks.
- **Top 3 vs. Quick Wins** — M/L tasks compete for your Top 3 (the things that move the needle). S tasks go in the Quick Wins pile for admin time or between meetings. They don't compete for the same slots.
- **Impact × Urgency scoring** — how to pick which M/L tasks make the Top 3: Does it move a goal? Does it have a deadline? Does it unblock other work?
- **Why this prevents the overcommit spiral** — overcommitting → not finishing → guilt → overcommitting to "catch up" → repeat. The 80% rule breaks the cycle by making realistic planning the default.
- **Reference** — link to the morning brief prompt entry and the weekly retro entry (where overcommit score validates whether your capacity planning is working).

**Source material:** ea-morning-brief.md (Phase 2: capacity check, task splitting), ea-weekly-retro.md (overcommit score), EA-GUIDE.md (task sizing table)

---

## Implementation Notes

### Order of implementation

Write and review one at a time, in this order:

1. **Task 1: AI Executive Assistant** — the anchor. Everything references this.
2. **Task 7: Lessons Learned** — requires Cosmo's personal input, so start it early to collect stories.
3. **Task 6: Building a Stateful Agent** — the technical companion to Entry 1.
4. **Task 8: MCP Integrations** — beginner-friendly, benefits from Cosmo's personal ranking.
5. **Task 2: Energy-Optimized Daily Planning** — the strongest standalone prompt.
6. **Task 3: Pre-Meeting Briefing** — another strong standalone prompt.
7. **Task 9: Task Sizing & 80% Rule** — the simplest framework, good foundation for entries 2 and 5.
8. **Task 5: Weekly Retro & Velocity** — references the 80% rule and morning brief.
9. **Task 4: Daily Productivity Cycle** — the workflow that ties everything together. Write last because it references several other entries.

### Entries that need Cosmo's personal input

- **Task 7 (Lessons Learned):** Mistakes, surprises, what you'd do differently — don't fabricate.
- **Task 8 (MCP Integrations):** Which integrations had the biggest impact for you.
- **Task 1 (EA Overview):** The "why I built it" narrative.

### Cross-references

Entries should link to each other where relevant using relative paths: `[AI Executive Assistant](/ai-executive-assistant)`. This creates a web of content, not isolated pages.

### Future: Multi-category support

Currently `category` is a single enum in `velite.config.ts`. A separate task will change it to an array to support entries appearing in multiple categories. Planned category mappings:

| Entry | Primary | Would also fit in |
|-------|---------|-------------------|
| AI Executive Assistant | `productivity` | `operations`, `personal` |
| Energy-Optimized Daily Planning | `productivity` | `operations`, `personal` |
| Pre-Meeting Briefing | `operations` | `productivity`, `client-support` |
| Daily Productivity Cycle | `operations` | `productivity` |
| Weekly Retro & Velocity | `data-decisions` | `productivity`, `operations` |
| Building a Stateful Agent | `productivity` | `operations` |
| Lessons Learned | `personal` | `productivity` |
| MCP Integrations | `operations` | `productivity` |
| Task Sizing & 80% Rule | `productivity` | `operations`, `personal` |

This is documented here so the multi-category implementation can use this table directly.

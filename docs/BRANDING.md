# Autom8Lab AI Knowledge Library Branding

This is the single source of truth for the AI Knowledge Library visual system.

The layout and interaction references come from the saved TAAFT screenshots in `docs/design-references/`, but the colors, typography, and component skin belong to Autom8Lab.

## Brand Direction

Autom8Lab should feel sharp, practical, technical, calm, and operational. The interface is dark, premium, searchable, and useful without loud decoration.

Use:
- Dark canvas with subtle depth
- Glass-style cards
- Blue action language
- Clear hierarchy
- Direct copy
- Restrained motion

Avoid:
- Gold as the main brand accent for this project
- Generic purple SaaS gradients
- Bright white surfaces
- Heavy shadows
- Decorative animation that does not help the user

## Color Tokens

These colors map directly to `src/app/globals.css`.

| Token | CSS variable | Value | Usage |
|---|---|---:|---|
| Page background | `--background` | `#0b0f1a` | Main app canvas |
| Foreground | `--foreground` | `#f1f5f9` | Default high-contrast text |
| Heading text | `--heading` | `#f1f5f9` | Headings, important labels |
| Body text | `--body` | `#94a3b8` | Main copy and descriptions |
| Helper text | `--helper` | `#64748b` | Captions, metadata, subtle labels |
| Action blue | `--action` | `#3b82f6` | CTAs, links, selected states |
| Action hover | `--action-hover` | `#60a5fa` | Hover state for action blue |
| Featured warm | `--featured` | `#f59e0b` | Featured badges and rare highlights |
| Card surface | `--card-surface` | `rgba(255, 255, 255, 0.03)` | Glass card fill |
| Card border | `--card-border` | `rgba(255, 255, 255, 0.06)` | Glass card border |
| Structural border | `--border` | `#1e293b` | Inputs, dividers, secondary controls |
| Focus ring | `--ring` | `#3b82f6` | Focus states |

## shadcn/ui Token Mapping

The shadcn-compatible tokens also live in `src/app/globals.css` and should stay aligned with the Autom8Lab palette.

| Token | Value | Usage |
|---|---:|---|
| `--primary` | `#3b82f6` | Primary buttons, active pills |
| `--primary-foreground` | `#ffffff` | Text on primary blue |
| `--secondary` | `#111827` | Secondary surfaces |
| `--muted` | `#111827` | Muted surfaces |
| `--muted-foreground` | `#64748b` | Muted text |
| `--accent` | `#1e293b` | Subtle hover/active backgrounds |
| `--accent-foreground` | `#f1f5f9` | Text on accent surfaces |
| `--card` | `#111827` | Solid card surfaces and code blocks |
| `--sidebar` | `#0b0f1a` | Sidebar and top-nav shell |
| `--sidebar-primary` | `#3b82f6` | Sidebar active states |

## Type Badge Colors

Type badges use restrained scan colors in `src/lib/constants.ts`.

| Type | Classes | Purpose |
|---|---|---|
| Prompt | `bg-action/15 text-action` | Primary blue |
| Agent | `bg-[#60a5fa]/15 text-[#93c5fd]` | Light blue |
| Workflow | `bg-[#2dd4bf]/15 text-[#8ceee3]` | Teal |
| Tool | `bg-[#f59e0b]/15 text-[#fbbf24]` | Warm highlight |
| Resource | `bg-white/10 text-[#cbd5e1]` | Neutral |
| Post | `bg-[#a78bfa]/15 text-[#c4b5fd]` | Purple support color |

## Typography

Fonts are self-hosted in `public/fonts/`.

| Role | Font | Usage |
|---|---|---|
| Display | Satoshi | Hero headings, section headings, card titles |
| Body | Cabinet Grotesk | Body copy, navigation, forms, helper text |

## Implementation Rules

- Change colors through `src/app/globals.css` first.
- Do not add one-off color values unless they are type badge colors or documented here.
- Keep the site dark-only for `0.1.0`.
- Use `--action` / `text-action` for links and primary action language.
- Use `--featured` sparingly for featured states only.
- Preserve the TAAFT-inspired layout structure, but never copy TAAFT colors.

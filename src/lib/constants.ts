export const CATEGORIES = [
  { name: "AI for Sales & Lead Generation", slug: "sales", label: "Sales" },
  {
    name: "AI for Operations & Workflow Efficiency",
    slug: "operations",
    label: "Operations",
  },
  {
    name: "AI for Content & Marketing",
    slug: "content-marketing",
    label: "Content",
  },
  {
    name: "AI for Client Communication & Support",
    slug: "client-support",
    label: "Client Support",
  },
  {
    name: "AI for Data, Reporting & Decision Making",
    slug: "data-decisions",
    label: "Data",
  },
  {
    name: "AI for Personal Productivity & Learning",
    slug: "productivity",
    label: "Productivity",
  },
  {
    name: "AI for Personal Development & Growth",
    slug: "personal",
    label: "Personal Dev",
  },
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
  prompt: "bg-sky-500/20 text-sky-200",
  agent: "bg-indigo-500/20 text-indigo-200",
  workflow: "bg-emerald-500/20 text-emerald-200",
  tool: "bg-orange-500/20 text-orange-200",
  resource: "bg-cyan-500/20 text-cyan-200",
  post: "bg-rose-500/20 text-rose-200",
};

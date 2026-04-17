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
  prompt: "bg-action/15 text-action",
  agent: "bg-[#60a5fa]/15 text-[#93c5fd]",
  workflow: "bg-[#2dd4bf]/15 text-[#8ceee3]",
  tool: "bg-[#f59e0b]/15 text-[#fbbf24]",
  resource: "bg-white/10 text-[#cbd5e1]",
  post: "bg-[#a78bfa]/15 text-[#c4b5fd]",
};

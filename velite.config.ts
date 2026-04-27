import { defineCollection, defineConfig, s } from "velite";

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
    category: s.array(s.enum(categories)),
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

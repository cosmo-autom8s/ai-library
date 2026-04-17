import type { MetadataRoute } from "next";
import { entries } from "#site/content";

import { CATEGORIES } from "@/lib/constants";
import { getAllTags } from "@/lib/entries";

const BASE_URL = "https://ai.autom8lab.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const entryUrls = entries.map((entry) => ({
    url: `${BASE_URL}/entry/${entry.slug}`,
    lastModified: new Date(entry.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const categoryUrls = CATEGORIES.map((category) => ({
    url: `${BASE_URL}/category/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const tagUrls = getAllTags().map(({ tag }) => ({
    url: `${BASE_URL}/tag/${tag}`,
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

import { entries } from "#site/content";

export type Entry = (typeof entries)[number];

export function getAllEntries(): Entry[] {
  return [...entries].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
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
    .filter((candidate) => candidate.slug !== entry.slug)
    .filter(
      (candidate) =>
        candidate.category === entry.category ||
        candidate.tags.some((tag) => entry.tags.includes(tag)),
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

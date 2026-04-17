import Fuse from "fuse.js";

import type { Entry } from "@/lib/entries";

export function createSearchIndex(entries: Entry[]) {
  return new Fuse(entries, {
    keys: [
      { name: "title", weight: 2 },
      { name: "description", weight: 1.5 },
      { name: "tags", weight: 1 },
      { name: "category", weight: 0.5 },
      { name: "type", weight: 0.5 },
    ],
    threshold: 0.3,
    ignoreLocation: true,
    includeScore: true,
  });
}

export function searchEntries(index: Fuse<Entry>, query: string): Entry[] {
  if (!query.trim()) return [];

  return index.search(query).map((result) => result.item);
}

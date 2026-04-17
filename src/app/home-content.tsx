"use client";

import { useMemo, useState } from "react";
import { BookOpen } from "lucide-react";

import { EntryCard } from "@/components/entry-card";
import { HeroSection } from "@/components/hero-section";
import { SearchBar } from "@/components/search-bar";
import { TabRow } from "@/components/tab-row";
import { TypeChips } from "@/components/type-chips";
import type { Entry } from "@/lib/entries";

interface HomeContentProps {
  allEntries: Entry[];
  featuredEntries: Entry[];
  typeCounts: { type: string; count: number }[];
}

type ActiveTab = "latest" | "featured" | "trending";

export function HomeContent({
  allEntries,
  featuredEntries,
  typeCounts,
}: HomeContentProps) {
  const [activeTab, setActiveTab] = useState<ActiveTab>("latest");
  const [activeType, setActiveType] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const displayEntries = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    let result =
      activeTab === "featured" || activeTab === "trending"
        ? featuredEntries
        : allEntries;

    if (activeType) {
      result = result.filter((entry) => entry.type === activeType);
    }

    if (normalizedQuery) {
      result = result.filter(
        (entry) =>
          entry.title.toLowerCase().includes(normalizedQuery) ||
          entry.description.toLowerCase().includes(normalizedQuery) ||
          entry.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery)),
      );
    }

    return result;
  }, [activeTab, activeType, allEntries, featuredEntries, searchQuery]);

  return (
    <div className="min-h-screen bg-background">
      <div className="relative border-b border-border pb-12">
        <HeroSection />
        <div className="flex flex-col gap-7">
          <TypeChips
            counts={typeCounts}
            activeType={activeType}
            onToggle={setActiveType}
          />
          <SearchBar query={searchQuery} onChange={setSearchQuery} />
        </div>
      </div>

      <section className="relative min-h-screen bg-background">
        <TabRow activeTab={activeTab} onTabChange={setActiveTab} />
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 lg:grid-cols-[11rem_1fr]">
          <aside className="hidden lg:block">
            <div className="sticky top-40 space-y-3 text-sm font-black text-helper">
              <p className="rounded-lg bg-card-surface px-4 py-2 text-heading">
                Now
              </p>
              <p className="px-4">Apr</p>
              <p className="px-4">Mar</p>
              <p className="px-4">Feb</p>
              <p className="px-4">Jan</p>
              <p className="px-4">2026</p>
            </div>
          </aside>

          <div>
            <div className="mb-7 flex items-center gap-4">
              <div className="grid size-14 place-items-center rounded-xl border border-card-border bg-card-surface">
                <BookOpen className="size-7 text-heading" />
              </div>
              <div>
                <h2 className="font-display text-4xl font-black text-heading">
                  Just released
                </h2>
                <p className="mt-1 text-sm font-bold text-helper">
                  {displayEntries.length} entries ready to use
                </p>
              </div>
            </div>

            {displayEntries.length === 0 ? (
              <div className="rounded-2xl border border-card-border bg-card-surface p-10 text-center text-body">
                No entries found.
              </div>
            ) : (
              <div className="grid gap-5 md:grid-cols-2">
                {displayEntries.map((entry) => (
                  <EntryCard key={entry.slug} entry={entry} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

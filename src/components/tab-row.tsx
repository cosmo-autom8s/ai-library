"use client";

import { Flame, Sparkles, TrendingUp } from "lucide-react";

import { cn } from "@/lib/utils";

type TabId = "latest" | "featured" | "trending";

interface TabRowProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

const TABS = [
  { id: "latest" as const, label: "Latest", icon: Flame },
  { id: "featured" as const, label: "Featured", icon: Sparkles },
  { id: "trending" as const, label: "Trending", icon: TrendingUp },
];

export function TabRow({ activeTab, onTabChange }: TabRowProps) {
  return (
    <div className="sticky top-16 z-30 border-b border-border bg-background/95 py-4 backdrop-blur-md">
      <div className="mx-auto flex w-fit rounded-2xl border border-card-border bg-card-surface p-2 shadow-lg shadow-black/20">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "flex h-12 items-center gap-2 rounded-xl px-5 text-base font-black transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-body hover:text-heading",
              )}
            >
              <Icon className="size-5" />
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

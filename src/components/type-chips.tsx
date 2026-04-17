"use client";

import { ENTRY_TYPES, TYPE_COLORS } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface TypeChipsProps {
  counts: { type: string; count: number }[];
  activeType: string | null;
  onToggle: (type: string | null) => void;
}

export function TypeChips({ counts, activeType, onToggle }: TypeChipsProps) {
  return (
    <div className="mx-auto flex max-w-4xl flex-wrap justify-center gap-3 px-4">
      {ENTRY_TYPES.map((entryType) => {
        const count = counts.find((item) => item.type === entryType.value)?.count ?? 0;
        const isActive = activeType === entryType.value;

        return (
          <button
            key={entryType.value}
            type="button"
            onClick={() => onToggle(isActive ? null : entryType.value)}
            className={cn(
              "flex h-11 items-center gap-2 rounded-full border px-4 text-sm font-black transition-colors",
              isActive
                ? `border-primary bg-primary text-primary-foreground`
                : "border-card-border bg-card-surface text-body hover:border-border hover:text-heading",
            )}
          >
            <span
              className={cn(
                "size-2 rounded-full bg-body",
                isActive ? "bg-primary-foreground" : TYPE_COLORS[entryType.value],
              )}
            />
            <span>{entryType.label}</span>
            <span className="rounded-full bg-background px-2 py-0.5 text-xs text-heading">
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}

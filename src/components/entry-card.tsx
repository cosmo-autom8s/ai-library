import Link from "next/link";
import { Clock, Sparkles } from "lucide-react";

import { CATEGORIES, TYPE_COLORS } from "@/lib/constants";
import { formatDate, getPrimaryCategory, type Entry } from "@/lib/entries";
import { cn } from "@/lib/utils";

interface EntryCardProps {
  entry: Entry;
}

export function EntryCard({ entry }: EntryCardProps) {
  const primaryCategory = CATEGORIES.find(
    (item) => item.slug === getPrimaryCategory(entry),
  );
  const categoryLabels = entry.category
    .map((slug) => CATEGORIES.find((item) => item.slug === slug)?.label ?? slug)
    .join(" • ");

  return (
    <Link
      href={`/entry/${entry.slug}`}
      className="group block min-h-56 rounded-2xl border border-card-border bg-card-surface p-6 shadow-lg shadow-black/15 transition-colors hover:border-border"
    >
      <div className="flex items-start gap-4">
        <div className="grid size-14 shrink-0 place-items-center rounded-xl bg-background text-heading">
          <Sparkles className="size-6" />
        </div>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-display text-2xl font-black text-heading transition-colors group-hover:text-primary">
              {entry.title}
            </h3>
            {entry.featured ? (
              <span className="rounded-full bg-featured px-2.5 py-0.5 text-xs font-black text-background">
                Featured
              </span>
            ) : null}
          </div>
          <p className="mt-2 line-clamp-2 text-base font-semibold leading-relaxed text-body">
            {entry.description}
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {entry.category.map((category) => {
          const categoryLabel =
            CATEGORIES.find((item) => item.slug === category)?.label ?? category;

          return (
            <span
              key={category}
              className="rounded-full border border-card-border bg-background/40 px-3 py-1 text-xs font-bold text-helper"
            >
              {categoryLabel}
            </span>
          );
        })}
        <span
          className={cn(
            "rounded-full px-3 py-1 text-xs font-black",
            TYPE_COLORS[entry.type],
          )}
        >
          {entry.type}
        </span>
        {entry.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-card-border bg-background/40 px-3 py-1 text-xs font-bold text-body"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-card-border pt-4 text-sm font-bold text-helper">
        <span title={categoryLabels}>
          {primaryCategory?.label ?? getPrimaryCategory(entry)}
          {entry.category.length > 1 ? ` +${entry.category.length - 1}` : ""}
        </span>
        <span className="flex items-center gap-1.5">
          <Clock className="size-4" />
          {formatDate(entry.publishedAt)}
        </span>
      </div>
    </Link>
  );
}

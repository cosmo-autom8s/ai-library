import { ExternalLink, Sparkles } from "lucide-react";

import { Breadcrumb } from "@/components/breadcrumb";
import { TagPills } from "@/components/tag-pills";
import { CATEGORIES, TYPE_COLORS } from "@/lib/constants";
import { formatDate, type Entry } from "@/lib/entries";
import { cn } from "@/lib/utils";

interface EntryDetailProps {
  entry: Entry;
}

export function EntryDetail({ entry }: EntryDetailProps) {
  const category = CATEGORIES.find((item) => item.slug === entry.category);

  return (
    <article className="mx-auto max-w-4xl px-4 py-10">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          {
            label: category?.label ?? entry.category,
            href: `/category/${entry.category}`,
          },
          { label: entry.title },
        ]}
      />

      <header className="rounded-3xl border border-card-border bg-card-surface p-6 shadow-xl shadow-black/15 sm:p-8">
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <span
            className={cn(
              "rounded-full px-3 py-1 text-xs font-black",
              TYPE_COLORS[entry.type],
            )}
          >
            {entry.type}
          </span>
          {entry.featured ? (
            <span className="rounded-full bg-featured px-3 py-1 text-xs font-black text-background">
              Featured
            </span>
          ) : null}
          <span className="rounded-full border border-card-border bg-background/40 px-3 py-1 text-xs font-bold text-helper">
            {formatDate(entry.publishedAt)}
          </span>
        </div>

        <div className="flex items-start gap-5">
          <div className="hidden size-16 shrink-0 place-items-center rounded-2xl bg-background text-heading sm:grid">
            <Sparkles className="size-8" />
          </div>
          <div>
            <h1 className="font-display text-4xl font-black leading-tight text-heading sm:text-5xl">
              {entry.title}
            </h1>
            <p className="mt-4 max-w-3xl text-lg font-semibold leading-relaxed text-body">
              {entry.description}
            </p>
          </div>
        </div>

        <div className="mt-6">
          <TagPills tags={entry.tags} />
        </div>

        {entry.sourceUrl ? (
          <a
            href={entry.sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-card-border bg-background/40 px-4 py-2 text-sm font-black text-heading transition-colors hover:border-border"
          >
            View source
            <ExternalLink className="size-4" />
          </a>
        ) : null}
      </header>
    </article>
  );
}

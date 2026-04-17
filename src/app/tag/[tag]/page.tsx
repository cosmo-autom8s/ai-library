import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Breadcrumb } from "@/components/breadcrumb";
import { EntryCard } from "@/components/entry-card";
import { getAllTags, getEntriesByTag } from "@/lib/entries";

interface TagPageProps {
  params: Promise<{ tag: string }>;
}

export function generateStaticParams() {
  return getAllTags().map(({ tag }) => ({ tag }));
}

export async function generateMetadata({
  params,
}: TagPageProps): Promise<Metadata> {
  const { tag } = await params;

  return {
    title: `${tag} - AI Knowledge Library`,
    description: `AI resources tagged with ${tag}.`,
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params;
  const tagEntries = getEntriesByTag(tag);

  if (tagEntries.length === 0) notFound();

  return (
    <div className="min-h-screen bg-background">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: tag }]} />

        <header className="mb-8 rounded-3xl border border-card-border bg-card-surface p-6 shadow-xl shadow-black/15 sm:p-8">
          <p className="text-sm font-black uppercase tracking-normal text-helper">
            Tool tag
          </p>
          <h1 className="mt-2 font-display text-4xl font-black leading-tight text-heading sm:text-5xl">
            {tag}
          </h1>
          <p className="mt-4 text-lg font-semibold text-body">
            {tagEntries.length} resource
            {tagEntries.length === 1 ? "" : "s"} tagged with{" "}
            <span className="font-black text-heading">{tag}</span>
          </p>
        </header>

        <div className="grid gap-5 md:grid-cols-2">
          {tagEntries.map((entry) => (
            <EntryCard key={entry.slug} entry={entry} />
          ))}
        </div>
      </section>
    </div>
  );
}

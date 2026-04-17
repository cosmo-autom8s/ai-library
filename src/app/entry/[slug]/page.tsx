import * as runtime from "react/jsx-runtime";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { entries } from "#site/content";

import { EntryCard } from "@/components/entry-card";
import { EntryDetail } from "@/components/entry-detail";
import { mdxComponents } from "@/components/mdx-components";
import { getEntryBySlug, getRelatedEntries } from "@/lib/entries";

interface EntryPageProps {
  params: Promise<{ slug: string }>;
}

function getMDXComponent(code: string) {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
}

export function generateStaticParams() {
  return entries.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({
  params,
}: EntryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = getEntryBySlug(slug);

  if (!entry) return {};

  return {
    title: `${entry.title} - AI Knowledge Library`,
    description: entry.description,
  };
}

export default async function EntryPage({ params }: EntryPageProps) {
  const { slug } = await params;
  const entry = getEntryBySlug(slug);

  if (!entry) notFound();

  const MDXContent = getMDXComponent(entry.body);
  const relatedEntries = getRelatedEntries(entry);

  return (
    <div className="min-h-screen bg-background">
      <EntryDetail entry={entry} />

      <div className="mx-auto max-w-4xl px-4">
        <div className="rounded-3xl border border-card-border bg-card-surface p-6 shadow-xl shadow-black/15 sm:p-8">
          <MDXContent components={mdxComponents} />
        </div>
      </div>

      {relatedEntries.length > 0 ? (
        <section className="mx-auto max-w-4xl px-4 py-12">
          <h2 className="mb-5 font-display text-3xl font-black text-heading">
            Related entries
          </h2>
          <div className="grid gap-5 md:grid-cols-2">
            {relatedEntries.map((relatedEntry) => (
              <EntryCard key={relatedEntry.slug} entry={relatedEntry} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}

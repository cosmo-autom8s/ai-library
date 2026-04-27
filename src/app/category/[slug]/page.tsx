import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Breadcrumb } from "@/components/breadcrumb";
import { EntryCard } from "@/components/entry-card";
import { TagPills } from "@/components/tag-pills";
import { CATEGORIES } from "@/lib/constants";
import { getEntriesByCategory } from "@/lib/entries";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return CATEGORIES.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = CATEGORIES.find((item) => item.slug === slug);

  if (!category) return {};

  return {
    title: `${category.name} - AI Knowledge Library`,
    description: `AI resources for ${category.name.toLowerCase()}.`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = CATEGORIES.find((item) => item.slug === slug);

  if (!category) notFound();

  const categoryEntries = getEntriesByCategory(category.slug);
  const categoryTags = Array.from(
    new Set(categoryEntries.flatMap((entry) => entry.tags)),
  );

  return (
    <div className="min-h-screen bg-background">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <Breadcrumb
          items={[{ label: "Home", href: "/" }, { label: category.label }]}
        />

        <header className="mb-8 rounded-3xl border border-card-border bg-card-surface p-6 shadow-xl shadow-black/15 sm:p-8">
          <p className="text-sm font-black uppercase tracking-normal text-helper">
            Business problem
          </p>
          <h1 className="mt-2 font-display text-4xl font-black leading-tight text-heading sm:text-5xl">
            {category.name}
          </h1>
          <p className="mt-4 text-lg font-semibold text-body">
            {categoryEntries.length} resource
            {categoryEntries.length === 1 ? "" : "s"} ready to use
          </p>

          {categoryTags.length > 0 ? (
            <div className="mt-6">
              <TagPills tags={categoryTags} />
            </div>
          ) : null}
        </header>

        {categoryEntries.length === 0 ? (
          <div className="rounded-2xl border border-card-border bg-card-surface p-10 text-center text-body">
            No entries in this category yet.
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {categoryEntries.map((entry) => (
              <EntryCard key={entry.slug} entry={entry} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

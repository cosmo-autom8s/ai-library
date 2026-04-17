"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";

import { CATEGORIES } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function TopNav() {
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-sidebar/95 backdrop-blur-md">
      <div className="flex h-16 items-center gap-4 px-4 lg:pl-5 lg:pr-6">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-3 font-display text-xl font-black text-heading"
          aria-label="AI Knowledge Library home"
        >
          <span className="grid size-10 place-items-center rounded-lg border border-card-border bg-card-surface text-lg">
            A8
          </span>
          <span className="hidden sm:inline">AI Library</span>
        </Link>

        <nav
          className="mx-auto flex min-w-0 flex-1 items-center justify-center gap-2 overflow-x-auto px-2"
          aria-label="Business categories"
        >
          {CATEGORIES.map((category) => {
            const href = `/category/${category.slug}`;
            const isActive = pathname === href;

            return (
              <Link
                key={category.slug}
                href={href}
                className={cn(
                  "shrink-0 rounded-full border px-4 py-1.5 text-sm font-bold transition-colors",
                  isActive
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-card-border bg-card-surface text-body hover:border-border hover:text-heading",
                )}
              >
                {category.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          className="hidden shrink-0 items-center gap-2 rounded-full border border-card-border bg-card-surface px-4 py-1.5 text-sm font-bold text-heading transition-colors hover:border-border sm:flex"
          aria-label="Search"
        >
          <Search className="size-4 text-body" />
          <span>Search</span>
          <kbd className="rounded-full bg-background/80 px-2 py-0.5 text-xs text-body">
            Cmd K
          </kbd>
        </button>
      </div>
    </header>
  );
}

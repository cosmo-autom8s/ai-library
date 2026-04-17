"use client";

import { useEffect, useRef } from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  query: string;
  onChange: (query: string) => void;
}

export function SearchBar({ query, onChange }: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div id="search" className="mx-auto w-full max-w-3xl px-4">
      <label className="sr-only" htmlFor="library-search">
        Search library
      </label>
      <div className="relative flex items-center gap-3">
        <input
          id="library-search"
          ref={inputRef}
          type="search"
          value={query}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Search..."
          className="h-16 w-full rounded-2xl border border-card-border bg-[#171922] px-6 pr-28 font-body text-xl font-bold text-heading outline-none transition-colors placeholder:text-helper focus:border-border"
        />
        <kbd className="pointer-events-none absolute right-20 rounded-full bg-card-surface px-3 py-1 text-sm font-black text-body">
          Cmd K
        </kbd>
        <button
          type="button"
          onClick={() => inputRef.current?.focus()}
          className="absolute right-2 grid size-12 place-items-center rounded-xl border border-card-border bg-card-surface text-heading transition-colors hover:border-border"
          aria-label="Focus search"
        >
          <Search className="size-6" />
        </button>
      </div>
    </div>
  );
}

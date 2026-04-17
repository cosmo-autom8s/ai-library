"use client";

import type { ComponentType } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Database,
  Home,
  Info,
  Menu,
  Search,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/#search", icon: Search, label: "Search" },
  { href: "/about", icon: Info, label: "About" },
];

const SECONDARY_ITEMS = [
  { href: "/", icon: Database, label: "Entries" },
  { href: "/", icon: BookOpen, label: "Resources" },
  { href: "/", icon: Sparkles, label: "Featured" },
];

function NavLink({
  href,
  icon: Icon,
  label,
  onClick,
}: {
  href: string;
  icon: ComponentType<{ className?: string }>;
  label: string;
  onClick?: () => void;
}) {
  const pathname = usePathname();
  const isActive = pathname === href || (href === "/#search" && false);

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "group/nav flex h-11 items-center gap-3 rounded-lg border border-transparent px-3 text-sm font-bold transition-colors",
        isActive
          ? "bg-card-surface text-heading"
          : "text-body hover:border-card-border hover:bg-card-surface hover:text-heading",
      )}
    >
      <Icon className="size-5 shrink-0" />
      <span className="whitespace-nowrap">{label}</span>
    </Link>
  );
}

export function Sidebar() {
  const pathname = usePathname();

  return (
    <>
      <div className="fixed left-3 top-3 z-[60] lg:hidden">
        <Sheet>
          <SheetTrigger render={<Button variant="outline" size="icon-lg" />}>
            <Menu className="size-5" />
            <span className="sr-only">Open menu</span>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-72 border-sidebar-border bg-sidebar p-0 text-sidebar-foreground"
          >
            <SheetHeader className="border-b border-sidebar-border p-4">
              <SheetTitle className="font-display text-xl font-black text-heading">
                AI Library
              </SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-2 p-4" aria-label="Mobile">
              {[...NAV_ITEMS, ...SECONDARY_ITEMS].map((item) => (
                <NavLink key={item.label} {...item} />
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>

      <aside className="group fixed bottom-0 left-0 top-16 z-40 hidden w-16 overflow-hidden border-r border-sidebar-border bg-sidebar transition-[width] duration-200 hover:w-56 lg:block">
        <nav className="flex h-full flex-col items-center gap-3 py-4 group-hover:items-stretch group-hover:px-3">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.label}
                href={item.href}
                title={item.label}
                className={cn(
                  "flex size-12 items-center justify-center rounded-lg border text-body transition-colors group-hover:h-11 group-hover:w-full group-hover:justify-start group-hover:gap-3 group-hover:px-3",
                  isActive
                    ? "border-card-border bg-card-surface text-heading"
                    : "border-card-border/70 bg-card-surface/60 hover:border-border hover:text-heading",
                )}
              >
                <Icon className="size-5 shrink-0" />
                <span className="hidden whitespace-nowrap text-sm font-bold group-hover:inline">
                  {item.label}
                </span>
              </Link>
            );
          })}

          <div className="my-2 h-px w-10 bg-sidebar-border group-hover:w-full" />

          {SECONDARY_ITEMS.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.label}
                href={item.href}
                title={item.label}
                className="flex size-12 items-center justify-center rounded-lg border border-card-border/70 bg-card-surface/60 text-body transition-colors hover:border-border hover:text-heading group-hover:h-11 group-hover:w-full group-hover:justify-start group-hover:gap-3 group-hover:px-3"
              >
                <Icon className="size-5 shrink-0" />
                <span className="hidden whitespace-nowrap text-sm font-bold group-hover:inline">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}

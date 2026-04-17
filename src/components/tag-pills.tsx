import Link from "next/link";

interface TagPillsProps {
  tags: string[];
}

export function TagPills({ tags }: TagPillsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Link
          key={tag}
          href={`/tag/${tag}`}
          className="rounded-full border border-card-border bg-card-surface px-3 py-1 text-xs font-bold text-body transition-colors hover:border-border hover:text-heading"
        >
          {tag}
        </Link>
      ))}
    </div>
  );
}

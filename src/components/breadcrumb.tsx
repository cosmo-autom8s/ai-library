import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="mb-8 text-sm font-bold text-helper">
      {items.map((item, index) => (
        <span key={`${item.label}-${index}`}>
          {index > 0 ? <span className="mx-2">/</span> : null}
          {item.href ? (
            <Link href={item.href} className="hover:text-heading">
              {item.label}
            </Link>
          ) : (
            <span className="text-body">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

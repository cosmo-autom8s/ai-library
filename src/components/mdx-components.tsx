import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  h2: (props) => (
    <h2
      className="mb-4 mt-9 font-display text-3xl font-black text-heading"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="mb-3 mt-7 font-display text-2xl font-black text-heading"
      {...props}
    />
  ),
  p: (props) => (
    <p className="mb-5 text-lg font-semibold leading-relaxed text-body" {...props} />
  ),
  ul: (props) => (
    <ul className="mb-5 list-disc space-y-2 pl-6 text-lg font-semibold leading-relaxed text-body" {...props} />
  ),
  ol: (props) => (
    <ol className="mb-5 list-decimal space-y-2 pl-6 text-lg font-semibold leading-relaxed text-body" {...props} />
  ),
  li: (props) => <li className="pl-1" {...props} />,
  code: (props) => (
    <code
      className="rounded-md bg-background px-2 py-1 font-mono text-sm font-bold text-heading"
      {...props}
    />
  ),
  pre: (props) => (
    <pre
      className="mb-6 overflow-x-auto rounded-2xl border border-card-border bg-[#171922] p-5 text-sm text-heading"
      {...props}
    />
  ),
  a: (props) => (
    <a className="font-bold text-action hover:text-action-hover" {...props} />
  ),
  blockquote: (props) => (
    <blockquote
      className="mb-6 rounded-2xl border border-card-border bg-card-surface p-5 text-lg font-semibold italic text-body"
      {...props}
    />
  ),
  strong: (props) => <strong className="font-black text-heading" {...props} />,
};

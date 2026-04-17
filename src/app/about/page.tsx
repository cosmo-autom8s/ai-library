import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About - AI Knowledge Library",
  description:
    "What the AI Knowledge Library is, who built it, and how to use it.",
};

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-4xl px-4 py-10">
      <header className="rounded-3xl border border-card-border bg-card-surface p-6 shadow-xl shadow-black/15 sm:p-8">
        <p className="text-sm font-black uppercase tracking-normal text-helper">
          Autom8Lab
        </p>
        <h1 className="mt-2 font-display text-4xl font-black leading-tight text-heading sm:text-5xl">
          About this library
        </h1>
        <p className="mt-4 max-w-3xl text-lg font-semibold leading-relaxed text-body">
          A public collection of AI prompts, agents, workflows, tools, and
          curated resources, organized by business problem and tagged by tool.
        </p>
      </header>

      <div className="mt-8 rounded-3xl border border-card-border bg-card-surface p-6 text-lg font-semibold leading-relaxed text-body shadow-xl shadow-black/15 sm:p-8">
        <p>
          The AI Knowledge Library is built by{" "}
          <a
            href="https://autom8lab.com"
            className="font-black text-action hover:text-action-hover"
          >
            Autom8Lab
          </a>{" "}
          as part of the 75 Hard AI Challenge. Every entry is a commit. The git
          history is the progress story.
        </p>

        <h2 className="mt-8 font-display text-3xl font-black text-heading">
          How to use it
        </h2>

        <ul className="mt-4 list-disc space-y-3 pl-6">
          <li>
            <strong className="text-heading">Browse by category</strong> to
            start from the business problem you are trying to solve.
          </li>
          <li>
            <strong className="text-heading">Filter by type</strong> to narrow
            the library to prompts, agents, workflows, tools, resources, or
            posts.
          </li>
          <li>
            <strong className="text-heading">Search</strong> when you know the
            tool, workflow, or concept you want.
          </li>
          <li>
            <strong className="text-heading">Browse by tag</strong> to see
            everything using a specific tool or technique.
          </li>
        </ul>

        <h2 className="mt-8 font-display text-3xl font-black text-heading">
          What kind of resources?
        </h2>

        <ul className="mt-4 list-disc space-y-3 pl-6">
          <li>
            <strong className="text-heading">Prompts</strong> for reusable AI
            work patterns.
          </li>
          <li>
            <strong className="text-heading">Agents</strong> for system prompts
            and AI worker configurations.
          </li>
          <li>
            <strong className="text-heading">Workflows</strong> for multi-step
            automations in tools like n8n and Make.
          </li>
          <li>
            <strong className="text-heading">Tools</strong> for scripts,
            utilities, and software worth keeping close.
          </li>
          <li>
            <strong className="text-heading">Resources</strong> for useful
            external guides, references, and examples.
          </li>
        </ul>
      </div>
    </article>
  );
}

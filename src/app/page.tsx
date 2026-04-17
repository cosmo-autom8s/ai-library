import { entries } from "#site/content";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-8 text-center">
      <p className="font-body text-sm font-semibold tracking-normal text-helper">
        autom8lab.com
      </p>
      <h1 className="font-display text-5xl font-black tracking-normal text-heading">
        AI Knowledge Library
      </h1>
      <p className="font-body text-lg text-body">
        Found {entries.length} entries
      </p>
      <ul className="space-y-2">
        {entries.map((entry) => (
          <li key={entry.slug} className="font-body text-heading">
            {entry.title} -{" "}
            <span className="text-action">{entry.type}</span>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-8 text-center">
      <p className="font-body text-sm font-semibold tracking-normal text-helper">
        autom8lab.com
      </p>
      <h1 className="font-display text-5xl font-black tracking-normal text-heading">
        AI Knowledge Library
      </h1>
      <p className="max-w-xl font-body text-lg text-body">
        Prompts, agents, workflows, tools, and resources.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <span className="rounded-full bg-action px-4 py-1 text-sm font-bold text-white">
          Featured
        </span>
        <span className="rounded-full bg-featured px-4 py-1 text-sm font-bold text-white">
          Highlight
        </span>
      </div>
    </main>
  );
}

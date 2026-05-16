import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold gradient-text mb-4">Nexus Ecosystem</h1>
        <p className="text-muted font-mono text-sm mb-8 uppercase tracking-wider">AI Orchestration Engine</p>
        <Link
          href="/login"
          className="inline-flex items-center gap-2 rounded-md bg-primary text-primary-on px-8 py-3 font-semibold hover:bg-primary-hover transition-all"
        >
          Initialize System
        </Link>
      </div>
    </div>
  );
}

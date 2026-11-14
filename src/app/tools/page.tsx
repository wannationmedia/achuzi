import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { ScreenHeader } from "@/components/ScreenHeader";
import { pillars } from "@/lib/pillars";

export const metadata = { title: "Tools — ACHUZI#1" };

const TOOLS = [
  { label: "Document summarizer", prompt: "Help me summarize a document" },
  { label: "Budget planner", prompt: "Help me plan a monthly budget" },
  { label: "Rights checklist", prompt: "Give me a plain-language rights checklist" },
  { label: "CV builder", prompt: "Help me build my CV" },
  { label: "Language translator", prompt: "Translate something for me" },
  { label: "Daily planner", prompt: "Help me plan my day" },
];

export default function ToolsPage() {
  return (
    <AppShell>
      <ScreenHeader
        title="Tools"
        subtitle="Quick actions, ready whenever you need them."
      />
      <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5">
        <div className="flex flex-col gap-2">
          {TOOLS.map((t) => (
            <Link
              key={t.label}
              href={`/chat?q=${encodeURIComponent(t.prompt)}`}
              className="card-glow rounded-xl border border-panel-border px-4 py-3 text-sm text-ink transition-colors hover:border-gold-dim"
            >
              {t.label}
            </Link>
          ))}
        </div>

        <p className="mb-3 mt-7 text-[11px] uppercase tracking-[0.2em] text-ink-faint">
          Or browse by pillar
        </p>
        <div className="grid grid-cols-3 gap-3">
          {pillars.map((p) => (
            <Link
              key={p.id}
              href={p.href}
              className="card-glow flex flex-col items-center gap-2 rounded-2xl border border-panel-border p-3 text-center"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-void-3 text-gold-bright ring-1 ring-gold-dim/50">
                <p.icon size={18} strokeWidth={1.8} />
              </span>
              <span className="text-[11px] font-semibold text-ink">
                {p.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </AppShell>
  );
}

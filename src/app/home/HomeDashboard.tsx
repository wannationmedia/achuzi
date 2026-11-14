"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Mic, Search, ArrowRight } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { AnubisMark } from "@/components/AnubisMark";
import { pillars } from "@/lib/pillars";

type Tab = "assist" | "create" | "explore";

const GREETING_NAME = "Tshifhiwa";

const CREATE_SHORTCUTS = [
  { label: "Write a post", prompt: "Help me write a social media post" },
  { label: "Plan my budget", prompt: "Help me plan my monthly budget" },
  { label: "Design a logo brief", prompt: "Help me write a brief for a logo" },
  { label: "Draft a CV", prompt: "Help me draft my CV" },
];

const EXPLORE_SHORTCUTS = [
  { label: "Tshivenda phrase of the day", prompt: "Teach me a Tshivenda phrase" },
  { label: "What's trending in Limpopo", prompt: "What's trending in Limpopo this week" },
  { label: "Local business ideas", prompt: "Give me local business ideas for Limpopo" },
  { label: "Study something new", prompt: "Help me learn something new today" },
];

function greetingForNow() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export function HomeDashboard() {
  const [tab, setTab] = useState<Tab>("assist");
  const [query, setQuery] = useState("");
  const [greeting, setGreeting] = useState("Welcome");

  useEffect(() => {
    setGreeting(greetingForNow());
  }, []);

  return (
    <AppShell>
      <header className="flex items-center justify-between px-5 pt-5">
        <div>
          <p className="text-lg font-semibold text-ink">
            {greeting}, {GREETING_NAME} <span aria-hidden>👋</span>
          </p>
          <p className="text-xs text-ink-dim">Your tomorrow is within reach.</p>
        </div>
        <Link href="/profile" aria-label="Open profile">
          <AnubisMark size={40} />
        </Link>
      </header>

      <form
        action="/chat"
        className="mx-5 mt-5 flex items-center gap-2 rounded-2xl border border-panel-border bg-panel px-4 py-3 card-glow"
      >
        <Search size={16} className="text-ink-faint" />
        <input
          name="q"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask ACHUZI anything..."
          className="flex-1 bg-transparent text-sm text-ink placeholder:text-ink-faint outline-none"
        />
        <button
          type="submit"
          aria-label="Ask with voice"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-crimson to-crimson-bright text-ink"
        >
          <Mic size={14} />
        </button>
      </form>

      <div className="mx-5 mt-5 flex gap-1 rounded-full border border-panel-border bg-void-2 p-1 text-xs">
        {(
          [
            ["assist", "Assist"],
            ["create", "Create"],
            ["explore", "Explore"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={
              "flex-1 rounded-full py-2 font-medium transition-colors " +
              (tab === id
                ? "bg-gradient-to-r from-crimson to-crimson-bright text-ink"
                : "text-ink-dim hover:text-ink")
            }
          >
            {label}
          </button>
        ))}
      </div>

      <section className="px-5 pb-6 pt-5">
        {tab === "assist" && (
          <>
            <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-ink-faint">
              Nine pillars. One companion.
            </p>
            <div className="grid grid-cols-3 gap-3">
              {pillars.map((p) => (
                <Link
                  key={p.id}
                  href={p.href}
                  className="card-glow group flex flex-col items-center gap-2 rounded-2xl border border-panel-border p-3 text-center transition-transform active:scale-95"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-void-3 text-gold-bright ring-1 ring-gold-dim/50 group-hover:text-crimson-bright">
                    <p.icon size={20} strokeWidth={1.8} />
                  </span>
                  <span className="text-[12px] font-semibold text-ink">
                    {p.label}
                  </span>
                  <span className="text-[10px] leading-tight text-ink-faint">
                    {p.tagline}
                  </span>
                </Link>
              ))}
            </div>
          </>
        )}

        {tab === "create" && (
          <ShortcutList
            heading="Start creating"
            items={CREATE_SHORTCUTS}
          />
        )}

        {tab === "explore" && (
          <ShortcutList heading="Discover" items={EXPLORE_SHORTCUTS} />
        )}
      </section>
    </AppShell>
  );
}

function ShortcutList({
  heading,
  items,
}: {
  heading: string;
  items: { label: string; prompt: string }[];
}) {
  return (
    <div>
      <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-ink-faint">
        {heading}
      </p>
      <div className="flex flex-col gap-2">
        {items.map((item) => (
          <Link
            key={item.label}
            href={`/chat?q=${encodeURIComponent(item.prompt)}`}
            className="card-glow flex items-center justify-between rounded-xl border border-panel-border px-4 py-3 text-sm text-ink transition-colors hover:border-gold-dim"
          >
            {item.label}
            <ArrowRight size={14} className="text-ink-faint" />
          </Link>
        ))}
      </div>
    </div>
  );
}

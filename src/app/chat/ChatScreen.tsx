"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ChevronLeft, Camera, Mic, Keyboard, Send, Shield } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { AnubisMark } from "@/components/AnubisMark";
import { openingLine, nextReply, resolveTopic } from "@/lib/companion-replies";

type Message = {
  id: string;
  role: "user" | "assistant";
  text: string;
};

const SUGGESTIONS = [
  "Explain my rights",
  "Summarize a document",
  "Plan my day",
  "Help me learn something",
  "Find opportunities",
  "Stay safe with me",
];

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

export function ChatScreen() {
  const params = useSearchParams();
  const topic = resolveTopic(params.get("topic"));
  const initialQuery = params.get("q");

  const [messages, setMessages] = useState<Message[]>(() => [
    { id: uid(), role: "assistant", text: openingLine(topic) },
  ]);
  const [draft, setDraft] = useState("");
  const [typing, setTyping] = useState(false);
  const turnRef = useRef(0);
  const hasSentInitial = useRef(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;
    setMessages((prev) => [...prev, { id: uid(), role: "user", text: trimmed }]);
    setDraft("");
    setTyping(true);
    const delay = 600 + Math.random() * 500;
    window.setTimeout(() => {
      const reply = nextReply(topic, turnRef.current);
      turnRef.current += 1;
      setMessages((prev) => [...prev, { id: uid(), role: "assistant", text: reply }]);
      setTyping(false);
    }, delay);
  }

  useEffect(() => {
    if (initialQuery && !hasSentInitial.current) {
      hasSentInitial.current = true;
      send(initialQuery);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialQuery]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  return (
    <AppShell>
      <header className="flex shrink-0 items-center gap-3 border-b border-panel-border px-4 py-3">
        <Link href="/home" aria-label="Back" className="text-ink-dim">
          <ChevronLeft size={20} />
        </Link>
        <AnubisMark size={34} />
        <div className="flex-1">
          <p className="text-sm font-semibold text-ink">ACHUZI#1</p>
          <p className="flex items-center gap-1 text-[11px] text-ink-faint">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Online &middot; Always With You
          </p>
        </div>
        <Link
          href="/protection"
          aria-label="Protection Mode"
          className="flex items-center gap-1 rounded-full border border-crimson-dim px-2.5 py-1 text-[11px] text-crimson-bright"
        >
          <Shield size={12} />
          Protect
        </Link>
      </header>

      <div ref={scrollRef} className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-4 py-4">
        {messages.map((m) => (
          <ChatBubble key={m.id} role={m.role} text={m.text} />
        ))}
        {typing && <TypingBubble />}

        {messages.length <= 1 && (
          <div className="mt-2 flex flex-col gap-2">
            <p className="text-[11px] uppercase tracking-[0.2em] text-ink-faint">
              How can I help you today?
            </p>
            <div className="grid grid-cols-2 gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="card-glow rounded-xl border border-panel-border px-3 py-2.5 text-left text-xs text-ink-dim transition-colors hover:border-gold-dim hover:text-ink"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(draft);
        }}
        className="flex shrink-0 items-center gap-2 border-t border-panel-border bg-void-2/80 px-3 py-3"
        style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 0.75rem)" }}
      >
        <IconButton label="Attach photo or document">
          <Camera size={16} />
        </IconButton>
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Ask ACHUZI anything..."
          className="flex-1 rounded-full border border-panel-border bg-void px-4 py-2.5 text-sm text-ink placeholder:text-ink-faint outline-none focus:border-gold-dim"
        />
        <IconButton label="Tap to speak (voice input coming soon)">
          <Mic size={16} />
        </IconButton>
        {draft.trim() ? (
          <button
            type="submit"
            aria-label="Send"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-crimson to-crimson-bright text-ink"
          >
            <Send size={16} />
          </button>
        ) : (
          <IconButton label="Switch to keyboard">
            <Keyboard size={16} />
          </IconButton>
        )}
      </form>
    </AppShell>
  );
}

function IconButton({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-panel-border text-ink-dim transition-colors hover:border-gold-dim hover:text-gold-bright"
    >
      {children}
    </button>
  );
}

function ChatBubble({ role, text }: { role: Message["role"]; text: string }) {
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={
          "max-w-[82%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed " +
          (isUser
            ? "bg-gradient-to-br from-crimson to-crimson-bright text-ink rounded-br-sm"
            : "card-glow border border-panel-border text-ink-dim rounded-bl-sm")
        }
      >
        {text}
      </div>
    </div>
  );
}

function TypingBubble() {
  return (
    <div className="flex justify-start">
      <div className="card-glow flex items-center gap-1 rounded-2xl rounded-bl-sm border border-panel-border px-4 py-3">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold-bright"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  );
}

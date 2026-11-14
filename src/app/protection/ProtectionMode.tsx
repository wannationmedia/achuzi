"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  Video,
  Mic,
  MapPin,
  FileCheck2,
  Scale,
  PhoneCall,
  ShieldAlert,
  Radio,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";

type TileId = "video" | "audio" | "location" | "evidence" | "legal" | "emergency";

const TILES: { id: TileId; label: string; icon: typeof Video }[] = [
  { id: "video", label: "Video", icon: Video },
  { id: "audio", label: "Audio", icon: Mic },
  { id: "location", label: "Location Tracking", icon: MapPin },
  { id: "evidence", label: "Evidence Secured", icon: FileCheck2 },
  { id: "legal", label: "Legal Guidance", icon: Scale },
  { id: "emergency", label: "Emergency Contacts", icon: PhoneCall },
];

const GUIDANCE_TIPS = [
  "You have the right to remain silent. You can request a lawyer. I'm documenting this interaction.",
  "Stay calm and keep your hands visible. Ask for a badge or case number if it's an official.",
  "You do not have to consent to a search of your phone or belongings without a warrant.",
  "If you're asked to sign something you don't understand, you can ask for time to read it first.",
];

function formatTime(totalSeconds: number) {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = Math.floor(totalSeconds % 60);
  return [h, m, s].map((n) => String(n).padStart(2, "0")).join(":");
}

export function ProtectionMode() {
  const [active, setActive] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [tips, setTips] = useState<string[]>([GUIDANCE_TIPS[0]]);
  const [enabled, setEnabled] = useState<Record<TileId, boolean>>({
    video: true,
    audio: true,
    location: true,
    evidence: true,
    legal: true,
    emergency: true,
  });
  const timelineRef = useRef<HTMLDivElement>(null);
  const tipIndex = useRef(0);

  useEffect(() => {
    if (!active) return;
    const tick = window.setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => window.clearInterval(tick);
  }, [active]);

  useEffect(() => {
    if (!active) return;
    const rotate = window.setInterval(() => {
      tipIndex.current = (tipIndex.current + 1) % GUIDANCE_TIPS.length;
      const tip = GUIDANCE_TIPS[tipIndex.current];
      setTips((prev) => [...prev, tip]);
    }, 15000);
    return () => window.clearInterval(rotate);
  }, [active]);

  function startSession() {
    setActive(true);
    setElapsed(0);
    setTips([GUIDANCE_TIPS[0]]);
    tipIndex.current = 0;
  }

  function endSession() {
    setActive(false);
  }

  function toggleTile(id: TileId) {
    setEnabled((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <AppShell>
      <header className="flex shrink-0 items-center gap-3 border-b border-panel-border px-4 py-3">
        <Link href="/home" aria-label="Back" className="text-ink-dim">
          <ChevronLeft size={20} />
        </Link>
        <p className="flex-1 text-sm font-semibold text-ink">Protection Mode</p>
        {active && (
          <span className="flex items-center gap-1.5 text-[11px] font-semibold text-crimson-bright">
            <span className="h-2 w-2 animate-rec-blink rounded-full bg-crimson-bright" />
            REC
          </span>
        )}
      </header>

      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-5 py-5">
        {!active ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-5 text-center">
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-void-3 ring-glow">
              <ShieldAlert size={34} className="text-crimson-bright" />
            </span>
            <div>
              <h1 className="font-display text-lg font-bold text-ink">
                Your safety companion
              </h1>
              <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-ink-dim">
                Start a session to get live rights guidance, a timestamped
                event log, and quick access to emergency contacts — right
                from this screen.
              </p>
            </div>
            <button
              onClick={startSession}
              className="mt-2 w-full max-w-xs rounded-xl bg-gradient-to-r from-crimson to-crimson-bright px-5 py-3.5 text-sm font-semibold text-ink shadow-[0_8px_24px_-6px_rgba(232,49,58,0.55)]"
            >
              Start Protection Mode
            </button>
            <p className="max-w-xs text-[11px] text-ink-faint">
              You control camera, microphone and location access from your
              device at any time.
            </p>
          </div>
        ) : (
          <>
            <div className="card-glow rounded-2xl border border-panel-border p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="flex items-center gap-2 text-sm font-semibold text-ink">
                    <span className="h-2 w-2 animate-rec-blink rounded-full bg-crimson-bright" />
                    Recording in progress
                  </p>
                  <p className="font-display mt-1 text-2xl tabular-nums text-ink">
                    {formatTime(elapsed)}
                  </p>
                </div>
                <Radio size={28} className="text-gold-dim" />
              </div>
              <p className="mt-3 text-xs text-ink-dim">
                Your safety matters. I&apos;m with you.
              </p>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2.5">
              {TILES.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => toggleTile(id)}
                  className={
                    "card-glow flex flex-col items-center gap-1.5 rounded-xl border px-2 py-3 text-center transition-colors " +
                    (enabled[id]
                      ? "border-gold-dim/60 text-ink"
                      : "border-panel-border text-ink-faint")
                  }
                >
                  <Icon
                    size={18}
                    className={enabled[id] ? "text-crimson-bright" : "text-ink-faint"}
                  />
                  <span className="text-[10px] font-medium leading-tight">
                    {label}
                  </span>
                  <span
                    className={
                      "text-[9px] uppercase tracking-wide " +
                      (enabled[id] ? "text-emerald-400" : "text-ink-faint")
                    }
                  >
                    {enabled[id] ? "Active" : "Off"}
                  </span>
                </button>
              ))}
            </div>

            <button
              onClick={endSession}
              className="mt-4 w-full rounded-xl border border-crimson bg-crimson/10 px-5 py-3 text-sm font-semibold text-crimson-bright"
            >
              End Session
            </button>

            <div className="mt-5 card-glow rounded-2xl border border-panel-border p-4">
              <p className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Live Guidance
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink-dim">
                {tips[tips.length - 1]}
              </p>
              <button
                onClick={() =>
                  timelineRef.current?.scrollIntoView({ behavior: "smooth" })
                }
                className="mt-3 text-xs font-medium text-gold-bright"
              >
                View Timeline →
              </button>
            </div>

            <div ref={timelineRef} className="mt-5 pb-4">
              <p className="mb-2 text-[11px] uppercase tracking-[0.2em] text-ink-faint">
                Session timeline
              </p>
              <ol className="flex flex-col gap-2 border-l border-panel-border pl-4">
                <li className="text-xs text-ink-dim">
                  <span className="text-ink-faint">{formatTime(0)}</span> — Protection Mode started
                </li>
                {tips.slice(1).map((tip, i) => (
                  <li key={i} className="text-xs text-ink-dim">
                    <span className="text-ink-faint">
                      {formatTime((i + 1) * 15)}
                    </span>{" "}
                    — Guidance: {tip}
                  </li>
                ))}
              </ol>
            </div>
          </>
        )}
      </div>
    </AppShell>
  );
}

"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import clsx from "clsx";

export type AnubisMood = "idle" | "listening" | "thinking" | "speaking";

/**
 * A living Anubis: breathes, glows, blinks its eye, pulses the headphone
 * ring, spins an energy halo and leans toward the finger/cursor.
 * Moods change the tempo: thinking = fast spin, speaking = rhythmic glow.
 * All motion is CSS (GPU) + one rAF-throttled pointer listener, and is
 * disabled under prefers-reduced-motion.
 */
export function AnubisMark({
  size = 96,
  pulse = false,
  mood = "idle",
  className,
}: {
  size?: number;
  pulse?: boolean;
  mood?: AnubisMood;
  className?: string;
}) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let tx = 0;
    let ty = 0;
    const onMove = (ev: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const dx = (ev.clientX - (r.left + r.width / 2)) / Math.max(window.innerWidth, 1);
      const dy = (ev.clientY - (r.top + r.height / 2)) / Math.max(window.innerHeight, 1);
      tx = Math.max(-1, Math.min(1, dx * 2.4));
      ty = Math.max(-1, Math.min(1, dy * 2.4));
      if (!raf) {
        raf = requestAnimationFrame(() => {
          raf = 0;
          el.style.setProperty("--lx", tx.toFixed(3));
          el.style.setProperty("--ly", ty.toFixed(3));
        });
      }
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={root}
      className={clsx("anubis relative shrink-0", `anubis-${mood}`, className)}
      style={{ width: size, height: size }}
    >
      {/* spinning energy halo */}
      <span className="anubis-halo" aria-hidden />
      <span className="anubis-halo anubis-halo-2" aria-hidden />

      <div
        className={clsx(
          "anubis-body relative h-full w-full overflow-hidden rounded-full ring-glow",
          pulse && "animate-pulse-ring"
        )}
      >
        <div className="anubis-look absolute inset-0">
          <Image
            src="/icons/mark.png"
            alt="ACHUZI#1 Anubis mark"
            fill
            sizes={`${size}px`}
            className="object-cover"
            priority
          />
          {/* eye glow + blink, headphone-ring pulse */}
          <span className="anubis-eye" aria-hidden />
          <span className="anubis-phones" aria-hidden />
        </div>
        <div className="absolute inset-0 rounded-full shadow-[inset_0_0_14px_rgba(0,0,0,0.5)]" />
      </div>
    </div>
  );
}

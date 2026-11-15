"use client";

import { useEffect, useRef } from "react";

/**
 * Living background: slow crimson/gold aurora, a drifting lattice and rising
 * embers that gently lean toward the finger/cursor. Pure canvas, no deps.
 * Pauses when the tab is hidden; renders a single still frame when the user
 * prefers reduced motion. Particle count scales with screen area (cheap on
 * low-end phones).
 */
type Ember = {
  x: number;
  y: number;
  r: number;
  vy: number;
  vx: number;
  phase: number;
  gold: boolean;
};

export function LivingBackground() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let raf = 0;
    let t = 0;
    let embers: Ember[] = [];
    const pointer = { x: 0.5, y: 0.35, tx: 0.5, ty: 0.35 };

    const spawn = (anywhere: boolean): Ember => ({
      x: Math.random() * w,
      y: anywhere ? Math.random() * h : h + 10,
      r: 0.6 + Math.random() * 1.9,
      vy: 0.12 + Math.random() * 0.45,
      vx: (Math.random() - 0.5) * 0.18,
      phase: Math.random() * Math.PI * 2,
      gold: Math.random() < 0.68,
    });

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.max(26, Math.min(72, Math.round((w * h) / 16000)));
      embers = Array.from({ length: count }, () => spawn(true));
    };

    const aurora = (
      cx: number,
      cy: number,
      radius: number,
      rgb: string,
      alpha: number
    ) => {
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
      g.addColorStop(0, `rgba(${rgb},${alpha})`);
      g.addColorStop(1, `rgba(${rgb},0)`);
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
    };

    const frame = () => {
      t += 0.006;
      pointer.x += (pointer.tx - pointer.x) * 0.04;
      pointer.y += (pointer.ty - pointer.y) * 0.04;
      const px = (pointer.x - 0.5) * 40;
      const py = (pointer.y - 0.5) * 40;

      ctx.globalCompositeOperation = "source-over";
      ctx.clearRect(0, 0, w, h);

      // aurora: three slow-orbiting colour pools
      const m = Math.max(w, h);
      aurora(w * (0.5 + Math.sin(t) * 0.18) + px, h * 0.08 + py, m * 0.62, "232,49,58", 0.2);
      aurora(w * (0.88 + Math.cos(t * 0.8) * 0.1) + px * 0.6, h * (0.28 + Math.sin(t * 0.7) * 0.06), m * 0.45, "217,173,85", 0.12);
      aurora(w * (0.12 + Math.sin(t * 0.6) * 0.1), h * (0.85 + Math.cos(t * 0.9) * 0.05), m * 0.5, "140,20,40", 0.14);

      // lattice: faint diagonal lines that slide with parallax
      ctx.strokeStyle = "rgba(217,173,85,0.045)";
      ctx.lineWidth = 1;
      const step = 34;
      const off = ((t * 140) % step) + px * 0.4;
      ctx.beginPath();
      for (let x = -h + off; x < w + h; x += step) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x + h, h);
      }
      ctx.stroke();

      // slow light sweep
      const sx = ((t * 90) % (w + 400)) - 200;
      const sg = ctx.createLinearGradient(sx - 120, 0, sx + 120, h);
      sg.addColorStop(0, "rgba(255,220,150,0)");
      sg.addColorStop(0.5, "rgba(255,220,150,0.035)");
      sg.addColorStop(1, "rgba(255,220,150,0)");
      ctx.fillStyle = sg;
      ctx.fillRect(0, 0, w, h);

      // embers
      ctx.globalCompositeOperation = "lighter";
      for (const e of embers) {
        e.y -= e.vy;
        e.x += e.vx + Math.sin(t * 3 + e.phase) * 0.12 + (pointer.x - 0.5) * 0.08;
        if (e.y < -10) Object.assign(e, spawn(false));
        const flick = 0.45 + 0.55 * Math.sin(t * 5 + e.phase);
        const fade = Math.min(1, e.y / (h * 0.25));
        const a = Math.max(0, flick * fade) * 0.85;
        const rgb = e.gold ? "243,216,136" : "255,90,95";
        const g = ctx.createRadialGradient(e.x, e.y, 0, e.x, e.y, e.r * 5);
        g.addColorStop(0, `rgba(${rgb},${a})`);
        g.addColorStop(1, `rgba(${rgb},0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.r * 5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";

      if (!reduce && !document.hidden) raf = requestAnimationFrame(frame);
    };

    const start = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(frame);
    };
    const onMove = (ev: PointerEvent) => {
      pointer.tx = ev.clientX / window.innerWidth;
      pointer.ty = ev.clientY / window.innerHeight;
    };
    const onVis = () => {
      if (!document.hidden && !reduce) start();
    };

    resize();
    frame(); // one frame always (covers reduced-motion)
    if (!reduce) start();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("visibilitychange", onVis);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
    />
  );
}

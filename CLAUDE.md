# ACHUZI#1 — working rules (read first, keep sessions cheap)

Owner: Tshifhiwa, Founder/CEO, WANNATION HOLDINGS (PTY) LTD. Not a coder: give plain,
click-by-click steps. Act as COO / CTO / security lead / marketing / CFO: decide, do, report.

## Token discipline (professional, not sloppy)
1. START: read `HANDOFF.md` only. Do not re-explore the repo or re-read files you won't edit.
2. ONE task per session. When done: update `HANDOFF.md`, commit, push, tell owner to `/clear`.
3. Rebuild + restart the server BEFORE debugging visual bugs (stale `.next` caused a
   multi-round false bug on 2026-11-14). `rm -rf .next && npm run build`, restart `next start`.
4. Verify cheaply: measure with Playwright `evaluate()` first; look at at most 1-2 screenshots.
5. No long tool dumps: pipe builds through `tail -20`, greps with `-l`/`head`.
6. Batch independent tool calls in one turn. No narration between calls.
7. At ~150k context or after a milestone: write HANDOFF.md and recommend `/clear`.
8. Skip optional plugins/skills/connectors not needed for the task (see docs/LEAN-SETUP.md).

## Stack
Next.js 16 (read `AGENTS.md` + `node_modules/next/dist/docs/` before unfamiliar APIs),
React 19, Tailwind 4 tokens in `src/app/globals.css`, self-hosted @fontsource fonts
(Google Fonts blocked in sandbox), lucide-react. PWA via `src/app/manifest.ts`.

## Brand
Void black, gold `#d9ad55`, crimson `#e8313a`, Orbitron display + Manrope body.
Anubis companion mark: `src/components/AnubisMark.tsx` (moods: idle/listening/thinking/speaking).

## Security (CISO hat)
Never commit secrets (`.env*` ignored). Protection Mode handles sensitive evidence:
POPIA applies; request camera/mic/location only on explicit user action; no data leaves
device without consent. Treat any future AI backend key as server-side only.

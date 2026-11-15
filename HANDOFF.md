# HANDOFF — ACHUZI#1  (update this at the end of every session)

_Last updated: 2026-11-16 · repo: github.com/wannationmedia/achuzi (private) · branch main_

## State (true now)
- Next.js 16 PWA, 8 routes: `/` welcome, `/home` (9-pillar dashboard), `/chat`, `/protection`,
  `/tools`, `/library`, `/profile`, plus `/manifest.webmanifest`.
- Brand: black/gold/crimson, Orbitron + Manrope (self-hosted), Anubis mark from owner artwork.
- NEW 2026-11-16: `LivingBackground` (canvas aurora + lattice + embers, pointer parallax,
  reduced-motion safe) mounted in `AppShell` and Welcome. `AnubisMark` is alive: breathing,
  spinning halo, eye glow + blink, headphone pulse, gaze lean; moods idle/listening/thinking/speaking.
  Chat header Anubis goes "thinking" while a reply is being typed.
- Chat replies are SIMULATED (`src/lib/companion-replies.ts`). Protection Mode is UI-only
  (no real camera/mic/GPS yet).
- `metadataBase` in `src/app/layout.tsx` is a placeholder domain: replace with the real URL.

## Next steps (do ONE per session, in this order)
1. Real AI backend: Next.js route handler `/api/chat` (server-side key, streaming), Tshivenda
   system prompt, move Anubis to `speaking` while streaming. Needs: owner's model/API choice.
2. Protection Mode real capture: MediaRecorder (audio/video), Geolocation, IndexedDB evidence
   vault, explicit permission prompts, POPIA notice.
3. Language switching (EN / Tshivenda / Sepedi / Xitsonga / Siswati) via i18n dictionary.
4. Voice: Web Speech API input, TTS output with Anubis `speaking` mood.
5. Service worker (offline shell) + install prompt.
6. Deploy (Vercel or Cloudflare), custom domain, then wrap native (Capacitor/Expo) for iOS/Android,
   Tauri/Electron for Windows/Mac/Linux.

## Gotchas already paid for
- Stale server: after `npm run build` ALWAYS restart `next start` (old HTML pointed at deleted
  CSS hash -> zero styling -> image filled the screen). Not a code bug.
- `next lint` is broken in 16.4: use `npx eslint .`.
- `npm run start -- -p 4100` (double dash) to pass the port.
- Google Fonts unreachable in sandbox: keep @fontsource.
- Sandbox GitHub: repo creation is blocked; owner creates empty repo, then `add_repo` + push.
- `new Date()` in client render breaks prerender: compute in `useEffect`.

## Verify recipe (cheap)
`rm -rf .next && npm run build 2>&1 | tail -20` -> restart server -> Playwright `evaluate()`
for geometry; at most one screenshot.

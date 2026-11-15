import Image from "next/image";
import { AnubisMark } from "@/components/AnubisMark";
import { GlowButton } from "@/components/GlowButton";
import { LivingBackground } from "@/components/LivingBackground";

export default function WelcomePage() {
  return (
    <main className="relative flex min-h-screen w-full justify-center overflow-hidden bg-void-field">
      <LivingBackground />
      <div className="relative z-10 flex min-h-screen w-full max-w-md flex-col items-center px-6 pb-10 pt-12 text-center">
        <p className="font-display text-[11px] tracking-[0.35em] text-gold-bright/80">
          WANNATION HOLDINGS PRESENTS
        </p>

        <div className="mt-10">
          <AnubisMark size={168} pulse />
        </div>

        <h1 className="font-display mt-8 text-4xl font-extrabold tracking-wide text-ink text-glow-gold">
          ACHUZI<span className="text-crimson-bright">#1</span>
        </h1>
        <p className="font-display mt-2 text-xs tracking-[0.3em] text-ink-dim">
          YOUR TOMORROW COMPANION
        </p>

        <p className="mt-6 max-w-xs text-sm leading-relaxed text-ink-dim">
          Intelligence in your language. Opportunity in your hands.
          <br />A brighter tomorrow — together.
        </p>

        <div className="mt-10 grid w-full max-w-xs grid-cols-3 gap-2 text-[10px] uppercase tracking-wide text-ink-faint">
          <span className="rounded-full border border-panel-border px-2 py-1">
            Accessible
          </span>
          <span className="rounded-full border border-panel-border px-2 py-1">
            Multilingual
          </span>
          <span className="rounded-full border border-panel-border px-2 py-1">
            Secure
          </span>
        </div>

        <div className="mt-auto flex w-full max-w-xs flex-col gap-3 pt-12">
          <GlowButton href="/home" variant="primary" className="w-full">
            Get Started
          </GlowButton>
          <GlowButton href="/home" variant="secondary" className="w-full">
            I Already Have an Account
          </GlowButton>
        </div>

        <p className="mt-8 text-[11px] leading-relaxed text-ink-faint">
          From <span className="text-gold-bright">Venda</span> to the world.
          <br />
          Inside Africa. For everyone.
        </p>

        <div className="mt-6 flex items-center gap-2 opacity-70">
          <div className="relative h-5 w-5">
            <Image
              src="/icons/icon-192.png"
              alt="WANNATION HOLDINGS"
              fill
              className="object-contain"
            />
          </div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-ink-faint">
            Powered by WANNATION HOLDINGS
          </span>
        </div>
      </div>
    </main>
  );
}

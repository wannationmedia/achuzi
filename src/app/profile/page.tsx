import {
  Globe2,
  Bell,
  ShieldCheck,
  CircleHelp,
  Info,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { AnubisMark } from "@/components/AnubisMark";

export const metadata = { title: "Profile — ACHUZI#1" };

const LANGUAGES = ["English", "Tshivenḓa", "Sepedi", "Xitsonga", "Siswati"];

const SETTINGS = [
  { label: "Language", icon: Globe2, value: "English" },
  { label: "Notifications", icon: Bell, value: "On" },
  { label: "Privacy & Data", icon: ShieldCheck, value: "" },
  { label: "Help & Support", icon: CircleHelp, value: "" },
  { label: "About ACHUZI#1", icon: Info, value: "" },
];

export default function ProfilePage() {
  return (
    <AppShell>
      <div className="min-h-0 flex-1 overflow-y-auto px-5 py-6">
        <div className="flex items-center gap-4">
          <AnubisMark size={56} />
          <div>
            <p className="text-base font-semibold text-ink">Tshifhiwa</p>
            <p className="text-xs text-ink-dim">WANNATION HOLDINGS (PTY) LTD</p>
            <span className="mt-1 inline-block rounded-full bg-gold-dim/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-gold-bright">
              Free tier
            </span>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {LANGUAGES.map((lang, i) => (
            <span
              key={lang}
              className={
                "rounded-full border px-3 py-1 text-[11px] " +
                (i === 0
                  ? "border-crimson-bright/60 bg-crimson/10 text-crimson-bright"
                  : "border-panel-border text-ink-dim")
              }
            >
              {lang}
            </span>
          ))}
        </div>

        <div className="mt-7 flex flex-col divide-y divide-panel-border overflow-hidden rounded-2xl border border-panel-border">
          {SETTINGS.map(({ label, icon: Icon, value }) => (
            <button
              key={label}
              className="flex items-center gap-3 bg-panel px-4 py-3.5 text-left"
            >
              <Icon size={16} className="text-gold-bright" />
              <span className="flex-1 text-sm text-ink">{label}</span>
              {value && <span className="text-xs text-ink-faint">{value}</span>}
              <ChevronRight size={14} className="text-ink-faint" />
            </button>
          ))}
        </div>

        <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-panel-border px-4 py-3 text-sm text-ink-dim">
          <LogOut size={15} />
          Sign out
        </button>

        <p className="mt-6 text-center text-[10px] text-ink-faint">
          ACHUZI#1 v0.1.0 &middot; Powered by WANNATION HOLDINGS
        </p>
      </div>
    </AppShell>
  );
}

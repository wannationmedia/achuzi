import { LibraryBig } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { ScreenHeader } from "@/components/ScreenHeader";

export const metadata = { title: "Library — ACHUZI#1" };

export default function LibraryPage() {
  return (
    <AppShell>
      <ScreenHeader
        title="Library"
        subtitle="Saved conversations, documents and evidence."
      />
      <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-void-3 ring-1 ring-gold-dim/40">
          <LibraryBig size={26} className="text-gold-bright" />
        </span>
        <div>
          <p className="text-sm font-semibold text-ink">Nothing saved yet</p>
          <p className="mt-1 text-xs leading-relaxed text-ink-dim">
            Conversations you bookmark, documents ACHUZI helps you prepare,
            and Protection Mode session logs will all show up here.
          </p>
        </div>
      </div>
    </AppShell>
  );
}

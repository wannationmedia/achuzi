import type { ReactNode } from "react";
import { BottomNav } from "./BottomNav";
import { LivingBackground } from "./LivingBackground";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex h-dvh w-full justify-center bg-void-field">
      <LivingBackground />
      <div className="relative z-10 flex h-dvh w-full max-w-md flex-col border-x border-panel-border/60">
        <div
          className="flex min-h-0 flex-1 flex-col overflow-y-auto"
          style={{ paddingTop: "env(safe-area-inset-top)" }}
        >
          {children}
        </div>
        <BottomNav />
      </div>
    </div>
  );
}

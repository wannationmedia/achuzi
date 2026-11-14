"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { Home, MessageCircle, Wrench, LibraryBig, User } from "lucide-react";

const TABS = [
  { href: "/home", label: "Home", icon: Home },
  { href: "/chat", label: "Chat", icon: MessageCircle },
  { href: "/tools", label: "Tools", icon: Wrench },
  { href: "/library", label: "Library", icon: LibraryBig },
  { href: "/profile", label: "Profile", icon: User },
] as const;

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="sticky bottom-0 inset-x-0 z-30 border-t border-panel-border bg-void-2/90 backdrop-blur-md"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="mx-auto flex max-w-md items-stretch justify-between px-2">
        {TABS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                className="group flex flex-col items-center gap-1 py-2.5 text-[11px] tracking-wide"
              >
                <Icon
                  size={20}
                  strokeWidth={active ? 2.3 : 1.8}
                  className={clsx(
                    "transition-colors",
                    active ? "text-crimson-bright" : "text-ink-faint group-hover:text-ink-dim"
                  )}
                />
                <span
                  className={clsx(
                    "uppercase",
                    active ? "text-gold-bright" : "text-ink-faint"
                  )}
                >
                  {label}
                </span>
                {active && (
                  <span className="mt-0.5 h-0.5 w-5 rounded-full bg-crimson shadow-[0_0_8px_rgba(232,49,58,0.8)]" />
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

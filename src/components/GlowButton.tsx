import type { ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import clsx from "clsx";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold tracking-wide transition-transform active:scale-[0.98]";

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-crimson to-crimson-bright text-ink shadow-[0_8px_24px_-6px_rgba(232,49,58,0.55)] hover:brightness-110",
  secondary:
    "border border-gold-dim text-gold-bright bg-void-2/60 hover:border-gold hover:bg-void-3",
  ghost: "text-ink-dim hover:text-ink",
};

export function GlowButton({
  children,
  variant = "primary",
  href,
  className,
  ...props
}: {
  children: ReactNode;
  variant?: Variant;
  href?: string;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  const classes = clsx(base, variants[variant], className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}

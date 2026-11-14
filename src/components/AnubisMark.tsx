import Image from "next/image";
import clsx from "clsx";

export function AnubisMark({
  size = 96,
  pulse = false,
  className,
}: {
  size?: number;
  pulse?: boolean;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "relative shrink-0 rounded-full overflow-hidden ring-glow",
        pulse && "animate-pulse-ring",
        className
      )}
      style={{ width: size, height: size }}
    >
      <Image
        src="/icons/mark.png"
        alt="ACHUZI#1 Anubis mark"
        fill
        sizes={`${size}px`}
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 rounded-full shadow-[inset_0_0_14px_rgba(0,0,0,0.5)]" />
    </div>
  );
}

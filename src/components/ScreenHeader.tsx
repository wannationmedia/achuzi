export function ScreenHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <header className="shrink-0 border-b border-panel-border px-5 py-5">
      <h1 className="font-display text-lg font-bold tracking-wide text-ink">
        {title}
      </h1>
      {subtitle && <p className="mt-1 text-xs text-ink-dim">{subtitle}</p>}
    </header>
  );
}

import { type ReactNode } from "react";

export function Slide({
  id,
  index,
  eyebrow,
  title,
  children,
  tone = "default",
}: {
  id: string;
  index: number;
  eyebrow?: string;
  title?: string;
  children: ReactNode;
  tone?: "default" | "cover" | "alert";
}) {
  return (
    <section
      id={id}
      data-slide={id}
      className="relative flex min-h-[100svh] w-full snap-start flex-col justify-center px-5 py-20 sm:px-10 lg:px-20"
    >
      {tone === "cover" && (
        <div
          aria-hidden
          className="animate-glow pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_20%_15%,rgba(255,69,32,0.22),transparent_70%),radial-gradient(45%_40%_at_85%_80%,rgba(255,167,51,0.15),transparent_70%)]"
        />
      )}
      {tone === "alert" && (
        <div
          aria-hidden
          className="animate-glow pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_50%,rgba(255,59,31,0.18),transparent_70%)]"
        />
      )}
      <div className="relative mx-auto w-full max-w-6xl">
        {(eyebrow || title) && (
          <header className="mb-8">
            {eyebrow && (
              <p className="mb-3 flex items-center gap-3 text-xs font-semibold tracking-[0.22em] text-ember uppercase">
                <span className="inline-block h-px w-8 bg-ember" />
                {String(index).padStart(2, "0")} · {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="text-3xl leading-tight font-bold text-foreground sm:text-4xl lg:text-5xl">
                {title}
              </h2>
            )}
          </header>
        )}
        <div className="space-y-6">{children}</div>
      </div>
    </section>
  );
}

export function Card({
  children,
  className = "",
  accent = false,
}: {
  children: ReactNode;
  className?: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border bg-surface p-5 ${accent ? "border-ember/50" : "border-border"} ${className}`}
    >
      {children}
    </div>
  );
}

export function Metric({
  label,
  value,
  hint,
  tone = "default",
}: {
  label: string;
  value: string;
  hint?: string;
  tone?: "default" | "ember" | "alert" | "success";
}) {
  const color =
    tone === "ember"
      ? "text-flame"
      : tone === "alert"
        ? "text-destructive"
        : tone === "success"
          ? "text-success"
          : "text-foreground";
  return (
    <Card>
      <p className="text-[0.7rem] font-semibold tracking-wider text-muted-foreground uppercase">
        {label}
      </p>
      <p className={`mt-2 font-display text-2xl font-bold sm:text-3xl ${color}`}>{value}</p>
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
    </Card>
  );
}

export function Note({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-xl border-l-2 border-flame bg-surface-2 p-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
      {children}
    </div>
  );
}

export function Table({
  head,
  rows,
  highlight,
}: {
  head: string[];
  rows: ReactNode[][];
  highlight?: number;
}) {
  return (
    <div className="-mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
      <table className="w-full min-w-[640px] border-separate border-spacing-0 text-left text-sm">
        <thead>
          <tr>
            {head.map((h) => (
              <th
                key={h}
                className="border-b border-ember/40 pb-3 text-[0.7rem] font-semibold tracking-wider text-flame uppercase"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className={highlight === i ? "bg-ember/8" : undefined}>
              {r.map((c, j) => (
                <td
                  key={j}
                  className={`border-b border-border py-3 pr-4 align-top ${
                    j === 0 ? "font-medium text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function BarChart({
  data,
  unit = "R$ ",
}: {
  data: { label: string; value: number; display: string }[];
  unit?: string;
}) {
  const max = Math.max(...data.map((d) => d.value));
  return (
    <Card>
      <p className="mb-6 text-[0.7rem] font-semibold tracking-wider text-muted-foreground uppercase">
        {unit}CPM por mês
      </p>
      <div className="flex h-56 items-end gap-3 sm:gap-8">
        {data.map((d) => (
          <div key={d.label} className="flex h-full flex-1 flex-col justify-end gap-2">
            <p className="text-center font-display text-xs font-bold text-flame sm:text-sm">
              {d.display}
            </p>
            <div
              className="w-full rounded-t-md bg-gradient-to-t from-ember to-flame"
              style={{ height: `${(d.value / max) * 100}%` }}
            />
            <p className="text-center text-[0.7rem] text-muted-foreground sm:text-xs">{d.label}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}

export function Chips({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((t) => (
        <span
          key={t}
          className="rounded-full border border-border bg-surface-2 px-3 py-1 text-xs text-muted-foreground"
        >
          {t}
        </span>
      ))}
    </div>
  );
}

export function Steps({ items }: { items: ReactNode[] }) {
  return (
    <ol className="space-y-3">
      {items.map((t, i) => (
        <li key={i} className="flex gap-4 rounded-xl border border-border bg-surface p-4">
          <span className="font-display text-lg font-bold text-ember">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span className="text-sm leading-relaxed text-muted-foreground sm:text-base">{t}</span>
        </li>
      ))}
    </ol>
  );
}

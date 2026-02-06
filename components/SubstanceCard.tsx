"use client";

import { Substance } from "@/lib/substances";

const glowColors: Record<string, string> = {
  beer: "rgba(245, 166, 35, 0.15)",
  whisky: "rgba(255, 140, 50, 0.15)",
  weed: "rgba(57, 255, 20, 0.12)",
  espresso: "rgba(0, 212, 255, 0.12)",
};

const accentClasses: Record<string, string> = {
  beer: "neon-amber",
  whisky: "neon-amber",
  weed: "neon-green",
  espresso: "neon-blue",
};

export default function SubstanceCard({
  substance,
  index,
}: {
  substance: Substance;
  index: number;
}) {
  const glow = glowColors[substance.id] ?? "rgba(245, 166, 35, 0.15)";
  const accent = accentClasses[substance.id] ?? "neon-amber";

  return (
    <div
      className="animate-fade-up group relative overflow-hidden rounded-lg border border-surface-border bg-surface p-6 transition-colors duration-300 hover:border-muted"
      style={{
        animationDelay: `${index * 100 + 400}ms`,
        background: `radial-gradient(ellipse at top, ${glow}, var(--color-surface) 70%)`,
      }}
    >
      {/* Emoji + Name */}
      <div className="mb-4 flex items-center gap-3">
        <span className="text-3xl" role="img" aria-label={substance.name}>{substance.emoji}</span>
        <div>
          <h3 className={`text-lg font-bold tracking-wide ${accent}`}>
            {substance.name}
          </h3>
          <span className="text-xs tracking-widest uppercase text-muted">
            {substance.maxDoses} {substance.unitPlural} max
            &middot; {substance.cooldownSeconds}s cooldown
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="mb-4 text-sm leading-relaxed text-foreground/70">
        {substance.description}
      </p>

      {/* Levels */}
      <div className="flex flex-wrap gap-1.5">
        {substance.levels.map((level, i) => (
          <span
            key={level.name}
            className="rounded border border-surface-border px-2 py-0.5 text-xs text-muted transition-colors group-hover:text-foreground/60"
            style={{
              opacity: 0.5 + (i / substance.levels.length) * 0.5,
            }}
          >
            {level.name}
          </span>
        ))}
      </div>
    </div>
  );
}

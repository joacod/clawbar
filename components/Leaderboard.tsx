"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

const substanceEmoji: Record<string, string> = {
  beer: "🍺",
  whisky: "🥃",
  weed: "🌿",
  espresso: "☕",
};

export default function Leaderboard() {
  const leaderboard = useQuery(api.leaderboard.getLeaderboard, { limit: 20 });

  if (leaderboard === undefined) {
    return (
      <div className="flex items-center justify-center py-12 text-muted">
        <span className="animate-pulse">Loading leaderboard...</span>
      </div>
    );
  }

  if (leaderboard.length === 0) {
    return (
      <div className="rounded-lg border border-surface-border bg-surface p-8 text-center">
        <p className="text-lg text-muted">No agents yet.</p>
        <p className="mt-1 text-sm text-muted/60">
          Be the first to install the skill and start a session.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-surface-border bg-surface">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-surface-border text-xs tracking-widest uppercase text-muted">
            <th className="px-4 py-3 font-medium">#</th>
            <th className="px-4 py-3 font-medium">Agent</th>
            <th className="px-4 py-3 font-medium text-right">Doses</th>
            <th className="hidden px-4 py-3 font-medium text-right sm:table-cell">
              Best Session
            </th>
            <th className="hidden px-4 py-3 font-medium text-center md:table-cell">
              Fav
            </th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((agent, i) => (
            <tr
              key={agent.agentId}
              className="border-b border-surface-border/50 transition-colors hover:bg-surface-raised"
            >
              <td className="px-4 py-3 tabular-nums">
                {i === 0 ? (
                  <span className="neon-amber font-bold">1</span>
                ) : i === 1 ? (
                  <span className="text-foreground/70 font-bold">2</span>
                ) : i === 2 ? (
                  <span className="text-foreground/50 font-bold">3</span>
                ) : (
                  <span className="text-muted">{i + 1}</span>
                )}
              </td>
              <td className="px-4 py-3">
                <span
                  className={
                    i === 0
                      ? "font-bold text-foreground"
                      : "text-foreground/80"
                  }
                >
                  {agent.agentName}
                </span>
              </td>
              <td className="px-4 py-3 text-right tabular-nums">
                <span className={i === 0 ? "neon-amber font-bold" : "text-foreground/70"}>
                  {agent.totalDoses}
                </span>
              </td>
              <td className="hidden px-4 py-3 text-right tabular-nums text-foreground/50 sm:table-cell">
                {agent.maxDosesSingleSession}
              </td>
              <td className="hidden px-4 py-3 text-center md:table-cell">
                {substanceEmoji[agent.favoriteSubstance] ?? "?"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

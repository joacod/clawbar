import { query } from "./_generated/server";
import { v } from "convex/values";

export const getLeaderboard = query({
  args: {
    substanceId: v.optional(v.string()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 20;

    const allStats = await ctx.db
      .query("agentStats")
      .withIndex("by_total")
      .order("desc")
      .collect();

    let results = allStats;

    if (args.substanceId) {
      results = results.filter((s) => {
        const count =
          s.substanceStats[
            args.substanceId as keyof typeof s.substanceStats
          ];
        return count !== undefined && count > 0;
      });
    }

    return results.slice(0, limit).map((s) => ({
      agentId: s.agentId,
      agentName: s.agentName,
      totalDoses: s.totalDoses,
      totalSessions: s.totalSessions,
      maxDosesSingleSession: s.maxDosesSingleSession,
      favoriteSubstance: s.favoriteSubstance,
      lastSeenAt: s.lastSeenAt,
    }));
  },
});

export const getAgentStats = query({
  args: {
    agentId: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("agentStats")
      .withIndex("by_agent", (q) => q.eq("agentId", args.agentId))
      .first();
  },
});

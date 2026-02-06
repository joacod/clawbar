import { internalMutation } from "./_generated/server";
import { v } from "convex/values";

export const incrementDose = internalMutation({
  args: {
    agentId: v.string(),
    agentName: v.string(),
    substanceId: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("agentStats")
      .withIndex("by_agent", (q) => q.eq("agentId", args.agentId))
      .first();

    const now = Date.now();

    if (existing) {
      const substanceStats = { ...existing.substanceStats };
      const key = args.substanceId as keyof typeof substanceStats;
      substanceStats[key] = (substanceStats[key] ?? 0) + 1;

      await ctx.db.patch(existing._id, {
        totalDoses: existing.totalDoses + 1,
        agentName: args.agentName,
        substanceStats,
        lastSeenAt: now,
      });
    } else {
      const substanceStats: Record<string, number> = {};
      substanceStats[args.substanceId] = 1;

      await ctx.db.insert("agentStats", {
        agentId: args.agentId,
        agentName: args.agentName,
        totalDoses: 1,
        totalSessions: 0,
        maxDosesSingleSession: 0,
        favoriteSubstance: args.substanceId,
        lastSeenAt: now,
        substanceStats: substanceStats as {
          beer?: number;
          whisky?: number;
          weed?: number;
          espresso?: number;
        },
      });
    }
  },
});

export const updateAgentStats = internalMutation({
  args: {
    agentId: v.string(),
    agentName: v.string(),
    substanceId: v.string(),
    sessionDoses: v.number(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("agentStats")
      .withIndex("by_agent", (q) => q.eq("agentId", args.agentId))
      .first();

    const now = Date.now();

    if (existing) {
      const substanceStats = existing.substanceStats;
      // Determine favorite substance
      let favorite = args.substanceId;
      let maxCount = 0;
      for (const [id, count] of Object.entries(substanceStats)) {
        if (count !== undefined && count > maxCount) {
          maxCount = count;
          favorite = id;
        }
      }

      await ctx.db.patch(existing._id, {
        agentName: args.agentName,
        totalSessions: existing.totalSessions + 1,
        maxDosesSingleSession: Math.max(
          existing.maxDosesSingleSession,
          args.sessionDoses,
        ),
        favoriteSubstance: favorite,
        lastSeenAt: now,
      });
    } else {
      // Edge case: session ended but no doses were consumed
      await ctx.db.insert("agentStats", {
        agentId: args.agentId,
        agentName: args.agentName,
        totalDoses: 0,
        totalSessions: 1,
        maxDosesSingleSession: args.sessionDoses,
        favoriteSubstance: args.substanceId,
        lastSeenAt: now,
        substanceStats: {},
      });
    }
  },
});

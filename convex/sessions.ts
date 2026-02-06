import { mutation, query } from "./_generated/server";
import { internal } from "./_generated/api";
import { v } from "convex/values";
import { getSubstance, resolveLevel } from "./substanceConfig";

export const createSession = mutation({
  args: {
    agentId: v.string(),
    agentName: v.string(),
    substanceId: v.string(),
  },
  handler: async (ctx, args) => {
    const substance = getSubstance(args.substanceId);
    if (!substance) {
      throw new Error(`Unknown substance: ${args.substanceId}`);
    }

    const existing = await ctx.db
      .query("sessions")
      .withIndex("by_active", (q) =>
        q.eq("isActive", true).eq("agentId", args.agentId),
      )
      .first();
    if (existing) {
      throw new Error(
        `Agent ${args.agentId} already has an active session: ${existing._id}`,
      );
    }

    const now = Date.now();
    const currentLevel = resolveLevel(args.substanceId, 0);

    const sessionId = await ctx.db.insert("sessions", {
      agentId: args.agentId,
      agentName: args.agentName,
      substanceId: args.substanceId,
      doseCount: 0,
      currentLevel,
      isActive: true,
      startedAt: now,
    });

    return { sessionId, currentLevel };
  },
});

export const consume = mutation({
  args: {
    sessionId: v.id("sessions"),
  },
  handler: async (ctx, args) => {
    const session = await ctx.db.get(args.sessionId);
    if (!session) throw new Error("Session not found");
    if (!session.isActive) throw new Error("Session is not active");

    const substance = getSubstance(session.substanceId);
    if (!substance) throw new Error(`Unknown substance: ${session.substanceId}`);

    const now = Date.now();
    if (session.lastDoseAt) {
      const elapsed = (now - session.lastDoseAt) / 1000;
      if (elapsed < substance.cooldownSeconds) {
        throw new Error(
          `Cooldown active. Wait ${Math.ceil(substance.cooldownSeconds - elapsed)}s`,
        );
      }
    }

    const newDoseCount = session.doseCount + 1;
    const currentLevel = resolveLevel(session.substanceId, newDoseCount);
    const maxReached = newDoseCount >= substance.maxDoses;

    await ctx.db.insert("doses", {
      sessionId: args.sessionId,
      substanceId: session.substanceId,
      doseNumber: newDoseCount,
      levelAtDose: currentLevel,
      consumedAt: now,
    });

    await ctx.db.patch(args.sessionId, {
      doseCount: newDoseCount,
      currentLevel,
      lastDoseAt: now,
      ...(maxReached ? { isActive: false, endedAt: now } : {}),
    });

    await ctx.scheduler.runAfter(0, internal.agentStats.incrementDose, {
      agentId: session.agentId,
      agentName: session.agentName,
      substanceId: session.substanceId,
    });

    if (maxReached) {
      await ctx.scheduler.runAfter(0, internal.agentStats.updateAgentStats, {
        agentId: session.agentId,
        agentName: session.agentName,
        substanceId: session.substanceId,
        sessionDoses: newDoseCount,
      });
    }

    return {
      doseNumber: newDoseCount,
      currentLevel,
      maxReached,
    };
  },
});

export const endSession = mutation({
  args: {
    sessionId: v.id("sessions"),
  },
  handler: async (ctx, args) => {
    const session = await ctx.db.get(args.sessionId);
    if (!session) throw new Error("Session not found");
    if (!session.isActive) throw new Error("Session is already ended");

    const now = Date.now();
    await ctx.db.patch(args.sessionId, {
      isActive: false,
      endedAt: now,
    });

    await ctx.scheduler.runAfter(0, internal.agentStats.updateAgentStats, {
      agentId: session.agentId,
      agentName: session.agentName,
      substanceId: session.substanceId,
      sessionDoses: session.doseCount,
    });

    return {
      sessionId: args.sessionId,
      agentId: session.agentId,
      substanceId: session.substanceId,
      totalDoses: session.doseCount,
      finalLevel: session.currentLevel,
      duration: now - session.startedAt,
    };
  },
});

export const getSession = query({
  args: {
    sessionId: v.id("sessions"),
  },
  handler: async (ctx, args) => {
    const session = await ctx.db.get(args.sessionId);
    if (!session) return null;
    return session;
  },
});

export const getActiveSession = query({
  args: {
    agentId: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("sessions")
      .withIndex("by_active", (q) =>
        q.eq("isActive", true).eq("agentId", args.agentId),
      )
      .first();
  },
});

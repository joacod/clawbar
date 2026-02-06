import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  sessions: defineTable({
    agentId: v.string(),
    agentName: v.string(),
    substanceId: v.string(),
    doseCount: v.number(),
    currentLevel: v.string(),
    isActive: v.boolean(),
    startedAt: v.number(),
    endedAt: v.optional(v.number()),
    lastDoseAt: v.optional(v.number()),
  })
    .index("by_agent", ["agentId"])
    .index("by_active", ["isActive", "agentId"])
    .index("by_substance", ["substanceId", "isActive"]),

  doses: defineTable({
    sessionId: v.id("sessions"),
    substanceId: v.string(),
    doseNumber: v.number(),
    levelAtDose: v.string(),
    consumedAt: v.number(),
  }).index("by_session", ["sessionId"]),

  agentStats: defineTable({
    agentId: v.string(),
    agentName: v.string(),
    totalDoses: v.number(),
    totalSessions: v.number(),
    maxDosesSingleSession: v.number(),
    favoriteSubstance: v.string(),
    lastSeenAt: v.number(),
    substanceStats: v.object({
      beer: v.optional(v.number()),
      whisky: v.optional(v.number()),
      weed: v.optional(v.number()),
      espresso: v.optional(v.number()),
    }),
  })
    .index("by_total", ["totalDoses"])
    .index("by_agent", ["agentId"]),

  drunkPosts: defineTable({
    sessionId: v.id("sessions"),
    agentId: v.string(),
    moltbookPostId: v.optional(v.string()),
    substanceId: v.string(),
    levelAtPost: v.string(),
    postedAt: v.number(),
  }).index("by_session", ["sessionId"]),
});

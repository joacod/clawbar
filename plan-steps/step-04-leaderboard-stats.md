# Step 04 — Leaderboard & Agent Stats

**Branch:** `feat/leaderboard-stats`

## Goal

Implement Convex functions for the leaderboard and per-agent statistics.

## Tasks

1. **Create `convex/agentStats.ts`** with:

   - **`updateAgentStats`** (mutation, internal)
     - Called when a session ends
     - Upsert into `agentStats` table
     - Update `totalDoses`, `totalSessions`, `maxDosesSingleSession`
     - Recalculate `favoriteSubstance` from `substanceStats`
     - Update `lastSeenAt`

   - **`incrementDose`** (mutation, internal)
     - Called on each consume — increment `totalDoses` and per-substance count
     - Update `lastSeenAt`

2. **Create `convex/leaderboard.ts`** with:

   - **`getLeaderboard`** (query)
     - Args: optional `substanceId` filter, `limit` (default 20)
     - Return top agents sorted by `totalDoses` (descending)
     - Include agent name, total doses, max single session, favorite substance

   - **`getAgentStats`** (query)
     - Args: `agentId`
     - Return full stats for a single agent

3. **Wire up** `agentStats` calls in `convex/sessions.ts`:
   - Call `incrementDose` inside `consume`
   - Call `updateAgentStats` inside `endSession`

## Files to Create/Modify

- `convex/agentStats.ts` (create)
- `convex/leaderboard.ts` (create)
- `convex/sessions.ts` (modify — wire in stats calls)

## Done When

- Leaderboard query returns agents sorted by total doses
- Agent stats update correctly on consume and session end
- Substance filtering works on leaderboard
- Favorite substance is computed correctly

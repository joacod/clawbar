# Step 03 — Session Mutations

**Branch:** `feat/session-mutations`

## Goal

Implement all Convex mutations and queries for managing drinking sessions.

## Tasks

1. **Create `convex/sessions.ts`** with these functions:

   - **`createSession`** (mutation)
     - Args: `agentId`, `agentName`, `substanceId`
     - Validate substance exists
     - Check no active session for this agent (max 1 active)
     - Create session record with `isActive: true`, `doseCount: 0`
     - Return session ID + initial level/modifiers

   - **`consume`** (mutation)
     - Args: `sessionId`
     - Validate session exists and is active
     - Enforce cooldown (`lastDoseAt` + `cooldownSeconds`)
     - Increment `doseCount`
     - Create dose event in `doses` table
     - Compute new level from updated dose count
     - Check if max doses reached — if so, auto-end session
     - Update session record
     - Return new dose count, level, modifiers, whether max was reached

   - **`endSession`** (mutation)
     - Args: `sessionId`
     - Mark session `isActive: false`, set `endedAt`
     - Update `agentStats` (see step 04, but stub the call here)
     - Return final stats summary

   - **`getSession`** (query)
     - Args: `sessionId`
     - Return session data + computed current modifiers

   - **`getActiveSession`** (query)
     - Args: `agentId`
     - Return the active session for an agent (if any)

2. **Import and use** `lib/substances.ts` and `lib/intoxication.ts` from step 02

## Files to Create

- `convex/sessions.ts`

## Done When

- All 5 functions work correctly
- Cooldown enforcement works
- Max dose auto-end works
- Only 1 active session per agent enforced
- Dose events are logged to the `doses` table

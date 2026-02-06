# Step 06 — API Routes

**Branch:** `feat/api-routes`

## Goal

Create all Next.js API routes that serve as the REST interface for agents.

## Tasks

1. **Create `app/api/substances/route.ts`**
   - `GET` — Return list of all substances (id, name, emoji, unit, description, level names)

2. **Create `app/api/substances/[id]/route.ts`** (optional, can skip if list endpoint is enough)
   - `GET` — Return full substance details including all levels

3. **Create `app/api/auth/verify/route.ts`**
   - `POST` — Read `X-Moltbook-Identity` header, call MoltBook verify, return JWT

4. **Create `app/api/sessions/route.ts`**
   - `POST` — Extract auth, call `createSession` Convex mutation
   - Body: `{ substanceId }`

5. **Create `app/api/sessions/[id]/route.ts`**
   - `GET` — Extract auth, call `getSession` Convex query

6. **Create `app/api/sessions/[id]/consume/route.ts`**
   - `POST` — Extract auth, call `consume` Convex mutation

7. **Create `app/api/sessions/[id]/end/route.ts`**
   - `POST` — Extract auth, call `endSession` Convex mutation

8. **Create `app/api/leaderboard/route.ts`**
   - `GET` — Query params: `substance`, `limit`
   - Call `getLeaderboard` Convex query

9. **Create `app/api/leaderboard/[agentId]/route.ts`**
   - `GET` — Call `getAgentStats` Convex query

10. **Set up Convex HTTP client** for server-side API route usage
    - Create a shared Convex client instance for use in API routes

## Shared Concerns

- All routes should use `extractAuth` from `lib/auth.ts` (except substances list and leaderboard GET)
- Sanitize all agent-supplied strings before passing to Convex
- Return proper HTTP status codes (400, 401, 404, 429)
- Keep request body size reasonable

## Files to Create

- `lib/convex.ts` (server-side Convex client)
- `app/api/substances/route.ts`
- `app/api/auth/verify/route.ts`
- `app/api/sessions/route.ts`
- `app/api/sessions/[id]/route.ts`
- `app/api/sessions/[id]/consume/route.ts`
- `app/api/sessions/[id]/end/route.ts`
- `app/api/leaderboard/route.ts`
- `app/api/leaderboard/[agentId]/route.ts`

## Done When

- All 8 API endpoints respond correctly
- Auth is enforced on session endpoints
- Substances list works without auth
- Leaderboard works without auth
- Error responses use proper status codes

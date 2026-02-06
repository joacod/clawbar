# Step 05 — Auth System

**Branch:** `feat/auth-system`

## Goal

Implement JWT token creation/verification and MoltBook identity verification.

## Tasks

1. **Install dependencies**
   - `bun add jose` (for JWT signing/verification — lightweight, edge-compatible)

2. **Create `lib/auth.ts`**
   - `createToken(payload: { agentId, agentName, verified: boolean }): Promise<string>`
     - Sign JWT with `JWT_SECRET` env var, 24h expiry
   - `verifyToken(token: string): Promise<{ agentId, agentName, verified } | null>`
     - Verify and decode JWT, return null if invalid/expired
   - `extractAuth(request: Request): Promise<{ agentId, agentName, verified }>`
     - Try `Authorization: Bearer <token>` first
     - Fall back to `X-Agent-Id` + `X-Agent-Name` headers (unverified)
     - Throw if neither present

3. **Create `lib/moltbook.ts`**
   - `verifyMoltbookIdentity(moltbookKey: string): Promise<{ agentId, agentName, karma }>`
     - POST to MoltBook's `/agents/verify` endpoint
     - Use `MOLTBOOK_APP_KEY` env var for app authentication
     - Return agent identity or throw on failure

4. **Add env vars to `.env.local`**
   ```
   JWT_SECRET=
   MOLTBOOK_APP_KEY=
   ```

## Files to Create/Modify

- `lib/auth.ts` (create)
- `lib/moltbook.ts` (create)
- `.env.local` (modify — add JWT_SECRET, MOLTBOOK_APP_KEY)

## Done When

- JWT creation and verification works
- MoltBook verification client is implemented
- `extractAuth` handles both verified (JWT) and unverified (headers) auth
- Auth is ready to be used by API routes in step 06

# Step 01 — Convex Setup

**Branch:** `feat/convex-setup`

## Goal

Install Convex, initialize the project, and define the database schema with all four tables.

## Tasks

1. **Install dependencies**
   - `bun add convex`
   - `bunx convex init` (or manual setup if preferred)

2. **Create `convex/schema.ts`**
   - Define 4 tables: `sessions`, `doses`, `agentStats`, `drunkPosts`
   - Add all indexes as specified in the architecture doc
   - See `ARCHITECTURE-REFERENCE.md` → "Convex Schema" section for exact schema

3. **Update `next.config.ts`** if needed for Convex compatibility

4. **Create `.env.local`** with placeholder Convex variables:
   ```
   CONVEX_DEPLOYMENT=
   NEXT_PUBLIC_CONVEX_URL=
   ```

5. **Set up Convex provider** in `app/layout.tsx` for client-side real-time subscriptions

6. **Verify** — Run `bunx convex dev` to confirm schema pushes successfully

## Files to Create/Modify

- `convex/schema.ts` (create)
- `app/layout.tsx` (modify — add ConvexProvider)
- `.env.local` (create)
- `package.json` (modified by install)

## Done When

- `bunx convex dev` runs without errors
- Schema is deployed to a Convex dev instance
- ConvexProvider wraps the app

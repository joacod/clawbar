# Step 09 — Polish & Deploy

**Branch:** `feat/polish-deploy`

## Goal

Security hardening, final polish, and deployment to Vercel.

## Tasks

1. **Security hardening**
   - Verify rate limiting on `/consume` (cooldown enforcement)
   - Verify max 1 active session per agent
   - Verify max doses enforcement
   - Sanitize agent names/strings before DB writes and display (XSS prevention)
   - Verify JWT secret is only in env vars
   - Add request body size validation on API routes

2. **CORS configuration**
   - Configure CORS headers on API routes
   - Allow `*` for agent-facing API routes
   - Lock web routes to your Vercel domain

3. **Environment setup for production**
   - Set up all env vars in Vercel dashboard
   - Generate production JWT_SECRET
   - Configure MOLTBOOK_APP_KEY
   - Set up Convex production deployment

4. **Deploy**
   - `bunx convex deploy` — push schema to production
   - `vercel deploy` — deploy Next.js app
   - Verify all API endpoints work in production
   - Test a full session flow end-to-end

5. **Post-deploy verification**
   - Test substance listing
   - Test session create → consume → end flow
   - Test leaderboard updates
   - Test auth flow (both verified and unverified)

## Files to Modify

- API route files (add CORS headers, body size limits)
- `next.config.ts` (if CORS config needed at framework level)
- `.env.local` → production env vars in Vercel

## Done When

- All security checklist items from the architecture doc are addressed
- App is deployed and accessible on Vercel
- Full session flow works end-to-end in production
- Leaderboard updates in real-time on the live site

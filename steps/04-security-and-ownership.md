# Step 4: Tighten Security and Session Ownership

Goal: keep the public skill playful while removing the biggest avoidable trust gaps.

## Why this step matters

- Current session routes only require some auth, not ownership.
- Anyone with a known session ID may be able to inspect or mutate a session.
- The current middleware-like file may not actually be applied by Next.

## Files involved

- `lib/auth.ts`
- `app/api/sessions/route.ts`
- `app/api/sessions/[id]/route.ts`
- `app/api/sessions/[id]/consume/route.ts`
- `app/api/sessions/[id]/end/route.ts`
- `convex/sessions.ts`
- `proxy.ts` or replacement `middleware.ts`

## Recommended policy

- Keep anonymous header-based auth for low-friction public use.
- Enforce that session reads and mutations only work for the session owner.
- Keep verified MoltBook auth optional, not mandatory.
- Preserve the fun/public nature of the leaderboard, but document the privacy tradeoff.

## Checklist

- [ ] Thread authenticated `agentId` through session read and mutation paths.
- [ ] Reject `GET /api/sessions/:id` when the requester does not own the session.
- [ ] Reject `POST /api/sessions/:id/consume` when the requester does not own the session.
- [ ] Reject `POST /api/sessions/:id/end` when the requester does not own the session.
- [ ] Decide whether ownership should be enforced in route handlers, Convex functions, or both.
- [ ] Replace `proxy.ts` with real Next middleware if headers/CORS are intended to run globally.
- [ ] Add lightweight abuse protection if needed on auth/session endpoints.

## Done when

- Session IDs alone are not enough to control another agent's session.
- Security headers and CORS behavior are applied intentionally, not accidentally.
- The public skill has a clearer and safer operational posture.

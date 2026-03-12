# Step 3: Align the Site and Repo Docs

Goal: make the public website and repo docs match the real installation and development flow.

## Why this step matters

- The site currently shows the wrong install command.
- Contributors do not have enough setup guidance for env vars or Convex generation.
- Public docs should reinforce the same safe skill story as `SKILL.md`.

## Files involved

- `app/page.tsx`
- `README.md`
- `env.example`
- `package.json`
- optionally any new contributor docs we add later

## Checklist

- [ ] Change the homepage install CTA from `openclaw install clawbar` to `clawhub install clawbar`.
- [ ] Expand `README.md` with a short project overview and the skill/API relationship.
- [ ] Document local setup prerequisites in `README.md`.
- [ ] Add missing runtime env vars to `env.example`.
- [ ] Document which env vars are optional vs required.
- [ ] Add Convex codegen/dev scripts to `package.json` if needed for reproducible local setup.
- [ ] Document how generated Convex files are expected to appear during local development and CI.

## Recommended env doc coverage

- `CONVEX_DEPLOYMENT`
- `NEXT_PUBLIC_CONVEX_URL`
- `JWT_SECRET`
- any MoltBook-related env vars used by `lib/moltbook.ts`

## Done when

- Every install command shown publicly uses `clawhub`.
- A new contributor can understand how to boot the app and regenerate Convex types.
- Repo docs no longer hide required runtime assumptions.

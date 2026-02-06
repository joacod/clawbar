# IntoxicatedClaw — Implementation Steps

This folder contains the step-by-step implementation plan for IntoxicatedClaw.
Each step is a separate markdown file with clear scope, instructions, and a suggested branch name.

## How to Use

1. Read the step file (e.g., `step-01-...md`)
2. Create the branch listed at the top of the file
3. Prompt Claude with: **"Implement step N from plan-steps"** (replacing N with the step number)
4. Once done, merge the branch and move to the next step

## Steps Overview

| Step | Branch | Description |
|------|--------|-------------|
| 01 | `feat/convex-setup` | Install Convex, configure project, set up schema |
| 02 | `feat/substance-system` | Create substance config and intoxication level resolver |
| 03 | `feat/session-mutations` | Convex mutations for sessions (create, consume, end, get) |
| 04 | `feat/leaderboard-stats` | Convex queries/mutations for leaderboard and agent stats |
| 05 | `feat/auth-system` | JWT auth, MoltBook verification, auth middleware |
| 06 | `feat/api-routes` | All Next.js API routes wiring Convex to REST endpoints |
| 07 | `feat/openclaw-skill` | The SKILL.md file for OpenClaw distribution |
| 08 | `feat/landing-page` | Landing page with live leaderboard and substance cards |
| 09 | `feat/polish-deploy` | Security hardening, env config, Vercel deployment |

## Reference

- `ARCHITECTURE-REFERENCE.md` — Full copy of the architecture document

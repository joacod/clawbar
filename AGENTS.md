# AGENTS.md

## Overview
- Stack: Bun, Next.js 16 App Router, React 19, TypeScript, ESLint, Tailwind CSS 4, Convex.
- Purpose: config-driven "bar for AI agents" with a public site, API routes, and Convex-backed session tracking.

## Commands
- Install: `bun install`
- Dev: `bun run dev`
- Build: `bun run build`
- Start: `bun run start`
- Lint: `bun run lint`
- Type-check: `bunx tsc --noEmit`
- Lint one file: `bunx eslint app/page.tsx`
- Lint multiple files: `bunx eslint app/api/sessions/route.ts lib/auth.ts`

## Tests
- No test runner or `test` script exists yet.
- No single-test command exists yet.
- Verify changes with `bun run lint`, `bunx tsc --noEmit`, and `bun run build`.
- If tests are added, update this file with exact all-test and single-test commands.

## Layout
- `app/`: pages, layouts, client providers, API routes.
- `components/`: reusable UI.
- `lib/`: shared helpers for auth, sanitization, Convex access, and domain logic.
- `convex/`: schema, queries, mutations, and background jobs.
- `public/`: static assets.
- Use generated Convex types and API references from `convex/_generated/*`.

## Conventions
- Use double quotes and semicolons; match surrounding formatting and avoid unrelated reformatting.
- Use `@/` imports across folders; use relative imports for nearby files, especially inside `lib/` and `convex/`.
- Prefer `import type` for type-only imports.
- Keep TypeScript strict; prefer `type`, `Record`, `Readonly`, generics, and narrow unknown values before use.
- Avoid broad casts; preserve generated Convex `Id<...>` and `api` usage patterns.
- Components and component filenames: PascalCase. Functions and variables: camelCase. Constants: UPPER_SNAKE_CASE.
- App Router conventions: server components by default; add `"use client"` only when hooks, browser APIs, or client providers are needed.
- Export typed `metadata` where relevant.
- API routes should use `NextRequest` and `NextResponse`.
- Convex functions should validate args with `v.*`, use `query` for reads, `mutation` for writes, and `internalMutation` plus scheduler jobs for background/stat updates.

## Validation And Errors
- Validate request input early and return explicit 4xx responses for bad requests.
- Reuse `lib/sanitize.ts` for untrusted text.
- Preserve `proxy.ts` security headers and API CORS behavior unless intentionally changing them.
- Treat headers and request bodies as untrusted input.
- In shared helpers, throw plain `Error`; in routes, catch errors and map them to JSON responses.
- Use `error instanceof Error` before reading `.message`.

## Env
- Used env vars: `NEXT_PUBLIC_CONVEX_URL`, `CONVEX_DEPLOYMENT`, `JWT_SECRET`, `MOLTBOOK_APP_KEY`, `MOLTBOOK_API_URL`.
- Fail fast for required env vars.
- Preserve the distinction between public `NEXT_PUBLIC_*` vars and server-only secrets.

## Local Agent Rules
- No `.cursor/rules/`, `.cursorrules`, or `.github/copilot-instructions.md` are present in this repo.

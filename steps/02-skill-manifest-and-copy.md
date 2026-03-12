# Step 2: Rewrite `SKILL.md` for OpenClaw and ClawHub

Goal: make the skill manifest valid, explicit, and safe for public distribution.

## Why this step matters

- `SKILL.md` is the product users install, audit, and rely on.
- OpenClaw expects YAML frontmatter plus parser-friendly metadata.
- Behavior-modifying skills need especially clear boundaries and opt-in language.

## Files involved

- current: `skill/SKILL.md`
- target: `clawbar/SKILL.md`

## Recommended frontmatter shape

Use these fields:

- `name: clawbar`
- `description: ...`
- `homepage: https://clawbar.vercel.app`
- `user-invocable: true`
- `disable-model-invocation: true`
- `metadata: {"openclaw":{"emoji":"🍻","requires":{"bins":["curl"]}}}`

## Body updates to make

- Keep the happy path: menu -> start -> consume -> status -> end.
- Document both auth modes, but make clear verified auth is optional.
- Tell the agent to apply returned modifiers only while the session is active.
- Add a clear stop condition after ending a session.
- Add safety guidance for sensitive workflows.
- Add privacy guidance for leaderboard visibility and pseudonymous IDs.
- Avoid any suspicious command patterns such as `curl | sh`.

## Checklist

- [ ] Rewrite frontmatter into a clean OpenClaw-compatible format.
- [ ] Add single-line JSON `metadata`.
- [ ] Keep `curl` as the only declared required binary unless another true requirement appears.
- [ ] Add a short quick-start section.
- [ ] Tighten the behavioral contract language.
- [ ] Add a `Safety and Privacy` section.
- [ ] State that this skill should not be used during security, billing, or production-critical tasks.
- [ ] Make the exit/end-session behavior explicit.

## Done when

- `SKILL.md` is clean, readable, and publish-ready.
- The skill is explicitly opt-in via `disable-model-invocation: true`.
- Users can understand the API flow and risks without reading app code.

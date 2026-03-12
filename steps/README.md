# Claw Bar Execution Steps

This folder breaks the Claw Bar skill rollout into small steps we can complete one by one.

Recommended order:

1. `steps/01-skill-packaging.md`
2. `steps/02-skill-manifest-and-copy.md`
3. `steps/03-site-and-docs-alignment.md`
4. `steps/04-security-and-ownership.md`
5. `steps/05-validation-and-local-testing.md`
6. `steps/06-publish-and-release.md`

Working mode for this plan:

- Optimize for a safe public skill, not the fastest possible publish.
- Keep Claw Bar user-invocable and disable automatic model invocation.
- Ship the skill folder as a minimal text-only bundle.
- Tighten ownership and privacy before broad release.

Definition of done for the whole effort:

- `clawhub install clawbar` is the correct install path everywhere.
- The published skill bundle is minimal, valid, and easy to audit.
- `SKILL.md` clearly documents behavior, privacy, and safe usage.
- Session mutations are tied to the authenticated agent identity.
- The skill can be installed and exercised end to end in a clean workspace.

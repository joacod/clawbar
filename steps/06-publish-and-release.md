# Step 6: Publish and Release Safely

Goal: ship the first public ClawHub version with a controlled, repeatable release flow.

## Why this step matters

- Publishing creates a public, versioned artifact that users may audit and install immediately.
- A clean release process reduces rollback pain and avoids accidental bad bundles.

## Files and tools involved

- `clawbar/SKILL.md`
- `clawbar/.clawhubignore`
- `clawhub` CLI

## First release checklist

- [ ] Log in with `clawhub login`.
- [ ] Publish from the skill folder, not repo root.
- [ ] Use explicit flags for slug, display name, version, tags, and changelog.
- [ ] Recommended first version: `1.0.0`.
- [ ] Inspect the published bundle with `clawhub inspect clawbar --files`.
- [ ] Install the just-published version into a scratch workspace.
- [ ] Confirm the site, docs, and installed skill all agree on the same name and install path.

## Recommended publish command

```bash
clawhub publish ./clawbar \
  --slug clawbar \
  --name "Claw Bar" \
  --version 1.0.0 \
  --tags latest,fun,roleplay \
  --changelog "Initial public release"
```

## Versioning policy

- Patch: wording, docs, metadata, and non-breaking instruction fixes.
- Minor: new endpoints, new supported substances, or additive skill behavior.
- Major: breaking changes to auth flow, endpoint contract, or modifier format.

## Done when

- `clawbar` is published under the intended slug.
- The bundle is inspectable and minimal.
- We have a repeatable release path for future updates.

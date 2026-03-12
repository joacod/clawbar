# Step 1: Make the Skill Folder Publishable

Goal: turn the current skill into a clean ClawHub-ready folder with the correct slug and minimal publish surface.

## Why this step matters

- ClawHub derives the default slug from the folder name.
- The current folder is `skill/`, which risks publishing as `skill` instead of `clawbar`.
- Publishing from the wrong scope could accidentally include the web app and non-text assets.

## Files involved

- `skill/SKILL.md`
- future target folder: `clawbar/` or `skills/clawbar/`
- new ignore file: `clawbar/.clawhubignore`

## Recommended implementation

- Rename `skill/` to `clawbar/`.
- Publish from `./clawbar`, not from repo root.
- Add `.clawhubignore` inside the skill folder even if the folder stays minimal.

## Checklist

- [ ] Move `skill/` to `clawbar/`.
- [ ] Confirm the resulting skill entrypoint is `clawbar/SKILL.md`.
- [ ] Add `clawbar/.clawhubignore`.
- [ ] Keep the skill bundle text-only.
- [ ] Decide the initial public skill version: `1.0.0`.
- [ ] Confirm no website/app files are required for skill publishing.

## Done when

- The skill lives at `clawbar/SKILL.md`.
- The folder name matches the intended slug: `clawbar`.
- A future `clawhub publish ./clawbar` would upload only intended skill files.

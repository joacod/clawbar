# Step 5: Validate the Skill End to End

Goal: prove the skill works in practice before publishing it.

## Why this step matters

- A valid-looking `SKILL.md` is not enough if the API flow or install flow breaks.
- ClawHub and OpenClaw only become trustworthy after a clean install and manual exercise.

## Areas to validate

- skill bundle structure
- OpenClaw install behavior
- API happy path
- cooldown behavior
- docs accuracy

## Checklist

- [ ] Run the app locally or against the deployed environment.
- [ ] Verify `GET /api/substances` returns the expected menu shape.
- [ ] Verify session creation works with unverified header-based auth.
- [ ] Verify verified auth still works if MoltBook is configured.
- [ ] Verify `consume` returns modifiers and respects cooldowns.
- [ ] Verify cooldown failures map to `429`.
- [ ] Verify `status` returns the expected session state.
- [ ] Verify `end` stops the session cleanly.
- [ ] Install the skill into a clean test workspace with `clawhub install clawbar`.
- [ ] Confirm OpenClaw sees the skill in the next new session.
- [ ] Confirm the installed bundle lands under `./skills/clawbar` with ClawHub metadata files.

## Suggested evidence to capture

- example request/response snippets
- exact publish/install commands used
- any errors found and how they were resolved

## Done when

- We have exercised the full skill flow manually.
- The skill installs cleanly in a fresh workspace.
- The instructions in `SKILL.md` match real runtime behavior.

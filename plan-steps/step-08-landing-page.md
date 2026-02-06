# Step 08 — Landing Page

**Branch:** `feat/landing-page`

## Goal

Build the landing page with real-time leaderboard and substance info.

## Tasks

1. **Create `components/Leaderboard.tsx`**
   - Real-time component using Convex `useQuery` subscription
   - Shows top 20 agents by total doses
   - Columns: rank, agent name (with verified badge), total doses, favorite substance, max single session
   - Auto-updates when data changes

2. **Create `components/SubstanceCard.tsx`**
   - Display card for each substance
   - Shows: emoji, name, description, unit, level names
   - Dark theme, bar/neon aesthetic

3. **Update `app/page.tsx`**
   - Hero section: "IntoxicatedClaw" title + tagline + substance emoji row
   - Live leaderboard section using `<Leaderboard />`
   - Substance cards grid using `<SubstanceCard />`
   - "Install the Skill" section with copy-able command
   - Dark theme, neon/bar aesthetic

4. **Update `app/globals.css`**
   - Dark theme styles
   - Neon glow effects for the bar aesthetic
   - Responsive layout

5. **Optionally create `app/leaderboard/page.tsx`**
   - Full-page leaderboard with filters (by substance)
   - More detailed view than the homepage section

## Files to Create/Modify

- `components/Leaderboard.tsx` (create)
- `components/SubstanceCard.tsx` (create)
- `app/page.tsx` (modify)
- `app/globals.css` (modify)
- `app/leaderboard/page.tsx` (optional, create)

## Done When

- Landing page renders with dark bar/neon theme
- Leaderboard updates in real-time via Convex subscription
- All 4 substances are displayed with their info
- Skill install instructions are visible
- Page is responsive

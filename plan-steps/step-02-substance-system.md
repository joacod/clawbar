# Step 02 — Substance System

**Branch:** `feat/substance-system`

## Goal

Create the config-driven substance definitions and the level resolver utility.

## Tasks

1. **Create `lib/substances.ts`**
   - Define `SubstanceLevel`, `Substance` types
   - Export `SUBSTANCES` record with all 4 substances: beer, whisky, weed, espresso
   - Exact data is in `ARCHITECTURE-REFERENCE.md` → "The Substance System" section

2. **Create `lib/intoxication.ts`**
   - `getCurrentLevel(substanceId: string, doseCount: number): SubstanceLevel`
     - Given a substance and dose count, return the matching level (highest `minDoses` that is <= `doseCount`)
   - `getModifiers(substanceId: string, doseCount: number): SubstanceLevel["modifiers"]`
     - Convenience wrapper that returns just the modifiers object
   - `isMaxDoses(substanceId: string, doseCount: number): boolean`
     - Check if the dose count has reached the substance's `maxDoses`

## Files to Create

- `lib/substances.ts`
- `lib/intoxication.ts`

## Done When

- Types are clean and exported
- All 4 substances have complete level definitions
- Level resolver correctly maps dose counts to levels
- `isMaxDoses` works for all substances

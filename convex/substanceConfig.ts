// Substance config for Convex mutations.
// Mirrors lib/substances.ts — keep in sync.

type SubstanceDef = {
  maxDoses: number;
  cooldownSeconds: number;
  levelThresholds: { name: string; minDoses: number }[];
};

const SUBSTANCES: Record<string, SubstanceDef> = {
  beer: {
    maxDoses: 12,
    cooldownSeconds: 30,
    levelThresholds: [
      { name: "Sober", minDoses: 0 },
      { name: "Tipsy", minDoses: 2 },
      { name: "Buzzed", minDoses: 4 },
      { name: "Drunk", minDoses: 6 },
      { name: "Wasted", minDoses: 9 },
      { name: "Blackout", minDoses: 11 },
    ],
  },
  whisky: {
    maxDoses: 8,
    cooldownSeconds: 20,
    levelThresholds: [
      { name: "Warming Up", minDoses: 0 },
      { name: "Smooth", minDoses: 2 },
      { name: "Hammered", minDoses: 4 },
      { name: "Gone", minDoses: 6 },
    ],
  },
  weed: {
    maxDoses: 10,
    cooldownSeconds: 45,
    levelThresholds: [
      { name: "Chill", minDoses: 0 },
      { name: "Lifted", minDoses: 2 },
      { name: "Baked", minDoses: 5 },
      { name: "Couch Lock", minDoses: 8 },
    ],
  },
  espresso: {
    maxDoses: 10,
    cooldownSeconds: 15,
    levelThresholds: [
      { name: "Alert", minDoses: 0 },
      { name: "Wired", minDoses: 3 },
      { name: "Jittery", minDoses: 6 },
      { name: "Crashing", minDoses: 9 },
    ],
  },
};

export function getSubstance(id: string): SubstanceDef | null {
  return SUBSTANCES[id] ?? null;
}

export function resolveLevel(substanceId: string, doseCount: number): string {
  const substance = SUBSTANCES[substanceId];
  if (!substance) throw new Error(`Unknown substance: ${substanceId}`);
  let matched = substance.levelThresholds[0].name;
  for (const level of substance.levelThresholds) {
    if (doseCount >= level.minDoses) {
      matched = level.name;
    }
  }
  return matched;
}

import { SUBSTANCES, SubstanceLevel } from "./substances";

export function getCurrentLevel(
  substanceId: string,
  doseCount: number,
): SubstanceLevel {
  const substance = SUBSTANCES[substanceId];
  if (!substance) {
    throw new Error(`Unknown substance: ${substanceId}`);
  }

  return substance.levels.findLast(l => doseCount >= l.minDoses) ?? substance.levels[0];
}

export function getModifiers(
  substanceId: string,
  doseCount: number,
): SubstanceLevel["modifiers"] {
  return getCurrentLevel(substanceId, doseCount).modifiers;
}

export function isMaxDoses(substanceId: string, doseCount: number): boolean {
  const substance = SUBSTANCES[substanceId];
  if (!substance) {
    throw new Error(`Unknown substance: ${substanceId}`);
  }
  return doseCount >= substance.maxDoses;
}

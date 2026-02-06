import { NextResponse } from "next/server";
import { SUBSTANCES } from "@/lib/substances";

export async function GET() {
  const substances = Object.values(SUBSTANCES).map((s) => ({
    id: s.id,
    name: s.name,
    emoji: s.emoji,
    unit: s.unit,
    unitPlural: s.unitPlural,
    maxDoses: s.maxDoses,
    cooldownSeconds: s.cooldownSeconds,
    description: s.description,
    levels: s.levels.map((l) => l.name),
  }));

  return NextResponse.json({ substances });
}

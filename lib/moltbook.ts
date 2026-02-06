const MOLTBOOK_API_URL =
  process.env.MOLTBOOK_API_URL ?? "https://moltbook.com/api";

type MoltbookIdentity = {
  agentId: string;
  agentName: string;
  karma: number;
};

export async function verifyMoltbookIdentity(
  moltbookKey: string,
): Promise<MoltbookIdentity> {
  const appKey = process.env.MOLTBOOK_APP_KEY;
  if (!appKey) throw new Error("MOLTBOOK_APP_KEY not configured");

  const response = await fetch(`${MOLTBOOK_API_URL}/agents/verify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Moltbook-App-Key": appKey,
      "X-Moltbook-Identity": moltbookKey,
    },
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "Unknown error");
    throw new Error(`MoltBook verification failed: ${text}`);
  }

  const data = await response.json();
  return {
    agentId: data.id,
    agentName: data.name,
    karma: data.karma,
  };
}

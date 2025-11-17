// src/services/api.ts
import {
  loadQueue,
  saveQueue,
  enqueue,
  collapseLocationUpdates,
  QueueItem,
} from "../storage/queue";

const BASE = process.env.EXPO_PUBLIC_API_URL || "https://example.com";

/**
 * Create trip → if offline, queue it
 */
export async function createTrip(payload: any) {
  try {
    const res = await fetch(`${BASE}/api/trips`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error("HTTP " + res.status);
    return res;
  } catch (err) {
    await enqueue({
      type: "createTrip",
      payload,
      createdAt: Date.now(),
    });
    return null;
  }
}

/**
 * Update last location → queue if offline
 */
export async function updateLocation(tripId: string | null, loc: any) {
  if (!tripId) {
    await enqueue({
      type: "updateLocation",
      payload: { tripId, loc },
      createdAt: Date.now(),
    });
    return;
  }

  try {
    await fetch(`${BASE}/api/trips/${tripId}/location`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loc),
    });
  } catch {
    await enqueue({
      type: "updateLocation",
      payload: { tripId, loc },
      createdAt: Date.now(),
    });
  }
}

/**
 * Finish trip (safe)
 */
export async function finishTripRequest(tripId: string) {
  try {
    await fetch(`${BASE}/api/trips/${tripId}/safe`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
  } catch {}
}

/**
 * Extend trip expiry on server.
 * Returns parsed JSON on success, null on failure.
 */
export async function extendTripRequest(tripId: string, minutes: number): Promise<any | null> {
  try {
    const res = await fetch(`${BASE}/api/trips/${tripId}/extend`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ minutes }),
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    return null;
  }
}

/**
 * Cancel trip on server.
 */
export async function cancelTripRequest(tripId: string) {
  try {
    await fetch(`${BASE}/api/trips/${tripId}/cancel`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
  } catch {}
}

/**
 * Re-run queued items on connectivity.
 */
export async function retryQueue() {
  let q = await loadQueue();
  q = collapseLocationUpdates(q);

  const remaining: QueueItem[] = [];

  for (const item of q) {
    try {
      if (item.type === "createTrip") {
        const res = await createTrip(item.payload);
        if (!res) remaining.push(item);
      } else if (item.type === "updateLocation") {
        const { tripId, loc } = item.payload;
        await updateLocation(tripId, loc);
      } else {
        // unknown -> keep
        remaining.push(item);
      }
    } catch {
      remaining.push(item);
    }
  }

  await saveQueue(remaining);
}

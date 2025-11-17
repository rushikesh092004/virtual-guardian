// src/services/queueProcessor.ts
import { loadQueue, saveQueue, QueueItem } from "../storage/queue";
import { createTrip, updateLocation } from "./api";

/**
 * Process the offline queue in order.
 * Proper type narrowing is used here so TypeScript never collapses to `never`.
 */
export async function processQueue(activeTripId: string | null) {
  const queue = await loadQueue();
  if (queue.length === 0) return;

  const newQueue: QueueItem[] = [];

  for (const item of queue) {
    // 1) CREATE TRIP
    if (item.type === "createTrip") {
      try {
        const resp = await createTrip(item.payload);
        if (!resp) {
          // Still offline → keep in queue
          newQueue.push(item);
          continue;
        }

        const data = await resp.json();
        const realId = data.tripId;

        // Replace offline-created location records with correct tripId
        for (const q of newQueue) {
          if (q.type === "updateLocation" && q.payload.tripId === null) {
            q.payload.tripId = realId;
          }
        }

        continue; // processed successfully
      } catch (err) {
        // Still offline or network error → keep item
        newQueue.push(item);
        continue;
      }
    }

    // 2) UPDATE LOCATION
    if (item.type === "updateLocation") {
      const tid = item.payload.tripId;

      // If tripId not available yet (offline-created), keep in queue
      if (!tid) {
        newQueue.push(item);
        continue;
      }

      try {
        await updateLocation(tid, item.payload.loc);
        // No push → means processed successfully
      } catch {
        // retry later
        newQueue.push(item);
      }

      continue;
    }

    // Any future queue item types can be handled here
    // TypeScript will NOT collapse to `never` now.
  }

  await saveQueue(newQueue);
}

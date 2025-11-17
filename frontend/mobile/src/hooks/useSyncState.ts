// src/hooks/useSyncState.ts
import { useEffect, useState } from "react";
import { loadQueue } from "../storage/queue";
import { useTrip } from "./useTrip";

export function useSyncState() {
  const { trip } = useTrip();
  const [synced, setSynced] = useState(true);

  useEffect(() => {
    // If no active trip, everything is considered "synced"
    if (!trip || trip.status !== "running") {
      setSynced(true);
      return;
    }

    (async () => {
      const queue = await loadQueue();

      const unsynced = queue.some((q) => {
        if (q.type === "createTrip") return true;

        if (q.type === "updateLocation") {
          // use correct access: q.payload.tripId
          return q.payload.tripId === trip.tripId;
        }

        return false;
      });

      setSynced(!unsynced);
    })();
  }, [trip]);

  return synced;
}

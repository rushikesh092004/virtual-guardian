// src/storage/queue.ts
import AsyncStorage from "@react-native-async-storage/async-storage";

export type QueueItem =
  | {
      type: "createTrip";
      payload: any;
      createdAt: number;
    }
  | {
      type: "updateLocation";
      payload: {
        tripId: string | null;
        loc: {
          lat: number;
          lon: number;
          accuracy?: number;
          timestamp: number;
        };
      };
      createdAt: number;
    };

const KEY = "pendingQueue";

export async function loadQueue(): Promise<QueueItem[]> {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export async function saveQueue(list: QueueItem[]) {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(list));
  } catch {}
}

export async function enqueue(item: QueueItem) {
  const q = await loadQueue();
  q.push(item);
  await saveQueue(q);
}

export async function clearQueue() {
  await AsyncStorage.removeItem(KEY);
}

/**
 * Replace many updateLocation entries with only the latest for each trip.
 */
export function collapseLocationUpdates(list: QueueItem[]): QueueItem[] {
  const latestByTrip: Record<string, QueueItem> = {};
  const staticItems: QueueItem[] = [];

  for (const item of list) {
    if (item.type === "updateLocation") {
      const tid = item.payload.tripId ?? "offline-trip";
      latestByTrip[tid] = item;
    } else {
      staticItems.push(item);
    }
  }

  return [...staticItems, ...Object.values(latestByTrip)];
}

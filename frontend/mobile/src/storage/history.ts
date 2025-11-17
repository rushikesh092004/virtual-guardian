import AsyncStorage from "@react-native-async-storage/async-storage";

export type TripHistoryItem = {
  id: string;
  title: string;
  startedAt: number;
  endedAt: number;
  status: "safe" | "cancelled" | "expired";
};

const KEY = "trip_history_v1";

export async function loadHistory(): Promise<TripHistoryItem[]> {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export async function addHistoryItem(item: TripHistoryItem) {
  try {
    const list = await loadHistory();
    list.unshift(item);
    await AsyncStorage.setItem(KEY, JSON.stringify(list));
  } catch {}
}

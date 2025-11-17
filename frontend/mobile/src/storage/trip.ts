import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "activeTrip";

export async function saveTripState(state: any) {
  await AsyncStorage.setItem(KEY, JSON.stringify(state));
}

export async function loadTripState() {
  const data = await AsyncStorage.getItem(KEY);
  return data ? JSON.parse(data) : null;
}

export async function clearTripState() {
  await AsyncStorage.removeItem(KEY);
}

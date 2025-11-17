// src/storage/app.ts
import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "hasOnboarded";

export async function hasOnboarded(): Promise<boolean> {
  try {
    const v = await AsyncStorage.getItem(KEY);
    return v === "true";
  } catch {
    return false;
  }
}

export async function setOnboarded() {
  try {
    await AsyncStorage.setItem(KEY, "true");
  } catch {}
}

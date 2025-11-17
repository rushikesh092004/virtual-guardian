import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "onboardingCompleted";

export async function hasCompletedOnboarding(): Promise<boolean> {
  const value = await AsyncStorage.getItem(KEY);
  return value === "true";
}

export async function setOnboardingCompleted() {
  await AsyncStorage.setItem(KEY, "true");
}

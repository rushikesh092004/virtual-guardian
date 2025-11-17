import { Stack } from "expo-router";

export default function SettingsLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#0B0B0B" },
        headerTintColor: "#fff",
        contentStyle: { backgroundColor: "#000" },
      }}
    />
  );
}

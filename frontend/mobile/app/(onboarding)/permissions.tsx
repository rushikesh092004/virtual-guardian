// app/(onboarding)/permissions.tsx
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";

import { requestLocationPermission } from "../../src/services/location";
import { requestNotificationPermission } from "../../src/services/notifications";
import { setOnboarded } from "../../src/storage/app";

export default function Permissions() {
  const [locDone, setLocDone] = useState(false);
  const [notifDone, setNotifDone] = useState(false);

  async function askLocation() {
    const ok = await requestLocationPermission();
    setLocDone(ok);
    if (!ok) alert("Location permission is required.");
  }

  async function askNotifications() {
    const ok = await requestNotificationPermission();
    setNotifDone(ok);
    if (!ok) alert("Notification permission is required.");
  }

  async function finish() {
    if (!locDone || !notifDone) {
      alert("Please grant all required permissions.");
      return;
    }
    await setOnboarded();
    router.replace("/(public)/start-trip");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Permissions</Text>
      <Text style={styles.sub}>We need permissions to keep you safe.</Text>

      <TouchableOpacity
        style={[styles.btn, locDone && styles.btnDone]}
        onPress={askLocation}
      >
        <Text style={styles.btnText}>
          {locDone ? "✓ Location Granted" : "Grant Location Access"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.btn, notifDone && styles.btnDone]}
        onPress={askNotifications}
      >
        <Text style={styles.btnText}>
          {notifDone ? "✓ Notifications Granted" : "Grant Notification Access"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.finishBtn} onPress={finish}>
        <Text style={styles.finishText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", padding: 30, paddingTop: 100 },
  heading: { color: "#fff", fontSize: 28, fontWeight: "700", marginBottom: 20 },
  sub: { color: "#aaa", fontSize: 16, marginBottom: 50 },
  btn: {
    backgroundColor: "#1e1e1e",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 20,
  },
  btnDone: { backgroundColor: "#2ecc71" },
  btnText: { color: "#fff", fontSize: 16 },
  finishBtn: {
    backgroundColor: "#1e90ff",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 60,
  },
  finishText: { color: "#fff", fontSize: 18, fontWeight: "600" },
});

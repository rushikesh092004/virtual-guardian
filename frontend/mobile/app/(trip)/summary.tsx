// app/(trip)/summary.tsx
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Linking } from "react-native";
import { router } from "expo-router";

import { useTrip } from "../../src/hooks/useTrip";
import SafetyBanner from "../../src/components/SafetyBanner";
import { useOfflineStatus } from "../../src/hooks/useOfflineStatus";
import { getLastKnownLocation } from "../../src/services/location";

export default function Summary() {
  const { trip } = useTrip();
  const { needsBanner } = useOfflineStatus();

  const [lastLoc, setLastLoc] = useState<{
    lat: number;
    lon: number;
    timestamp: number;
  } | null>(null);

  useEffect(() => {
    const loc = getLastKnownLocation();
    if (loc) setLastLoc(loc);
  }, []);

  function openMap() {
    if (!lastLoc) return;
    const url = `https://www.google.com/maps/search/?api=1&query=${lastLoc.lat},${lastLoc.lon}`;
    Linking.openURL(url);
  }

  function formatTime(ts: number | null | undefined) {
    if (!ts) return "Unknown";
    const d = new Date(ts);
    return `${d.toLocaleDateString()}  ${d.toLocaleTimeString()}`;
  }

  function computeDuration() {
    if (!trip?.expiresAt) return null;
    const now = Date.now();
    const ms = trip.expiresAt - now;
    const minutes = Math.ceil(Math.abs(ms) / 60000);
    return `${minutes} min`;
  }

  const statusLabel = (() => {
    if (!trip) return "Unknown";
    if (trip.status === "running") return "Running (unexpected)";
    if (trip.status === "safe") return "Marked Safe";
    if (trip.status === "cancelled") return "Cancelled";
    return "Completed";
  })();

  return (
    <View style={styles.container}>
      <SafetyBanner visible={needsBanner} />

      <Text style={styles.heading}>Trip Summary</Text>

      {!trip ? (
        <Text style={styles.info}>No trip data available.</Text>
      ) : (
        <View style={styles.box}>
          <Text style={styles.label}>Title</Text>
          <Text style={styles.value}>{trip.title}</Text>

          <Text style={styles.label}>Status</Text>
          <Text style={styles.value}>{statusLabel}</Text>

          <Text style={styles.label}>Ended At</Text>
          <Text style={styles.value}>{formatTime(Date.now())}</Text>

          <Text style={styles.label}>Duration</Text>
          <Text style={styles.value}>{computeDuration() ?? "Unknown"}</Text>

          <Text style={styles.label}>Last Known Location</Text>
          {lastLoc ? (
            <TouchableOpacity onPress={openMap}>
              <Text style={[styles.value, styles.link]}>Open in Google Maps</Text>
            </TouchableOpacity>
          ) : (
            <Text style={styles.value}>Unavailable</Text>
          )}
        </View>
      )}

      <TouchableOpacity
        style={styles.homeBtn}
        onPress={() => router.replace("/(public)/start-trip")}
      >
        <Text style={styles.homeText}>Back to Start</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 22,
    paddingTop: 90,
  },
  heading: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "600",
    marginBottom: 26,
  },
  box: {
    backgroundColor: "#111",
    padding: 20,
    borderRadius: 12,
    marginBottom: 40,
  },
  label: {
    color: "#777",
    fontSize: 14,
    marginBottom: 2,
    marginTop: 12,
  },
  value: {
    color: "#fff",
    fontSize: 16,
  },
  link: {
    color: "#1e90ff",
    textDecorationLine: "underline",
  },
  homeBtn: {
    backgroundColor: "#1e90ff",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  homeText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  info: { color: "#888", fontSize: 16 },
});

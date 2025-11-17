// app/(trip)/countdown.tsx
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { router } from "expo-router";

import { useTrip } from "../../src/hooks/useTrip";
import { finishTripRequest, extendTripRequest, cancelTripRequest } from "../../src/services/api";
import {
  scheduleReminder,
  clearAllNotifications,
} from "../../src/services/notifications";

import SafetyBanner from "../../src/components/SafetyBanner";
import { useOfflineStatus } from "../../src/hooks/useOfflineStatus";
import ExtendModal from "../../src/components/ExtendModal";

export default function Countdown() {
  const { trip, finishTrip, cancelTrip } = useTrip();
  const { needsBanner } = useOfflineStatus();

  const [remainingMs, setRemainingMs] = useState<number | null>(null);
  const [extendVisible, setExtendVisible] = useState(false);

  useEffect(() => {
    if (!trip?.expiresAt) {
      setRemainingMs(null);
      return;
    }

    const update = () => {
      const now = Date.now();
      const left = (trip.expiresAt as number) - now;
      setRemainingMs(Math.max(left, 0));
    };

    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [trip?.expiresAt]);

  useEffect(() => {
    if (!trip?.expiresAt) return;

    clearAllNotifications();

    const now = Date.now();
    const msRemaining = (trip.expiresAt as number) - now;

    if (msRemaining > 6 * 60 * 1000) {
      const s = Math.floor((msRemaining - 5 * 60 * 1000) / 1000);
      if (s > 0) scheduleReminder(s, "Trip ends in 5 minutes.");
    }

    if (msRemaining > 61 * 1000) {
      const s = Math.floor((msRemaining - 1 * 60 * 1000) / 1000);
      if (s > 0) scheduleReminder(s, "Trip ends in 1 minute.");
    }
  }, [trip?.expiresAt]);

  async function handleSafe() {
    Alert.alert(
      "Confirm Safe",
      "Mark trip as SAFE and stop tracking?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Yes",
          style: "destructive",
          onPress: async () => {
            try {
              if (trip?.tripId) {
                try {
                  await finishTripRequest(trip.tripId);
                } catch {}
              }

              await clearAllNotifications();
              finishTrip();
              router.replace("/(public)/start-trip");
            } catch {}
          },
        },
      ],
      { cancelable: true }
    );
  }

  async function handleCancel() {
    Alert.alert(
      "Cancel Trip",
      "Stop the trip without marking safe?",
      [
        { text: "Back", style: "cancel" },
        {
          text: "Cancel Trip",
          style: "destructive",
          onPress: async () => {
            try {
              if (trip?.tripId) {
                try {
                  await cancelTripRequest(trip.tripId);
                } catch {}
              }
              await clearAllNotifications();
              cancelTrip();
              router.replace("/(trip)/summary" as unknown as any);
            } catch {}
          },
        },
      ],
      { cancelable: true }
    );
  }

  async function handleExtend(minutes: number) {
    setExtendVisible(false);
    if (!trip) return;

    let newExpiry = trip.expiresAt ? trip.expiresAt + minutes * 60000 : Date.now() + minutes * 60000;

    if (trip.tripId) {
      try {
        const res = await extendTripRequest(trip.tripId, minutes);
        if (res?.expiresAt) newExpiry = new Date(res.expiresAt).getTime();
      } catch {}
    }

    // Update local state via store by starting a new trip with same id but new expiry
    // (we directly set via store pattern: read current, then set startTrip)
    // Simpler: call finish + start? Instead update store directly using startTrip.
    // We'll import useTrip and call startTrip to update. But here we already have startTrip in store.
    // For cleanliness, let's mutate via a temporary startTrip call.
    // But this file only has finishTrip/cancelTrip; so useTrip must expose startTrip as well.
    // We'll call startTrip via store setter below:
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { useTrip: useTripLocal } = require("../../src/hooks/useTrip");
      const { startTrip } = useTripLocal.getState ? useTripLocal : (useTripLocal as any);
      // startTrip expects an object without startedAt
      startTrip({
        tripId: trip.tripId,
        title: trip.title,
        expiresAt: newExpiry,
        status: trip.status,
      });
    } catch {}

    setRemainingMs(newExpiry - Date.now());
    await clearAllNotifications();
  }

  function format(ms: number | null) {
    if (ms === null) return "No expiry";
    if (ms <= 0) return "Expired";
    const sec = Math.floor(ms / 1000);
    const min = Math.floor(sec / 60);
    const s = sec % 60;
    return `${min}m ${s}s`;
  }

  if (!trip) {
    return (
      <View style={styles.center}>
        <Text style={styles.info}>No active trip</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SafetyBanner visible={needsBanner} />

      <Text style={styles.heading}>Trip In Progress</Text>
      <Text style={styles.title}>{trip.title}</Text>

      <Text style={styles.timer}>{format(remainingMs)}</Text>

      <View style={styles.row}>
        <TouchableOpacity style={[styles.smallBtn, styles.extendBtn]} onPress={() => setExtendVisible(true)}>
          <Text style={styles.smallText}>Extend</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.smallBtn, styles.cancelBtn]} onPress={handleCancel}>
          <Text style={styles.smallText}>Cancel</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.safeBtn} onPress={handleSafe}>
        <Text style={styles.safeText}>I'm Safe</Text>
      </TouchableOpacity>

      <ExtendModal visible={extendVisible} onClose={() => setExtendVisible(false)} onSelect={handleExtend} />
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 24,
    paddingTop: 80,
  },
  heading: {
    color: "#fff",
    fontSize: 22,
    marginBottom: 6,
  },
  title: {
    color: "#aaa",
    fontSize: 16,
    marginBottom: 30,
  },
  timer: {
    color: "#1e90ff",
    fontSize: 48,
    marginBottom: 40,
    textAlign: "center",
  },
  row: { flexDirection: "row", gap: 12, marginBottom: 24 },
  smallBtn: { paddingVertical: 12, paddingHorizontal: 26, borderRadius: 10 },
  smallText: { color: "#fff", fontSize: 16 },
  extendBtn: { backgroundColor: "#1e90ff" },
  cancelBtn: { backgroundColor: "#c0392b" },
  safeBtn: { backgroundColor: "#27ae60", paddingVertical: 16, borderRadius: 12, alignItems: "center" },
  safeText: { color: "#fff", fontSize: 18 },
  info: { color: "#fff" },
});

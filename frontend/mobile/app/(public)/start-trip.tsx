// app/(public)/start-trip.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { router } from "expo-router";

import {
  requestLocationPermission,
  getCurrentLocation,
  startAdaptiveLocationUpdates,
} from "../../src/services/location";

import { createTrip } from "../../src/services/api";
import { useTrip } from "../../src/hooks/useTrip";
import { loadContacts } from "../../src/storage/contacts";

import SafetyBanner from "../../src/components/SafetyBanner";
import { useOfflineStatus } from "../../src/hooks/useOfflineStatus";

export default function StartTrip() {
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("15");
  const [loading, setLoading] = useState(false);

  const { startTrip } = useTrip();
  const { needsBanner } = useOfflineStatus();

  async function handleStart() {
    if (!title.trim()) {
      alert("Please enter a trip title");
      return;
    }

    setLoading(true);

    try {
      const granted = await requestLocationPermission();
      if (!granted) {
        alert("Location permission is required.");
        setLoading(false);
        return;
      }

      const initialLocation = await getCurrentLocation();
      const contacts = await loadContacts();

      const payload = {
        title,
        durationMinutes: Number(duration),
        contacts: contacts.map((c) => ({ type: c.type, value: c.value })),
        initialLocation,
      };

      const response = await createTrip(payload);

      if (!response) {
        alert("Trip created offline. Will sync automatically when internet is available.");

        const expires = Date.now() + Number(duration) * 60000;

        startTrip({
          tripId: null,
          title,
          expiresAt: expires,
          status: "running",
        });

        startAdaptiveLocationUpdates({
          tripId: null,
        });

        router.push("/(trip)/countdown");
        setLoading(false);
        return;
      }

      const data = await response.json();

      startTrip({
        tripId: data.tripId,
        title,
        expiresAt: new Date(data.expiresAt).getTime(),
        status: "running",
      });

      startAdaptiveLocationUpdates({
        tripId: data.tripId,
      });

      router.push("/(trip)/countdown");
    } catch (err) {
      console.error("StartTrip error:", err);
      alert("Unexpected error occurred while starting trip.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <SafetyBanner visible={needsBanner} />

      <Text style={styles.heading}>Start a Trip</Text>

      <TextInput
        style={styles.input}
        placeholder="Trip title"
        placeholderTextColor="#666"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={styles.input}
        placeholder="Duration (minutes)"
        placeholderTextColor="#666"
        keyboardType="numeric"
        value={duration}
        onChangeText={setDuration}
      />

      <TouchableOpacity style={styles.btn} onPress={handleStart} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.btnText}>Begin Trip</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/(public)/contacts" as unknown as any)}>
        <Text style={{ color: "#1e90ff", marginTop: 20 }}>Manage Contacts</Text>
      </TouchableOpacity>

    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 22, paddingTop: 90, backgroundColor: "#000" },
  heading: { color: "#fff", fontSize: 28, marginBottom: 20, fontWeight: "600" },
  input: {
    backgroundColor: "#141414",
    color: "#fff",
    padding: 14,
    borderRadius: 12,
    marginBottom: 18,
    fontSize: 16,
  },
  btn: {
    backgroundColor: "#1e90ff",
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 20,
    alignItems: "center",
  },
  btnText: { color: "#fff", fontSize: 18, fontWeight: "600" },
});

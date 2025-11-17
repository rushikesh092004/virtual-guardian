// app/(public)/start-trip.tsx
import { useState } from "react";
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

export default function StartTrip() {
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("15");
  const [loading, setLoading] = useState(false);

  const { startTrip } = useTrip();

  async function handleStart() {
    if (!title.trim()) {
      alert("Please enter a trip title.");
      return;
    }

    setLoading(true);

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

    try {
      const response = await createTrip(payload);

      if (!response) {
        alert("Trip created offline. Will sync automatically.");
        const expires = Date.now() + Number(duration) * 60000;

        startTrip({
          tripId: null,
          title,
          expiresAt: expires,
          status: "running",
        });

        router.replace("/(trip)/countdown");
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

      router.replace("/(trip)/countdown");
    } catch (err) {
      console.error(err);
      alert("Unexpected error occurred.");
    }

    setLoading(false);
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
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

      <TouchableOpacity
        style={styles.btn}
        onPress={handleStart}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.btnText}>Begin Trip</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.contactsBtn}
        onPress={() => router.push("/(public)/start-trip")}
      >
        <Text style={styles.contactsText}>Manage Emergency Contacts</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", padding: 22, paddingTop: 90 },
  heading: {
    color: "#fff",
    fontSize: 28,
    marginBottom: 20,
    fontWeight: "600",
  },
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
    alignItems: "center",
    marginTop: 10,
  },
  btnText: { color: "#fff", fontSize: 18, fontWeight: "600" },
  contactsBtn: { marginTop: 30 },
  contactsText: { color: "#1e90ff", fontSize: 16 },
});

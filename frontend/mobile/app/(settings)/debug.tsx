import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { loadTripState } from "../../src/storage/trip";
import { loadQueue } from "../../src/storage/queue";
import { getLastKnownLocation } from "../../src/services/location";

import NetInfo from "@react-native-community/netinfo";
import * as BackgroundFetch from "expo-background-fetch";
import * as Location from "expo-location";
import Constants from "expo-constants";

export default function DebugScreen() {
  const [trip, setTrip] = useState<any>(null);
  const [queue, setQueue] = useState<any[]>([]);
  const [network, setNetwork] = useState<any>(null);
  const [backgroundStatus, setBackgroundStatus] =
    useState<string>("unknown");
  const [locationPerm, setLocationPerm] = useState<string>("unknown");
  const [lastLoc, setLastLoc] = useState<any>(null);

  async function refresh() {
    const t = await loadTripState();
    setTrip(t);

    const q = await loadQueue();
    setQueue(q);

    const n = await NetInfo.fetch();
    setNetwork(n);

    const status = await BackgroundFetch.getStatusAsync();
    setBackgroundStatus(
      status === BackgroundFetch.BackgroundFetchStatus.Available
        ? "available"
        : status === BackgroundFetch.BackgroundFetchStatus.Denied
        ? "denied"
        : "restricted"
    );

    const fg = await Location.getForegroundPermissionsAsync();
    setLocationPerm(fg.status);

    setLastLoc(getLastKnownLocation());
  }

  useEffect(() => {
    refresh();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Debug Panel</Text>

      <TouchableOpacity style={styles.refreshBtn} onPress={refresh}>
        <Text style={styles.refreshText}>Refresh</Text>
      </TouchableOpacity>

      {/* Trip State */}
      <Text style={styles.sectionTitle}>Current Trip</Text>
      {trip ? (
        <View style={styles.box}>
          <Text style={styles.text}>Trip ID: {trip.tripId || "null"}</Text>
          <Text style={styles.text}>Title: {trip.title}</Text>
          <Text style={styles.text}>Status: {trip.status}</Text>
          <Text style={styles.text}>
            Expires At:{" "}
            {trip.expiresAt
              ? new Date(trip.expiresAt).toLocaleString()
              : "null"}
          </Text>
        </View>
      ) : (
        <Text style={styles.none}>No active trip</Text>
      )}

      {/* Last Known Location */}
      <Text style={styles.sectionTitle}>Last Known GPS</Text>
      {lastLoc ? (
        <View style={styles.box}>
          <Text style={styles.text}>Lat: {lastLoc.lat}</Text>
          <Text style={styles.text}>Lon: {lastLoc.lon}</Text>
          <Text style={styles.text}>Acc: {lastLoc.accuracy}</Text>
          <Text style={styles.text}>
            Time: {new Date(lastLoc.timestamp).toLocaleTimeString()}
          </Text>
        </View>
      ) : (
        <Text style={styles.none}>No location recorded</Text>
      )}

      {/* Queue */}
      <Text style={styles.sectionTitle}>Offline Queue</Text>
      {queue.length > 0 ? (
        <View style={styles.box}>
          {queue.map((item, index) => (
            <Text key={index} style={styles.text}>
              • [{item.type}] created:{" "}
              {new Date(item.createdAt).toLocaleTimeString()}
            </Text>
          ))}
        </View>
      ) : (
        <Text style={styles.none}>Queue empty</Text>
      )}

      {/* Network */}
      <Text style={styles.sectionTitle}>Network</Text>
      <View style={styles.box}>
        <Text style={styles.text}>
          Connected: {network?.isConnected ? "Yes" : "No"}
        </Text>
        <Text style={styles.text}>
          Type: {network?.type ?? "unknown"}
        </Text>
      </View>

      {/* Background */}
      <Text style={styles.sectionTitle}>Background Task</Text>
      <View style={styles.box}>
        <Text style={styles.text}>Fetch: {backgroundStatus}</Text>
      </View>

      {/* Location Permission */}
      <Text style={styles.sectionTitle}>Permissions</Text>
      <View style={styles.box}>
        <Text style={styles.text}>Location: {locationPerm}</Text>
      </View>

      {/* Device Info */}
<Text style={styles.sectionTitle}>Device Info</Text>
<View style={styles.box}>
  <Text style={styles.text}>
    App Version: {String(Constants.expoConfig?.version ?? "unknown")}
  </Text>
  <Text style={styles.text}>
    Runtime: {String(Constants.expoConfig?.runtimeVersion ?? "unknown")}
  </Text>
  <Text style={styles.text}>
    OS: {Constants.platform?.ios ? "iOS" : Constants.platform?.android ? "Android" : "Unknown"}
  </Text>
</View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: "#000", padding: 18, flex: 1 },
  heading: { color: "#fff", fontSize: 28, marginBottom: 10 },
  sectionTitle: { color: "#1e90ff", fontSize: 18, marginTop: 25 },
  box: {
    backgroundColor: "#111",
    borderRadius: 10,
    padding: 12,
    marginTop: 10,
    borderColor: "#222",
    borderWidth: 1,
  },
  text: { color: "#ccc", marginBottom: 4 },
  none: { color: "#555", marginTop: 10 },

  refreshBtn: {
    backgroundColor: "#222",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  refreshText: { color: "#fff", fontSize: 16 },
});

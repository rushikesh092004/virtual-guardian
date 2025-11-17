import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function TripDetails() {
  const params = useLocalSearchParams();
  const trip = JSON.parse(params.trip as string);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Trip Details</Text>

      <Text style={styles.label}>Title</Text>
      <Text style={styles.value}>{trip.title}</Text>

      <Text style={styles.label}>Status</Text>
      <Text style={styles.value}>{trip.status}</Text>

      <Text style={styles.label}>Started At</Text>
      <Text style={styles.value}>{new Date(trip.startedAt).toLocaleString()}</Text>

      <Text style={styles.label}>Expires At</Text>
      <Text style={styles.value}>
        {trip.expiresAt ? new Date(trip.expiresAt).toLocaleString() : "N/A"}
      </Text>

      {trip.lastLocation && (
        <>
          <Text style={styles.label}>Last Known Location</Text>
          <Text style={styles.value}>
            {trip.lastLocation.lat}, {trip.lastLocation.lon}
          </Text>
        </>
      )}

      {trip.contacts && (
        <>
          <Text style={styles.label}>Contacts</Text>
          {trip.contacts.map((c: any, i: number) => (
            <Text key={i} style={styles.value}>
              {c.type}: {c.value}
            </Text>
          ))}
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", padding: 20 },
  heading: { color: "#fff", fontSize: 24, marginBottom: 20 },
  label: { color: "#999", marginTop: 15, fontSize: 13 },
  value: { color: "#eee", fontSize: 16, marginTop: 2 },
});

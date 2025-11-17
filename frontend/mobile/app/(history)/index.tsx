import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { router } from "expo-router";

import { getTripHistory } from "../../src/services/api";

export default function HistoryScreen() {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const data = await getTripHistory();
      if (data) setHistory(data);
      setLoading(false);
    })();
  }, []);

  function openTrip(t: any) {
    router.push({
      pathname: "/(history)/tripDetails",
      params: { trip: JSON.stringify(t) },
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Trip History</Text>

      {loading ? (
        <Text style={styles.loading}>Loading...</Text>
      ) : history.length === 0 ? (
        <Text style={styles.empty}>No past trips</Text>
      ) : (
        <FlatList
          data={history}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => openTrip(item)}
            >
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.status}>
                {item.status.toUpperCase()}
              </Text>
              {item.lastLocation && (
                <Text style={styles.location}>
                  {item.lastLocation.lat.toFixed(4)},{" "}
                  {item.lastLocation.lon.toFixed(4)}
                </Text>
              )}
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", padding: 18, paddingTop: 65 },
  heading: { color: "#fff", fontSize: 26, marginBottom: 20 },
  loading: { color: "#999", fontSize: 16, marginTop: 20 },
  empty: { color: "#555", fontSize: 16, marginTop: 20 },

  card: {
    backgroundColor: "#111",
    padding: 16,
    borderRadius: 14,
    marginBottom: 14,
    borderColor: "#222",
    borderWidth: 1,
  },
  title: { color: "#fff", fontSize: 18, marginBottom: 4 },
  status: { color: "#1e90ff", fontSize: 14 },
  location: { color: "#aaa", fontSize: 12, marginTop: 6 },
});

import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";

export default function SettingsHome() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Settings</Text>

      {/* Link to Contacts */}
      <TouchableOpacity
        style={styles.item}
        onPress={() => router.push("/(settings)/contacts")}
      >
        <Text style={styles.itemText}>Emergency Contacts</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.item}
        onPress={() => router.push("/(history)")}
        >
          <Text style={styles.itemText}>Trip History</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.item}
        onPress={() => router.push("/(settings)/debug")}
        >
        <Text style={styles.itemText}>Debug Tools</Text>
      </TouchableOpacity>



      {/* Add more settings later */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  heading: { color: "#fff", fontSize: 26, marginBottom: 20 },

  item: {
    paddingVertical: 16,
    borderBottomColor: "#333",
    borderBottomWidth: 1,
  },

  itemText: {
    color: "#1e90ff",
    fontSize: 18,
  },
});

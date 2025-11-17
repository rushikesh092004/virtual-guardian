import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Link } from "expo-router";

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Virtual Guardian</Text>

      <Link href="/(public)/start-trip" asChild>
        <TouchableOpacity style={styles.primaryBtn}>
          <Text style={styles.btnText}>Start Trip</Text>
        </TouchableOpacity>
      </Link>

      <Link href="/(settings)" asChild>
        <TouchableOpacity style={styles.secondaryBtn}>
          <Text style={styles.smallText}>Settings</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 32, color: "#fff", marginBottom: 40, fontWeight: "600" },
  primaryBtn: {
    backgroundColor: "#1e90ff",
    paddingHorizontal: 40,
    paddingVertical: 18,
    borderRadius: 12,
  },
  btnText: { color: "#fff", fontSize: 20, fontWeight: "600" },
  secondaryBtn: { marginTop: 20 },
  smallText: { color: "#8A8A8A", fontSize: 16 },
});

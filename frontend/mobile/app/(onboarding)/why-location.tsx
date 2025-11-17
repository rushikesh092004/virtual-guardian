import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";

export default function WhyLocationScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Why Location?</Text>
      <Text style={styles.subtitle}>
        Your location helps us automate safety alerts if you don’t check in.
      </Text>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => router.push("/(onboarding)/permissions")}
      >
        <Text style={styles.btnText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", padding: 24, justifyContent: "center" },
  title: { color: "#fff", fontSize: 28, marginBottom: 20 },
  subtitle: { color: "#aaa", fontSize: 16, marginBottom: 40 },
  btn: { backgroundColor: "#1e90ff", padding: 15, borderRadius: 12 },
  btnText: { color: "#fff", fontSize: 18, textAlign: "center" },
});

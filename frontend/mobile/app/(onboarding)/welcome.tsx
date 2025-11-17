// app/(onboarding)/welcome.tsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { router } from "expo-router";

export default function Welcome() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Virtual Guardian</Text>
      <Text style={styles.subtitle}>
        Your passive trip safety assistant.  
        Stay protected even when you cannot reach your phone.
      </Text>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => router.push("/(onboarding)/permissions")}
      >
        <Text style={styles.btnText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 30,
    paddingTop: 100,
  },
  title: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "left",
  },
  subtitle: {
    color: "#aaa",
    fontSize: 18,
    lineHeight: 24,
    marginBottom: 60,
  },
  btn: {
    backgroundColor: "#1e90ff",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});

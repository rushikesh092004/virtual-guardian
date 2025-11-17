// app/(trip)/modal.tsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { router } from "expo-router";

export default function TripModal() {
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.title}>Trip Info</Text>
        <Text style={styles.text}>
          This modal screen can show additional trip information,
          debug data, or upcoming features.
        </Text>

        <TouchableOpacity
          style={styles.btn}
          onPress={() => router.back()}
        >
          <Text style={styles.btnText}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  box: {
    width: "100%",
    backgroundColor: "#111",
    padding: 20,
    borderRadius: 12,
  },
  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 12,
  },
  text: {
    color: "#bbb",
    fontSize: 16,
    marginBottom: 20,
  },
  btn: {
    backgroundColor: "#1e90ff",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

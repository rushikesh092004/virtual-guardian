// src/components/SafetyBanner.tsx
import { View, Text, StyleSheet } from "react-native";

type Props = {
  visible: boolean;
  message?: string;
};

export default function SafetyBanner({ visible, message }: Props) {
  if (!visible) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {message ?? "Trip is not synced — alerts will NOT work until online."}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#d63031",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginBottom: 12,
  },
  text: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
});

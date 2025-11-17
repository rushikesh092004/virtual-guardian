import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";

type Props = {
  visible: boolean;
  onClose: () => void;
  onSelect: (min: number) => void;
};

export default function ExtendModal({ visible, onClose, onSelect }: Props) {
  const presets = [5, 10, 15, 20];

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.title}>Extend Trip</Text>

          {presets.map((p) => (
            <TouchableOpacity
              key={p}
              style={styles.option}
              onPress={() => onSelect(p)}
            >
              <Text style={styles.optionText}>+{p} minutes</Text>
            </TouchableOpacity>
          ))}

          <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
            <Text style={styles.cancelText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#111",
    padding: 20,
    borderRadius: 12,
    width: "80%",
  },
  title: { color: "#fff", fontSize: 20, marginBottom: 16, textAlign: "center" },
  option: {
    backgroundColor: "#1e90ff",
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  optionText: { color: "#fff", fontSize: 16 },
  cancelBtn: { marginTop: 12, padding: 10, alignItems: "center" },
  cancelText: { color: "#aaa", fontSize: 14 },
});

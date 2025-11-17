import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  Modal,
} from "react-native";

import { useContacts } from "../../src/hooks/useContacts";

export default function ContactsScreen() {
  const { contacts, addContact, removeContact } = useContacts();

  const [modalVisible, setModalVisible] = useState(false);
  const [type, setType] = useState<"sms" | "email">("sms");
  const [value, setValue] = useState("");

  async function handleAdd() {
    if (!value.trim()) {
      alert("Enter a valid contact");
      return;
    }
    await addContact(type, value.trim());
    setModalVisible(false);
    setValue("");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Emergency Contacts</Text>

      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={{ color: "#666", marginTop: 20 }}>
            No contacts added yet
          </Text>
        }
        renderItem={({ item }) => (
          <View style={styles.contactRow}>
            <Text style={styles.contactText}>
              {item.type.toUpperCase()} • {item.value}
            </Text>

            <TouchableOpacity onPress={() => removeContact(item.id)}>
              <Text style={styles.remove}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addBtnText}>Add Contact</Text>
      </TouchableOpacity>

      {/* ADD CONTACT MODAL */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBg}>
          <View style={styles.modalCard}>
            <Text style={styles.modalHeading}>Add Contact</Text>

            <View style={styles.typeRow}>
              <TouchableOpacity
                onPress={() => setType("sms")}
                style={[
                  styles.typeBtn,
                  type === "sms" && styles.typeBtnActive,
                ]}
              >
                <Text style={styles.typeText}>SMS</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setType("email")}
                style={[
                  styles.typeBtn,
                  type === "email" && styles.typeBtnActive,
                ]}
              >
                <Text style={styles.typeText}>Email</Text>
              </TouchableOpacity>
            </View>

            <TextInput
              value={value}
              onChangeText={setValue}
              placeholder={
                type === "sms" ? "Phone number (with country code)" : "Email"
              }
              placeholderTextColor="#777"
              style={styles.input}
            />

            <TouchableOpacity style={styles.addFinalBtn} onPress={handleAdd}>
              <Text style={styles.addFinalText}>Add</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  heading: { color: "#fff", fontSize: 24, marginBottom: 20 },
  contactRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomColor: "#222",
    borderBottomWidth: 1,
  },
  contactText: { color: "#ccc", fontSize: 16 },
  remove: { color: "#e74c3c", fontSize: 14 },

  addBtn: {
    backgroundColor: "#3498db",
    padding: 14,
    borderRadius: 12,
    marginTop: 20,
    alignItems: "center",
  },
  addBtnText: { color: "#fff", fontSize: 16 },

  modalBg: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    padding: 20,
  },
  modalCard: {
    backgroundColor: "#111",
    borderRadius: 14,
    padding: 20,
  },
  modalHeading: { color: "#fff", fontSize: 20, marginBottom: 20 },

  typeRow: { flexDirection: "row", marginBottom: 12 },
  typeBtn: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 8,
    backgroundColor: "#333",
    marginRight: 10,
  },
  typeBtnActive: { backgroundColor: "#1e90ff" },
  typeText: { color: "#fff" },

  input: {
    backgroundColor: "#222",
    color: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  addFinalBtn: {
    backgroundColor: "#27ae60",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  addFinalText: { color: "#fff" },
  cancelBtn: { marginTop: 12, alignItems: "center" },
  cancelText: { color: "#999" },
});

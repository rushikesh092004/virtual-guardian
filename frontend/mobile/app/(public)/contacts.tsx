// app/(public)/contacts.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { router } from "expo-router";

import {
  loadContacts,
  addContact,
  removeContact,
  Contact,
} from "../../src/storage/contacts";

export default function ContactsScreen() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [value, setValue] = useState("");
  const [type, setType] = useState<"sms" | "email">("sms");

  useEffect(() => {
    async function load() {
      setContacts(await loadContacts());
    }
    load();
  }, []);

  async function handleAdd() {
    if (!value.trim()) {
      alert("Enter a valid phone number or email.");
      return;
    }

    if (type === "sms") {
      const phoneRegex = /^[0-9+\-\s]{6,15}$/;
      if (!phoneRegex.test(value)) {
        alert("Invalid phone number.");
        return;
      }
    }

    if (type === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        alert("Invalid email.");
        return;
      }
    }

    const newContact: Contact = {
      id: Date.now().toString(),
      type,
      value: value.trim(),
    };

    await addContact(newContact);
    setContacts(await loadContacts());
    setValue("");
  }

  function confirmDelete(id: string) {
    Alert.alert("Remove Contact", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          await removeContact(id);
          setContacts(await loadContacts());
        },
      },
    ]);
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Text style={styles.heading}>Emergency Contacts</Text>

      <View style={styles.typeRow}>
        <TouchableOpacity
          style={[styles.typeBtn, type === "sms" && styles.typeActive]}
          onPress={() => setType("sms")}
        >
          <Text style={styles.typeText}>SMS</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.typeBtn, type === "email" && styles.typeActive]}
          onPress={() => setType("email")}
        >
          <Text style={styles.typeText}>Email</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        placeholder={type === "sms" ? "Phone number" : "Email address"}
        placeholderTextColor="#666"
        value={value}
        onChangeText={setValue}
      />

      <TouchableOpacity style={styles.addBtn} onPress={handleAdd}>
        <Text style={styles.addText}>Add Contact</Text>
      </TouchableOpacity>

      <Text style={styles.listHeading}>Saved Contacts</Text>

      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.contactCard}>
            <Text style={styles.contactText}>
              {item.type.toUpperCase()}: {item.value}
            </Text>

            <TouchableOpacity
              style={styles.deleteBtn}
              onPress={() => confirmDelete(item.id)}
            >
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity
        style={styles.homeBtn}
        onPress={() => router.replace("/(public)/start-trip")}
      >
        <Text style={styles.homeText}>Back to Start</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", padding: 22, paddingTop: 90 },
  heading: {
    color: "#fff",
    fontSize: 28,
    marginBottom: 20,
    fontWeight: "600",
  },

  typeRow: { flexDirection: "row", gap: 10, marginBottom: 20 },
  typeBtn: {
    flex: 1,
    backgroundColor: "#1a1a1a",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  typeActive: { backgroundColor: "#1e90ff" },
  typeText: { color: "#fff", fontSize: 16 },

  input: {
    backgroundColor: "#141414",
    color: "#fff",
    borderRadius: 12,
    padding: 14,
    marginBottom: 18,
    fontSize: 16,
  },

  addBtn: {
    backgroundColor: "#2ecc71",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 30,
  },
  addText: { color: "#fff", fontSize: 17, fontWeight: "600" },

  listHeading: { color: "#888", fontSize: 16, marginBottom: 10 },

  contactCard: {
    backgroundColor: "#111",
    padding: 16,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  contactText: { color: "#fff", fontSize: 16 },
  deleteBtn: {},
  deleteText: { color: "#e74c3c", fontSize: 15 },

  homeBtn: {
    backgroundColor: "#1e90ff",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 30,
  },
  homeText: { color: "#fff", fontSize: 18, fontWeight: "600" },
});

// src/storage/contacts.ts
import AsyncStorage from "@react-native-async-storage/async-storage";

export type Contact = {
  id: string;
  type: "sms" | "email";
  value: string;
};

const KEY = "contacts";

export async function loadContacts(): Promise<Contact[]> {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Contact[];
  } catch {
    return [];
  }
}

export async function saveContacts(list: Contact[]) {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(list));
  } catch (err) {
    console.error("Failed to save contacts", err);
  }
}

export async function addContact(c: Contact) {
  const list = await loadContacts();
  list.push(c);
  await saveContacts(list);
}

export async function removeContact(id: string) {
  const list = await loadContacts();
  const filtered = list.filter((x) => x.id !== id);
  await saveContacts(filtered);
}

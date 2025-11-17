import { useEffect, useState } from "react";
import { loadContacts, saveContacts, Contact } from "../storage/contacts";
import { v4 as uuid } from "uuid";

export function useContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    loadContacts().then(setContacts);
  }, []);

  async function addContact(type: "sms" | "email", value: string) {
    const newContact = {
      id: uuid(),
      type,
      value,
    };
    const updated = [...contacts, newContact];
    setContacts(updated);
    await saveContacts(updated);
  }

  async function removeContact(id: string) {
    const updated = contacts.filter((c) => c.id !== id);
    setContacts(updated);
    await saveContacts(updated);
  }

  return { contacts, addContact, removeContact };
}

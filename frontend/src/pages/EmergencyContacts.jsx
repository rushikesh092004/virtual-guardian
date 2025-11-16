import React, { useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/emergency.css";
import { useEffect } from "react";

export default function EmergencyContacts() {
    useEffect(() => {
  const timer = setTimeout(() => {
    window.location.href = "/history";
  }, 2000);
  return () => clearTimeout(timer);
}, []);

  const [contacts, setContacts] = useState([
    { name: "Rahul Patel", phone: "+91 98765 43210" },
    { name: "Priya Sharma", phone: "+91 98765 11223" }
  ]);

  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");

  const addContact = () => {
    if (newName.trim() === "" || newPhone.trim() === "") return;
    setContacts([...contacts, { name: newName, phone: newPhone }]);
    setNewName("");
    setNewPhone("");
  };

  const removeContact = (index) => {
    const updated = contacts.filter((_, i) => i !== index);
    setContacts(updated);
  };

  return (
    <>
      <Navbar />

      <div className="em-wrapper">
        <div className="em-card">
          <h2>Emergency Contacts</h2>

          {/* Add Contact Section */}
          <div className="em-add-section">
            <h3>Add New Contact</h3>

            <input
              type="text"
              placeholder="Enter Name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />

            <input
              type="text"
              placeholder="Enter Phone Number"
              value={newPhone}
              onChange={(e) => setNewPhone(e.target.value)}
            />

            <button className="btn-add" onClick={addContact}>
              Add Contact
            </button>
          </div>

          <hr />

          {/* Contact List */}
          <h3>Saved Contacts</h3>

          <div className="em-list">
            {contacts.map((c, i) => (
              <div className="em-item" key={i}>
                <div>
                  <p className="em-name">{c.name}</p>
                  <p className="em-phone">{c.phone}</p>
                </div>

                <button className="btn-delete" onClick={() => removeContact(i)}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

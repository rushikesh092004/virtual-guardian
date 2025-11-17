import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import "../styles/emergency.css";

export default function EmergencyContacts() {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [editingIndex, setEditingIndex] = useState(null);

  // Load saved contacts from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("emergencyContacts")) || [];
    setContacts(saved);
  }, []);

  // Save contacts to localStorage
  useEffect(() => {
    localStorage.setItem("emergencyContacts", JSON.stringify(contacts));
  }, [contacts]);

  const handleAddContact = (e) => {
    e.preventDefault();
    if (!name || !phone) return alert("Please fill all fields");

    if (editingIndex !== null) {
      // edit mode
      const updated = [...contacts];
      updated[editingIndex] = { name, phone };
      setContacts(updated);
      setEditingIndex(null);
    } else {
      // add mode
      setContacts([...contacts, { name, phone }]);
    }

    setName("");
    setPhone("");
  };

  const handleDelete = (index) => {
    if (window.confirm("Delete this contact?")) {
      const updated = contacts.filter((_, i) => i !== index);
      setContacts(updated);
    }
  };

  const handleEdit = (index) => {
    const contact = contacts[index];
    setName(contact.name);
    setPhone(contact.phone);
    setEditingIndex(index);
  };

  return (
    <>
      <Navbar />
      <div className="em-wrapper">
        <div className="em-card">
          <h2 className="em-title">Emergency Contacts</h2>

          {/* ADD / EDIT FORM */}
          <form onSubmit={handleAddContact} className="em-form">
            <input
              type="text"
              placeholder="Contact Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />

            <button className="em-add-btn" type="submit">
              {editingIndex !== null ? "Update Contact" : "Add Contact"}
            </button>
          </form>

          <hr className="divider" />

          {/* CONTACT LIST */}
          <div className="em-list">
            {contacts.length === 0 ? (
              <p className="no-contact">No emergency contacts added yet.</p>
            ) : (
              contacts.map((contact, index) => (
                <div className="em-item" key={index}>
                  <div className="em-info">
                    <h3>{contact.name}</h3>
                    <p>{contact.phone}</p>
                  </div>

                  <div className="em-actions">
                    <button
                      className="btn-edit"
                      onClick={() => handleEdit(index)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(index)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}

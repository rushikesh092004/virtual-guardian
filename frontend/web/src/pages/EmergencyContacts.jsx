import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import "../styles/emergency.css";
import { useNavigate } from "react-router-dom";

export default function EmergencyContacts() {
  const navigate = useNavigate();

  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  // Load saved contacts on mount
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("emergencyContacts")) || [];
    setContacts(saved);
  }, []);

  // Save contacts
  useEffect(() => {
    localStorage.setItem("emergencyContacts", JSON.stringify(contacts));
  }, [contacts]);

  const handleAddContact = (e) => {
    e.preventDefault();

    if (!name.trim() || !phone.trim()) {
      alert("Please fill all fields");
      return;
    }

    if (editingIndex !== null) {
      // Update
      const updated = [...contacts];
      updated[editingIndex] = { name, phone };
      setContacts(updated);
      setEditingIndex(null);
    } else {
      // Add new
      setContacts([...contacts, { name, phone }]);
    }

    setName("");
    setPhone("");
  };

  const handleEdit = (index) => {
    setName(contacts[index].name);
    setPhone(contacts[index].phone);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    if (window.confirm("Delete this contact?")) {
      setContacts(contacts.filter((_, i) => i !== index));
    }
  };

  const handleContinue = () => {
    if (contacts.length === 0) {
      alert("Please add at least one emergency contact.");
      return;
    }

    localStorage.setItem("emergencySaved", "true");

    // ✔ After Emergency Page → Go to J O U R N E Y Page
    navigate("/journey");
  };

  return (
    <>
      <Navbar />

      <div className="em-wrapper">
        <div className="em-card">

          <h2 className="em-title">Emergency Contacts</h2>
          <p className="em-sub">Add people who will be notified during emergencies.</p>

          {/* FORM */}
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
                    <button className="btn-edit" onClick={() => handleEdit(index)}>
                      Edit
                    </button>
                    <button className="btn-delete" onClick={() => handleDelete(index)}>
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Continue Button */}
          <button className="em-continue-btn" onClick={handleContinue}>
            Save & Continue →
          </button>

        </div>
      </div>
    </>
  );
}

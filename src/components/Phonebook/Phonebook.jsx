import React, { useState } from "react";
import { useFilter } from "../../hooks/useFilter";
import "./Phonebook.css";

const Phonebook = ({ contacts, onAddContact, onSetContacts }) => {
  const [contact, setContact] = useState({ name: "", number: "" });
  const [filteredContacts, applyFilter] = useFilter(contacts);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (contact.name && contact.number) {
      const contactExists = contacts.some(
        (c) => c.name.toLowerCase() === contact.name.toLowerCase()
      );
      if (contactExists) {
        alert(`${contact.name} is already in contacts`);
      } else {
        const newContact = { ...contact };
        onAddContact(contact.name, contact.number);
        onSetContacts([...contacts, newContact]);
        applyFilter("");
        setContact({ name: "", number: "" });
      }
    }
  };

  const handleChangeFindName = (event) => {
    applyFilter(event.target.value);
  };

  const handleDeleteContact = (index) => {
    const updatedContacts = filteredContacts.filter((_, i) => i !== index);
    onSetContacts(updatedContacts);
    applyFilter("");
  };

  return (
    <>
      <h3>Phonebook</h3>
      <form className="form" onSubmit={handleSubmit}>
        {/* ... (resto del formulario) ... */}
      </form>

      <h3>Contacts</h3>
      <p>Find contacts by name</p>
      <input
        name="findName"
        onChange={handleChangeFindName}
        value={filteredContacts}
      />

      {filteredContacts.length > 0 ? (
        <ul>
          {filteredContacts.map((contact, index) => (
            <li key={index}>
              <span>{contact.name}: </span>
              <span className="li__number">{contact.number}</span>
              <button
                className="li__button"
                onClick={() => handleDeleteContact(index)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No contacts found.</p>
      )}
    </>
  );
};

export default Phonebook;

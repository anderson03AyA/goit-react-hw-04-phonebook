import React, { useState } from "react";
import "./Phonebook.css";


const Phonebook = ({ contacts, onAddContact, onSetContacts }) => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [filteredContacts, setFilteredContacts] = useState(contacts);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (name && number) {
        const contactExists = contacts.some(
          (contact) => contact.name.toLowerCase() === name.toLowerCase()
      ); 
      if (contactExists) {
        alert(`${name} is already in contacts`)
      }else {

      // Agregar el nuevo contacto a los estados
      const newContact = { name, number };
      onAddContact(name, number);
      onSetContacts([...contacts, newContact]); // Actualizar el estado "contacts"
      setFilteredContacts([...filteredContacts, newContact]); // Actualizar el estado "filteredContacts"
      setName("");
      setNumber("");
      }
      }
  };

  const filterResults = (searchTerm, list) => {
    const term = searchTerm.toLowerCase();

    const filteredList = list.filter((item) => {
      const lowerCaseItem = item.name.toLowerCase();
      return lowerCaseItem.includes(term);
    });

    return filteredList;
  };

  const handleChangeFindName = (e) => {
    const searchTerm = e.target.value;
    if (searchTerm === "") {
      setFilteredContacts(contacts);
    } else {
      const filteredList = filterResults(searchTerm, contacts);
      setFilteredContacts(filteredList);
    }
  };

  const handleDeleteContact = (index) => {
    const updatedContacts = filteredContacts.filter((_, i) => i !== index);
    setFilteredContacts(updatedContacts);

    const updatedAllContacts = contacts.filter((_, i) => i !== index);
    onSetContacts(updatedAllContacts);
  };

  return (
    <div>
      <h3>Phonebook</h3>
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          onChange={(event) => setName(event.target.value)}
          required
        />

        <label htmlFor="number">Number:</label>
        <input
          type="text"
          id="number"
          value={number}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          onChange={(event) => setNumber(event.target.value)}
          required
        />

        <button className="button" type="submit">
          Add contact
        </button>
      </form>

      <h3>Contacts</h3>
      <p>Find contacts by name</p>
      <input name="findName" onChange={handleChangeFindName}></input>

      {filteredContacts.length > 0 ? (
        <ul>
          {filteredContacts.map((contact, index) => (
            <li key={index}>
              <span>{contact.name}: </span>
              <span className="li__number">{contact.number}</span>
              <button className="li__button" onClick={() => handleDeleteContact(index)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No contacts found.</p>
      )}
    </div>
  );
};

export default Phonebook;

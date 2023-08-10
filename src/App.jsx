import React, { useState } from "react";
import "./App.css";
import Phonebook from "./components/Phonebook/Phonebook";
import { useLocalStorage } from "./useLocalStorage";

function App() {
  const [contacts, setContacts] = useLocalStorage("contact", []);

  const addContact = (name, number) => {
    const newContact = { name, number };
    setContacts((prevContacts) => [...prevContacts, newContact]);
  };
  const setAllContacts = (updatedContacts) => {
    setContacts(updatedContacts);
  };

  return (
    <div className="App">
      <Phonebook
        contacts={contacts}
        onAddContact={addContact}
        onSetContacts={setAllContacts}
      />
    </div>
  );
}

export default App;

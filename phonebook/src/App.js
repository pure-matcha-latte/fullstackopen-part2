import React, { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  const addPerson = (e) => {
    e.preventDefault();

    const exist = persons.find((person) => person.name === newName);
    if (exist) {
      alert(`"${newName}" is already added to phonebook`);
      return;
    }

    const personObject = { name: newName, number: newNumber };
    setPersons(persons.concat(personObject));
    setNewName("");
    setNewNumber("");
  };

  return (
    <>
      <h1>Phonebook</h1>
      <Filter value={filter} onChange={(e) => setFilter(e.target.value)} />

      <h2>Add a new</h2>
      <PersonForm
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        onSubmit={addPerson}
      />

      <h2>Numbers</h2>
      <Persons persons={filteredPersons} />
    </>
  );
};

export default App;

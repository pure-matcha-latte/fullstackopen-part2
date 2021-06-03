import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    personService.getAll().then((initialPersons) => setPersons(initialPersons));
  }, []);

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
    personService.create(personObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setNewName("");
      setNewNumber("");
    });
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

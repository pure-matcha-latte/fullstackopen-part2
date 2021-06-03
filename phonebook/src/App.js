import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notificationMessage, setNotificationMessage] = useState({
    type: "success",
    content: "Hello",
  });

  useEffect(() => {
    personService.getAll().then((initialPersons) => setPersons(initialPersons));
  }, []);

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  const addPerson = (e) => {
    e.preventDefault();

    const existingPerson = persons.find((person) => person.name === newName);
    if (existingPerson) {
      const message = `${newName} is already added to phonebook. Replace the old number with a new one?`;

      if (window.confirm(message)) {
        const id = existingPerson.id;
        const changedPerson = { ...existingPerson, number: newNumber };

        personService.update(id, changedPerson).then((returnedPerson) => {
          const updatedPersons = persons.map((person) =>
            person.id !== id ? person : returnedPerson
          );
          showSuccessMessage(`${newName}'s number has been updated`);
          setPersons(updatedPersons);
          setNewName("");
          setNewNumber("");
        });
      }

      return;
    }

    const personObject = { name: newName, number: newNumber };
    personService.create(personObject).then((returnedPerson) => {
      showSuccessMessage(`${newName}'s number has been added`);
      setPersons(persons.concat(returnedPerson));
      setNewName("");
      setNewNumber("");
    });
  };

  const deletePerson = (person) => {
    const { name, id } = person;

    if (window.confirm(`Delete "${name}"?`)) {
      personService
        .delete(id)
        .then(() => setPersons(persons.filter((person) => person.id !== id)))
        .catch(() => {
          const errorMessage = `Information of "${name}" has already been removed from the server`;
          showErrorMessage(errorMessage);
          setPersons(persons.filter((person) => person.id !== id));
        });
    }
  };

  const showMessage = (message, timeout = 5000) => {
    setNotificationMessage(message);
    setTimeout(() => setNotificationMessage(null), timeout);
  };

  const showSuccessMessage = (content) =>
    showMessage({ type: "success", content });

  const showErrorMessage = (content) => showMessage({ type: "error", content });

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
      <Persons persons={filteredPersons} deletePerson={deletePerson} />

      <Notification message={notificationMessage} />
    </>
  );
};

export default App;

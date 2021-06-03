const PersonDetail = ({ person, deletePerson }) => (
  <div>
    {person.name} {person.number}{" "}
    <button onClick={() => deletePerson(person)}>Delete</button>
  </div>
);

const Persons = ({ persons, deletePerson }) =>
  persons.map((person) => (
    <PersonDetail
      key={person.name}
      person={person}
      deletePerson={deletePerson}
    />
  ));

export default Persons;

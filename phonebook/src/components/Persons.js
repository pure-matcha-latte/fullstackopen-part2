const PersonDetail = ({ person }) => (
  <div>
    {person.name} {person.number}
  </div>
);

const Persons = ({ persons }) =>
  persons.map((person) => <PersonDetail key={person.name} person={person} />);

export default Persons;

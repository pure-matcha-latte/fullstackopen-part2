const PersonForm = ({
  newName,
  setNewName,
  newNumber,
  setNewNumber,
  onSubmit,
}) => (
  <form onSubmit={onSubmit}>
    <div>
      Name:{" "}
      <input value={newName} onChange={(e) => setNewName(e.target.value)} />
    </div>
    <div>
      Number:{" "}
      <input value={newNumber} onChange={(e) => setNewNumber(e.target.value)} />
    </div>
    <div>
      <button type="submit">Add</button>
    </div>
  </form>
);

export default PersonForm;

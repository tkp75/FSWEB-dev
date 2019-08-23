import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const handleSubmitClick = (event) => {
    event.preventDefault()
    if(persons.find(person => person.name === newName) === undefined) {
      setPersons(persons.concat({ name: newName, number: newNumber }))
    } else {
      alert(`${newName} is already added to phonebook`)
    }
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name:
          <input
            onChange={handleNameChange}
            value={newName}
          />
        </div>
        <div>
          number:
          <input
            onChange={handleNumberChange}
            value={newNumber}
          />
        </div>
        <div>
          <button
            type="submit"
            onClick={handleSubmitClick}
          >
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul style={{listStyleType: "none", padding: 0}}>
        {persons.map(person => <li key={person.name}>{person.name} {person.number}</li>)}
      </ul>
    </div>
  )

}

export default App
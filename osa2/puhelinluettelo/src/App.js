import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const handleInputChange = (event) => setNewName(event.target.value)
  
  const handleSubmitClick = (event) => {
    event.preventDefault()
    if(persons.find(person => person.name === newName) === undefined) {
      setPersons(persons.concat({ name: newName }))
    } else {
      alert(`${newName} is already added to phonebook`)
    }
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name:
          <input
            onChange={handleInputChange}
            value={newName}
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
        {persons.map(person => <li key={person.name}>{person.name}</li>)}
      </ul>
    </div>
  )

}

export default App
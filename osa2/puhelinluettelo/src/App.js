import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = (props) => {
  return (
    <div>
      filter shown with:
      <input
        onChange={props.changeHandler}
        value={props.value}
      />
    </div>
  )
}

const PersonForm = (props) => {
  return (
    <form>
      <div>
        name:
        <input
          onChange={props.changeNameHandler}
          value={props.name}
        />
      </div>
      <div>
        number:
        <input
          onChange={props.changeNumberHandler}
          value={props.number}
        />
      </div>
      <div>
        <button
          type="submit"
          onClick={props.submitClickHandler}
        >
          add
        </button>
      </div>
    </form>
  )
}

const Persons = (props) => {
  return (
    <ul style={{listStyleType: "none", padding: 0}}>
      {props.persons.filter(person => person.name.toLocaleUpperCase().includes(props.filter))
        .map(person => <li key={person.name}>{person.name} {person.number}</li>)}
    </ul>
  )
}

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setNewFilter(event.target.value)

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

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        changeHandler={handleFilterChange}
        value={newFilter}
      />
      <h3>add a new</h3>
      <PersonForm
        changeNameHandler={handleNameChange}
        name={newName}
        changeNumberHandler={handleNumberChange}
        number={newNumber}
        submitClickHandler={handleSubmitClick}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} filter={newFilter.toLocaleUpperCase()} />
    </div>
  )

}

export default App
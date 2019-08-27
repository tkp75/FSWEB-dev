import React, { useState, useEffect } from 'react'
import personService from './services/persons'

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
        .map(person =>
          <li key={person.name}>
            {person.name} {person.number}&nbsp;
            <DeleteButton id={person.id} deleteClickHandler={props.deleteClickHandler} />
          </li>
        )
      }
    </ul>
  )
}

const DeleteButton = (props) => {
  return (
    <button id={props.id} onClick={props.deleteClickHandler}>delete</button>
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
    let newPersons = [...persons]
    const person = newPersons.find(p => p.name === newName)
    // Delete person if already exist and user agrees
    if( person !== undefined) {
      if (!window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        console.log(`handleSubmitClick: ${newName} is already added to phonebook and not replacing the number`)
        return
      }
      personService.remove(person.id)
      .catch(error => {
        console.log('handleSubmitClick:',error)
        alert(`Could not delete '${newName}' from server with id ${person.id}`)
        return
      })
      newPersons = newPersons.filter(p => p.id !== person.id)
    }
    // Create user with number
    personService.create({ name: newName, number: newNumber })
      .then(returnedPerson => {
        setPersons(newPersons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        console.log('handleSubmitClick:',error)
        alert(`Could not save '${newName}' to server with number '${newNumber}'`)
        setPersons(newPersons)
      })      
  }

  const handleDeleteClick = (event) => {
    const id = parseInt(event.target.getAttribute('id'),10)
    const person = persons.find(person => person.id === id)
    if (!isFinite(id) || person === undefined) {
      alert(`Could not delete person with id '${id}' or person (${person}) not defined`)
      return
    }
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.remove(person.id)
        .then(returnedPerson => setPersons(persons.filter(p => p.id !== person.id)))
        .catch(error => {
          console.log('handleDeleteClick:',error)
          alert(`Could not delete person with id '${person.id}' (name=${person.name}) from server`)
        })
    } else {
      console.log(`handleDeleteClick: skipping deletion of person with id '${person.id}' (name=${person.name})`)
    }
  }

  useEffect(() => {
    personService.getAll()
      .then(returnedPersons => {
        setPersons(returnedPersons)
      })
      .catch(error => {
        console.log(error)
        alert('Could not get person list from server')
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
      <Persons
        persons={persons}
        filter={newFilter.toLocaleUpperCase()}
        deleteClickHandler={handleDeleteClick}
      />
    </div>
  )

}

export default App
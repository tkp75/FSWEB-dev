import React, { useState, useEffect } from 'react'
import personService from './services/persons'
const  util = require('util');

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

const Notification = ({notification}) => {
  const styleList = [
    { // INFO
      padding: 10,
      marginBottom: 10,
      borderStyle: 'solid',
      borderRadius: 5,
      background: 'lightgrey',
      color: 'darkgreen',
      fontStyle: 'normal',
      fontSize: 20
    },
    { // WARN
      padding: 10,
      marginBottom: 10,
      borderStyle: 'solid',
      borderRadius: 5,
      background: 'grey',
      color: 'blue',
      fontStyle: 'italics',
      fontSize: 20
    },
    { // ERROR
      padding: 10,
      marginBottom: 10,
      borderStyle: 'solid',
      borderRadius: 5,
      background: 'darkblue',
      color: 'salmon',
      fontStyle: 'bold',
      fontSize: 20
    }
  ]
  if (notification.level < 0 || notification.level >= styleList.length) {
    return null
  }
  return (
    <div className="notification" style={styleList[notification.level]}>
      <pre>{notification.text}</pre>
    </div>
  )
}

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ message, setMessage ] = useState({level: -1})

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setNewFilter(event.target.value)

  const handleSubmitClick = (event) => {
    event.preventDefault()
/* commented out to test validation on backend
    if (!newName || !newNumber) {
      setMessage({text: `Error, please fill in both name and number`, level: 2})
      setTimeout(() => setMessage({level: -1}), 15000)
      return
    } 
*/
    const newPersons = JSON.parse(JSON.stringify(persons))
    const person = newPersons.find(p => p.name === newName)
    if (person !== undefined) {
      // Modify person if already exist and user agrees, cancel operation otherwise
      if (!window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        setMessage({text: `Cancelled updating '${newName}'`, level: 1})
        setTimeout(() => setMessage({level: -1}), 10000)
        return
      }
      person.name = newName
      person.number = newNumber
      personService.modify(person)
        .then(returnedPerson => {
          setPersons(newPersons.filter(p => {
            if (p.id === returnedPerson.id) return returnedPerson
            return p
          }))})
        .then(returnedPerson => {
          setMessage({text: `Updated '${newName}'`, level: 0})
          setTimeout(() => setMessage({level: -1}), 5000)
        })
        .catch(error => {
          let errorText
          if (error.response) errorText = error.response.data.error
          else if (error.request) errorText = JSON.stringify(error.request.data, null, 2)
          else errorText = error.stack
          console.log(`Failed modifying '${newName}':`,util.inspect(error))
          setMessage({text: `Failed modifying '${newName}'\n${error.message}\n${errorText}`, level: 2})
          setTimeout(() => setMessage({level: -1}), 15000)
          return
        })    
    } else {
      // Create a new user with a number
      personService.create({ name: newName, number: newNumber })
        .then(returnedPerson => setPersons(newPersons.concat(returnedPerson).sort((p1, p2) => p1.name > p2.name)))
        .then(returnedPerson => {
          setMessage({text: `Added '${newName}'`, level: 0})
          setTimeout(() => setMessage({level: -1}), 5000)
        })
        .catch(error => {
          let errorText
          if (error.response) errorText = error.response.data.error
          else if (error.request) errorText = JSON.stringify(error.request.data)
          else errorText = error.stack
          console.log(`Failed creating '${newName}':`,util.inspect(error))
          setMessage({text: `Failed creating '${newName}'\n${error.message}\n${errorText}`, level: 2})
          setTimeout(() => setMessage({level: -1}), 15000)
          return
        })
      }
    setNewName('')
    setNewNumber('')
}

  const handleDeleteClick = (event) => {
    const id = event.target.getAttribute('id')
    const person = persons.find(person => person.id === id)
/* commented out to test validation on backend
    if (id == null || person === undefined) {
      setMessage({text: `Failed deleting person with id '${id}'`, level: 2})
      setTimeout(() => setMessage({level: -1}), 15000)
      return
    }
*/
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.remove(person.id)
        .then(returnedPerson => setPersons(persons.filter(p => p.id !== person.id)))
        .then(returnedPerson => {
          setMessage({text: `Deleted '${person.name}' with id '${person.id}'`,level: 0})
          setTimeout(() => setMessage({level: -1}), 5000)
        })
        .catch(error => {
          let errorText
          if (error.response) errorText = error.response.data.error
          else if (error.request) errorText = JSON.stringify(error.request.data)
          else errorText = error.stack
          console.log(`Failed deleting '${person.name}' with id '${person.id}':`,util.inspect(error))
          setMessage({text: `Failed deleting '${person.name}' with id '${person.id}'\n${errorText}`,
            level: 2})
          setTimeout(() => setMessage({level: -1}), 15000)
          return
        })
    } else {
      setMessage({text: `Cancelling deletion of '${person.name}' with id '${person.id}'`, level: 1})
      setTimeout(() => setMessage({level: -1}), 10000)
      return
    }
  }

  useEffect(() => {
    personService.getAll()
      .then(returnedPersons => {
        setPersons(returnedPersons.sort((p1, p2) => p1.name > p2.name))
      })
      .catch(error => {
        let errorText
        if (error.response) errorText = error.response.data.error
        else if (error.request) errorText = JSON.stringify(error.request.data)
        else errorText = error.stack
        console.log(`Could not get person list from server:`,util.inspect(error))
        setMessage({text: `Could not get person list from server\n${errorText}`, level: 2})
        setTimeout(() => setMessage({level: -1}), 15000)
      })      
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={message} />
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
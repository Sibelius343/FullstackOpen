import React, { useState, useEffect } from 'react'
import personService from './services/persons'

const Person = ({person, handleDel}) => (
  <>
    <li>{person.name} {person.number} <button type='button' onClick={() => handleDel(person.id)}>delete</button></li>
  </>
)

const People = ({persons, handleDel}) => (
  <>
    <ul>
      {persons.map(person =>
        <Person key={person.name} person={person} handleDel={handleDel} /> )} 
    </ul>
  </>
)

const Input = ({text, value, onChange}) => (
  <>
    {text}<input value={value} onChange={onChange} />
  </>
)

const AddNotification = ({message}) => {
  if (message === null) {
    return null
  }
  const notificationStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
}

const ErrorMessage = ({message}) => {
  if (message === null) {
    return null
  }
  const notificationStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([]) 

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearch, setNewSearch ] = useState('')
  const [ notification, setNotification] = useState(null)
  const [ errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPeople => {
        setPersons(initialPeople)
      })
  }, [])

  const checkName = () => {
      return persons.filter(person => person.name.toLowerCase() === newName.toLowerCase())
  }

  const addPerson = (event) => {
    event.preventDefault()
    const existing = checkName()
    if (existing.length === 0){
      const personObject = {
        name: newName,
        number: newNumber
      }
      
      personService
        .create(personObject)
        .then(person => {
          setPersons(persons.concat(person))
        })
      setNotification(`Added ${personObject.name}`)
      setTimeout(() => {
        setNotification(null)
      }, 5000)

    } else if (existing[0].number !== newNumber) {
      changeNumber(existing[0])
    } else {
      window.alert(`${newName} is already added to phonebook`)
    }
    setNewName('')
    setNewNumber('')
  }

  const handleInputChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
    setNewSearch(event.target.value)
  }
  
  const filteredPersons = () => (
    persons.filter(person => person.name.toLowerCase().includes(newSearch.toLowerCase()))
  )

  const handleDel = id => {
    const name = persons.find(p => p.id === id).name
    const result = window.confirm(`Delete ${name}?`)
    if (result) {
      personService.del(id)
      setPersons(persons.filter(person => person.id !== id))  
    }
  }

  const changeNumber = (person) => {
    const result = window.confirm(`${newName} is already added to the phonebook. Replace the old number with a new one?`)
    if (result) {
      const id = person.id
      const changedPerson = {...person, number: newNumber}
      personService
        .update(person.id, changedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
        
          setNotification(`Changed ${changedPerson.name}'s number to ${changedPerson.number}`)
          setTimeout(() => {
            setNotification(null)
          }, 5000)})
        .catch(error => {
          setErrorMessage(
            `Information of ${changedPerson.name} has already been removed from server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setPersons(persons.filter(p => p.id !== changedPerson.id))
        })
      
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <AddNotification message={notification} />
      <ErrorMessage message={errorMessage} />
      <div>
        <Input text={'filter shown with'} value={newSearch} onChange={handleSearch} />
      </div>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          <Input text={'name: '} value={newName} onChange={handleInputChange} />
        </div>
        <div>
          <Input text={'number: '} value={newNumber} onChange={handleNumberChange} />  
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <People persons={filteredPersons()} handleDel={handleDel}/>
    </div>
  )
}

export default App
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = (props) => {
  return (
    <div className="Filter">
      find countries
      <input
        onChange={props.changeHandler}
        value={props.value}
      />
    </div>
  )
}

const Countries = (props) => {
  const filteredCountries =
    props.countries.filter(
      country => country.name.toLocaleUpperCase().includes(props.filter)
    )
//console.log('Filtered countries:',filteredCountries)
  if (filteredCountries.length < 1)  return null
  if (filteredCountries.length > 10) return "Too many matches, specify another filter"
  return (
    <div className="Countries">
      <ul style={{listStyleType: "none", padding: 0}}>
        {filteredCountries.map(country => <li key={country.cioc}>{country.name}</li>)}
      </ul>
    </div>
  )
}

const App = () => {
  const [ newFilter, setNewFilter ] = useState('')
  const handleFilterChange = (event) => setNewFilter(event.target.value)

  const [ countries, setCountries ] = useState([])
  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])
  
  return (
    <div className="App">
      <Filter
        changeHandler={handleFilterChange}
        value={newFilter}
      />
      <Countries
        countries={countries}
        filter={newFilter.toLocaleUpperCase()}
      />
    </div>
  );
}

export default App
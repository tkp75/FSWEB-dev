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
  if (filteredCountries.length < 1) return null
  if (filteredCountries.length === 1) return <Country country={filteredCountries[0]} />
  if (filteredCountries.length > 10) return "Too many matches, specify another filter"
  return (
    <div className="Countries">
      <ul style={{listStyleType: "none", padding: 0}}>
        {filteredCountries.map(
          country =>
          <li key={country.cioc}>
            {country.name}
            <button onClick={props.showClickHandler}>show</button>
          </li>
        )}
      </ul>
    </div>
  )
}

const Country = (props) => {
  return (
    <div className="Country">
      <ul style={{listStyleType: "none", padding: 0}}>
        <li ><h2>{props.country.name}</h2></li>
        <li >capital {props.country.capital}</li>
        <li >population {props.country.population}</li>
        <Languages languages={props.country.languages} />
        <Flag url={props.country.flag} />
      </ul>
    </div>
  )
}

const Languages = (props) => {
  return (
    <div className="Languages">
      <li><b>languages</b>
        <ul style={{listStyleType: "disc", paddingLeft: "32px"}}>
          {props.languages.map(language => <li key={language.name}>{language.name}</li>)}
        </ul>
      </li>
    </div>
  )
}

const Flag = (props) => {
  return (
    <div className="Flag">
      <li>
        <img src={props.url} alt="flag" style={{width: 128, height: "auto"}}/>
      </li>      
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

  const handleShowClick = (event) => {
//  console.log(event.target.previousSibling)
    setNewFilter(event.target.previousSibling.textContent)
  }

  return (
    <div className="App">
      <Filter
        changeHandler={handleFilterChange}
        value={newFilter}
      />
      <Countries
        countries={countries}
        filter={newFilter.toLocaleUpperCase()}
        showClickHandler={handleShowClick}
      />
    </div>
  );
}

export default App
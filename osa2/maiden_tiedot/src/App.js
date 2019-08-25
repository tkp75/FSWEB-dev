//import React, { useState, useEffect, useCallback } from 'react'
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = (props) => {
  return (
    <div className="Filter">
      find countries&nbsp;
      <input
        onChange={props.changeHandler}
        value={props.value}
      />
    </div>
  )
}

const Countries = (props) => {
  if (props.countries.length < 1) return "Specify a filter"
  if (props.countries.length === 1) return <Country country={props.countries[0]} weather={props.weather} />
  if (props.countries.length > 10) return "Too many matches, specify another filter"
  return (
    <div className="Countries">
      <ul style={{listStyleType: "none", padding: 0}}>
        {props.countries.map(
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
        <Weather weather={props.weather} />
      </ul>
    </div>
  )
}

const Languages = (props) => {
  return (
    <div className="Languages">
      <li>
        <b>languages</b>
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

const Weather = (newWeather) => {
  if (newWeather.weather.location === undefined ) {
      return (
      <div className="Weather">
        <li><b>Weather is not available</b></li>
      </div>
    )
  }
  return (
    <div className="Weather">
      <li><b>Weather in {newWeather.weather.location.name}</b></li>
      <li><b>temperature:</b> {newWeather.weather.current.temp_c} Celsius</li>
      <li>
        <img
          src={newWeather.weather.current.condition.icon}
          alt={newWeather.weather.current.condition.text}
        />
      </li>
      <li>
        <b>wind:</b> {newWeather.weather.current.wind_kph} kph
        in direction {newWeather.weather.current.wind_dir}
      </li>      
    </div>
  )
}

const App = () => {
  // STATE
  const [ newFilter, setNewFilter ] = useState('')
  const [ countries, setCountries ] = useState([])
  const [ filteredCountries, setFilteredCountries ] = useState([])
  const [ weather, setWeather ] = useState([])

  // MISC
  // - get weather information from internet
  // TODO: make this unblocking
  const fetchWeather = (city) => {
    axios
      .get('https://api.apixu.com/v1/current.json?key=de71cbf233b0425ba6a91331192508&q='+city)
      .then(response => {
        setWeather(response.data)
      }).catch(error => {
        console.log(error)
        return null
    })
  }

  // - filter countries
  const filterCountries =  (filterValue) => {
    const newCountries = countries.filter(
      country => country.name.toLocaleUpperCase().includes(filterValue)
    )
    setFilteredCountries(newCountries)
    if (newCountries.length === 1 &&
      (
        weather.weather === undefined ||
        newCountries[0].capital.localeCompare(weather.weather.location.name) !== 0
      ))  {
      fetchWeather(newCountries[0].capital)
    }
  }

  // EVENT
  // - filter changed
  const handleFilterChange = (event) => {
    filterCountries(event.target.value.toLocaleUpperCase())
    setNewFilter(event.target.value)
  }

  // - show button clicked
  const handleShowClick = (event) => {
    filterCountries(event.target.previousSibling.textContent.toLocaleUpperCase())
    setNewFilter(event.target.previousSibling.textContent)
  }
    
  // EFFECT
  // - get countries
  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      }).catch(error => {
        console.log(error)
        return null
    })
  }, [])

  // RETURN App element
  return (
    <div className="App">
      <Filter
        changeHandler={handleFilterChange}
        value={newFilter}
      />
      <Countries
        countries={filteredCountries}
        weather={weather}
        showClickHandler={handleShowClick}
      />
    </div>
  );
}

export default App
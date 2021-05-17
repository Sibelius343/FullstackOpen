import React, { useState, useEffect } from 'react'
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY

const Countries = ({countries, setSearch, weather, setWeather}) => {
  if (countries.length > 10) {
    return (
      <>
        Too many matches, specify another filter
      </>  
    )  
  } else if (countries.length <= 10 && countries.length > 1) {
    return <CountryList countries={countries} setSearch={setSearch} />
  } else if (countries.length === 1) {
    return <Country country={countries[0]} weather={weather} setWeather={setWeather} />
  } else {
    return (
      <>
        No match
      </>
    )
  }
}

const CountryButton = ({country, setSearch}) => {
  const selectCountry = () => {
    setSearch(country.name)
  }

  return (
    <>
      <button type='button' onClick={selectCountry}>show</button>
    </>
  )
}

const CountryList = ({countries, setSearch}) => {

  return (
    <ul>
      {countries.map(country => <li key={country.alpha2Code}>{country.name}
      <CountryButton country={country} setSearch={setSearch} /></li>)}
    </ul>  
  )  
}

const Country = ({country, weather, setWeather}) => {

  return (
    <>
      <h1>{country.name}</h1>
      capital {country.capital}
      <br></br>
      population {country.population}
      <h2>languages</h2>
      <ul>
        {country.languages.map(language => <li key={language.iso639_1}>{language.name}</li>)}
      </ul>
      <img src={country.flag} alt={country.name} width='200' height='auto'></img>
      <h2>Weather in {country.capital}</h2>
      <Weather country={country} weather={weather} setWeather={setWeather} />
    </>  
  )
}

const Weather = ({country, weather, setWeather}) => {
  const params = {
    access_key: api_key,
    query: `${country.capital}, ${country.name}`
  }

  // const line = `http://api.weatherstack.com/current?access_key=${params.access_key}&query=${params.query}`
  // console.log(line);
  useEffect(() => {
    axios
    .get('http://api.weatherstack.com/current', {params})
        .then(response => {
          setWeather(response.data) 
        })
    }, [])
  /* console.log(weather);
  console.log(weather.current.temperature);
  return (
    <>
      {weather.current.temperature}
    </>
  )
  */
 //console.log(line);
 return (
  <>
    <b>temperature: </b>{weather.current.temperature}
    <br></br>
    <img src={weather.current.weather_icons[0]}></img>
    <br></br>
    <b>wind: </b>{weather.current.wind_speed} mph direction {weather.current.wind_dir}
  </>
 )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [weather, setWeather] = useState({current: {temperature: "loading",
                                                    weather_icons: [''],
                                                    wind_speed: '',
                                                    wind_dir: ''}})
  //const countries = []

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  const filterCountries = () => (
    countries.filter(country => country.name.toLowerCase().includes(search.toLowerCase()))
  )

  const countriesToShow = search === ''
    ? ''
    : <Countries countries={filterCountries()} setSearch={setSearch} weather={weather} setWeather={setWeather}/>

  return (
    <div>
      <div>
        find countries<input value={search} onChange={handleSearchChange}></input>
      </div>
      {countriesToShow}
    </div>
  )
}

export default App;

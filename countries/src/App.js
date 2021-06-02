import React, { useState, useEffect } from "react";
import axios from "axios";

const weatherApiKey = process.env.REACT_APP_API_KEY;

const Weather = ({ location, weather }) => {
  if (!weather) return null;

  return (
    <>
      <h3>Weather in {location}</h3>
      <div>
        <img
          src={weather.current.weather_icons[0]}
          alt={`Weather in ${location}`}
        />
      </div>
      <p>
        Temperature: {weather.current.temperature}
        <br />
        Wind speed: {weather.current.wind_speed}
        <br />
        Wind direction: {weather.current.wind_dir}
      </p>
    </>
  );
};

const Country = ({ country }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const requestUrl = `http://api.weatherstack.com/current?access_key=${weatherApiKey}&query=${country.capital}`;
    axios.get(requestUrl).then((response) => setWeather(response.data));
  }, [country.capital]);

  return (
    <div>
      <h2>{country.name}</h2>
      <p>
        Capital: {country.capital}
        <br />
        Population: {country.population}
      </p>

      <h3>Languages</h3>
      <ul>
        {country.languages.map((language) => (
          <li key={language.name}>{language.name}</li>
        ))}
      </ul>

      <div>
        <img
          src={country.flag}
          alt={`The flag of ${country.name}`}
          width="360"
        />
      </div>

      <Weather location={country.capital} weather={weather} />
    </div>
  );
};

const Result = ({ countries, specificCountry, setSpecificCountry }) => {
  if (specificCountry !== null) {
    return <Country country={specificCountry} />;
  }

  if (countries.length > 10) {
    return <div>Too many matching results. Please specify another query.</div>;
  }

  if (countries.length > 1) {
    return countries.map((country) => (
      <div key={country.name}>
        {country.name}{" "}
        <button onClick={() => setSpecificCountry(country)}>Show</button>
      </div>
    ));
  }

  if (countries.length === 1) {
    return <Country country={countries[0]} />;
  }

  // for the first rendering before the effect in `App` is executed
  return null;
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [query, setQuery] = useState("");
  const [specificCountry, setSpecificCountry] = useState(null);

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then((response) => setCountries(response.data));
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(query.toLocaleLowerCase())
  );

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
    setSpecificCountry(null);
  };

  return (
    <>
      <div>
        Find countries: <input value={query} onChange={handleQueryChange} />
      </div>
      <Result
        countries={filteredCountries}
        specificCountry={specificCountry}
        setSpecificCountry={setSpecificCountry}
      />
    </>
  );
};

export default App;

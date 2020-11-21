import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const API_KEY = "1cd2e43f638944d7b22221633202111";

  const [city, setCity] = useState("");
  const [weatherInfo, setWeatherInfo] = useState(null);

  const getWeather = () => {
    axios
      .get(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`)
      .then((response) => {
        setWeatherInfo(response.data);
        setCity("");
      })
      .catch((err) => console.log(err));
  };

  const inputChangeHandler = (e) => {
    setCity(e.target.value);
  };

  return (
    <div className="app">
      <div className="header">
        <h1>Weather API</h1>
        <div className="search">
          <input
            type="text"
            value={city}
            onChange={(e) => inputChangeHandler(e)}
          />
          <button onClick={getWeather}>Get Weather</button>
        </div>
      </div>
      {weatherInfo ? (
        <div className="info">
          <div className="location">
            <h2>
              {weatherInfo.location.name} ({weatherInfo.location.country})
            </h2>
            <p>{weatherInfo.location.region}</p>
          </div>
          <div className="weather">
            <img
              src={weatherInfo.current.condition.icon}
              alt={weatherInfo.current.condition.text}
            />
            <h3>{weatherInfo.current.condition.text}</h3>
            <h2>{weatherInfo.current.temp_c}°C</h2>
          </div>
        </div>
      ) : (
        <h3 className="search-city">Search a city!</h3>
      )}
    </div>
  );
};

export default App;

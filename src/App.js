import axios from "axios";
import React, { useState } from "react";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  // const API_KEY = process.env.REACT_APP_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=5efa27fba902792fc106c92d65695eed`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setLocation("");
    }
  };

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          type="text"
          onChange={(event) => setLocation(event.target.value)}
          onKeyDown={searchLocation}
          placeholder="Enter location"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            {data.main ? (
              <p>
                {data.name}, {data.sys.country}
              </p>
            ) : null}
          </div>
          <div className="temp">
            {data.main ? <h1>{Math.floor(data.main.temp - 273.15)}℃</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name !== undefined && (
          <div className="bottom">
            <div className="feels">
              {data.main ? (
                <p className="bold">{Math.floor(data.main.temp - 273.15)}℃</p>
              ) : null}
              <p>Feels Like</p>
            </div>
            <div className="hunidity">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.main ? <p className="bold">{data.wind.speed} MPH</p> : null}
              <p>Winds</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

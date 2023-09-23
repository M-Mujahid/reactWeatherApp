import React, { useState } from 'react';
import './weatherApp.css';
import searchIcon from '../assets/search.png';
import cloudIcon from '../assets/cloud.png';
import humidityIcon from '../assets/humidity.png';
import windIcon from '../assets/wind.png';

import clearIcon from '../assets/clear.png';
import drizzleIcon from '../assets/drizzle.png';
import rainIcon from '../assets/rain.png';
import snowIcon from '../assets/snow.png';

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState({
    temperature: null,
    humidity: null,
    windSpeed: null,
    location: null,
    weatherCondition: null,
  });

  const apiKey = 'f3cd481f5184e1f8e35f4a1af5126d58';

  const search = async () => {
    const element = document.getElementsByClassName('city');
    const inputValue = element[0].value.trim();
    if (inputValue === '') {
      console.log('Input is empty.');
      return;
    }

    try {
      const URL = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&units=metric&appid=${apiKey}`;

      const response = await fetch(URL);

      if (!response.ok) {
        console.log('Failed to fetch weather data.');
        return;
      }

      const data = await response.json();
      console.log(data)

      setWeatherData({
        temperature: data.main.temp,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        location: data.name,
        weatherCondition: data.weather[0].main, // Get the weather condition from the API
      });
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  // Define a function to get the appropriate weather icon based on the condition
  const getWeatherIcon = (condition) => {
    switch (condition) {
      case 'Clear':
        return clearIcon;
      case 'Drizzle':
        return drizzleIcon;
      case 'Rain':
        return rainIcon;
      case 'Snow':
        return snowIcon;
      default:
        return cloudIcon; // Use cloud icon as a default
    }
  };

  return (
    <div className="container">
      <img className='bg-img' src="../asstes/bg-image.jpg" alt="" />
       <div className="top-bar">
         <input type="text" className="city" placeholder="search" />

        <div className="search-icon" onClick={search}>
          <img src={searchIcon} alt="Search" />
        </div>
      </div>

      <div className="weather-location">
        {weatherData.location !== null ? weatherData.location : 'N/A'}
      </div>
      <div className="weather-image">
        <img src={getWeatherIcon(weatherData.weatherCondition)} alt="Weather Icon" />
      </div>
       <div className="weather-temp">
         {weatherData.temperature !== null ? `${weatherData.temperature}°C` : 'N/A'}
       </div>

      <div className="data-container">
        <div className="element">
          <img className="icon" src={humidityIcon} alt="Humidity Icon" />
          <div className="data">
            <div className="humidity-percentage">
              {weatherData.humidity !== null ? `${weatherData.humidity}%` : 'N/A'}
            </div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img className="icon" src={windIcon} alt="Wind Icon" />
          <div className="data">
            <div className="wind-rate">
              {weatherData.windSpeed !== null ? `${weatherData.windSpeed} km/h` : 'N/A'}
            </div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;

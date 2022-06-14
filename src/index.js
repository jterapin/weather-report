import 'regenerator-runtime/runtime';
import axios from 'axios';

('use strict');

const state = {
  temp: 70,
  city: 'World',
};

const increaseTemp = () => {
  state.temp += 1;
  updateTempText();
  updateLandscape();
};

const decreaseTemp = () => {
  state.temp -= 1;
  updateTempText();
  updateLandscape();
};

const updateTempText = () => {
  const tempCurrent = document.querySelector('#tempCurrent');
  tempCurrent.textContent = state.temp;
  if (state.temp > 80) {
    tempCurrent.style.color = 'red';
  } else if (state.temp > 70) {
    tempCurrent.style.color = 'orange';
  } else if (state.temp > 60) {
    tempCurrent.style.color = 'yellow';
  } else if (state.temp > 50) {
    tempCurrent.style.color = 'blue';
  } else {
    tempCurrent.style.color = 'aqua';
  }
};

const updateLandscape = () => {
  const landscapeImage = document.querySelector('#landscape-img');
  const landscapeText = document.querySelector('#landscape-text');

  if (state.temp > 80) {
    const dict = { key: require('/assets/ChickenNotHappy.png') };
    landscapeImage.src = dict.key;
    landscapeText.textContent = 'UGH TOO HOT';
  } else if (state.temp > 70) {
    const dict = { key: require('/assets/ChickenHappy.png') };
    landscapeImage.src = dict.key;
    landscapeText.textContent = "Let's go outside lol";
  } else if (state.temp > 60) {
    const dict = { key: require('/assets/ChickenJustRight.png') };
    landscapeImage.src = dict.key;
    landscapeText.textContent = 'Ooo, feels nice';
  } else if (state.temp > 50) {
    const dict = { key: require('/assets/ChickenTooCold.png') };
    landscapeImage.src = dict.key;
    landscapeText.textContent = "Where's Spring?";
  } else {
    const dict = { key: require('/assets/ChickenSuperCold.png') };
    landscapeImage.src = dict.key;
    landscapeText.textContent = "I'm not moving";
  }
};

const updateCity = () => {
  const updatedCity = document.getElementById('cityInput');
  const currentCity = document.getElementById('currentCity');
  state.city = updatedCity.value;
  currentCity.textContent = state.city;
};

const resetCityValue = () => {
  const updatedCity = document.getElementById('cityInput');
  const currentCity = document.getElementById('currentCity');
  state.city = 'World';
  state.temp = 70;
  updatedCity.value = state.city;
  currentCity.textContent = state.city;
  updateTempText();
};

const findLatitudeAndLongitude = () => {
  let latitude, longitude;
  axios
    .get('https://weather-report-proxy-server.herokuapp.com/location', {
      params: {
        q: state.city,
      },
    })
    .then((response) => {
      latitude = response.data[0].lat;
      longitude = response.data[0].lon;

      // make the next API call here!
      findTemperature(latitude, longitude);
    })
    .catch((error) => {
      console.log('error in findLatitudeAndLongitude!');
    });
};

const findTemperature = (latitude, longitude) => {
  axios
    .get('https://weather-report-proxy-server.herokuapp.com/weather', {
      params: {
        lat: latitude,
        lon: longitude,
      },
    })
    .then((response) => {
      const kelvin = response.data['current']['temp'];
      state.temp = convertKelvinToFahrenheit(kelvin);
      updateTempText();
      updateLandscape();
    })
    .catch((error) => {
      console.log('error in weather info!');
    });
};

// Convert Kelvin to Fahrenheit
const convertKelvinToFahrenheit = (kelvin) => {
  let fahrenheit;
  fahrenheit = parseInt(1.8 * (kelvin - 273) + 32);
  return fahrenheit;
};

const updateSky = () => {
  const skyValue = document.getElementById('skies').value;
  const background = document.querySelector('body');

  if (skyValue === 'sunny') {
    background.className = 'bg-sunny';
  } else if (skyValue === 'cloudy') {
    background.className = 'bg-cloudy';
  } else if (skyValue === 'rainy') {
    background.className = 'bg-rainy';
  } else if (skyValue === 'snowy') {
    background.className = 'bg-snowy';
  } else {
    background.className = 'bg-default';
  }
};

// register events
const registerEventHandlers = () => {
  updateCity();

  const increaseTemperature = document.getElementById('tempUp');
  increaseTemperature.addEventListener('click', increaseTemp);

  const decreaseTemperature = document.getElementById('tempDown');
  decreaseTemperature.addEventListener('click', decreaseTemp);

  const cityInputUpdate = document.getElementById('cityInput');
  cityInputUpdate.addEventListener('input', updateCity);

  const requestTemp = document.getElementById('getTemp');
  requestTemp.addEventListener('click', findLatitudeAndLongitude);

  const resetCity = document.getElementById('resetCity');
  resetCity.addEventListener('click', resetCityValue);

  const selectSky = document.querySelector('#skies');
  selectSky.addEventListener('change', updateSky);
};

// DOM listener
document.addEventListener('DOMContentLoaded', registerEventHandlers);

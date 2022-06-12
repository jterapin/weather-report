'use strict';

const state = {
  temp: 0,
  city: 'World',
};

const increaseTemp = () => {
  state.temp += 1;
  updateTempAppearance();
};

const decreaseTemp = () => {
  state.temp -= 1;
  updateTempAppearance();
};

const updateTempAppearance = () => {
  const tempCurrent = document.querySelector('#tempCurrent');
  tempCurrent.textContent = state.temp;

  const landscapeImage = document.querySelector('#landscape-img');
  const landscapeText = document.querySelector('#landscape-text');

  if (state.temp > 80) {
    tempCurrent.style.color = 'red';
    landscapeImage.src = 'assets/ChickenNotHappy.png';
    landscapeText.textContent = 'UGH TOO HOT';
  } else if (state.temp > 70) {
    tempCurrent.style.color = 'orange';
    landscapeImage.src = 'assets/ChickenHappy.png';
    landscapeText.textContent = "Let's go outside lol";
  } else if (state.temp > 60) {
    tempCurrent.style.color = 'yellow';
    landscapeImage.src = 'assets/ChickenJustRight.png';
    landscapeText.textContent = 'Ooo, feels nice';
  } else if (state.temp > 50) {
    tempCurrent.style.color = 'blue';
    landscapeImage.src = 'assets/ChickenTooCold.png';
    landscapeText.textContent = "Where's Spring?";
  } else {
    tempCurrent.style.color = 'aqua';
    landscapeImage.src = 'assets/ChickenSuperCold.png';
    landscapeText.textContent = "I'm not moving";
  }
};

const updateCity = () => {
  const updatedCity = document.getElementById('cityInput').value;
  const currentCity = document.getElementById('currentCity');
  state.city = updatedCity;
  currentCity.textContent = state.city;
};

const resetCityValue = () => {
  let updatedCity = document.getElementById('cityInput');
  const currentCity = document.getElementById('currentCity');
  state.city = 'World';
  updatedCity.value = state.city;
  currentCity.textContent = state.city;
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

const temp = document.getElementById('currentTemp');

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
      updateTempAppearance();
    })
    .catch((error) => {
      console.log('error in weather info!');
    });
};

const convertKelvinToFahrenheit = (kelvin) => {
  let fahrenheit;
  fahrenheit = parseInt(1.8 * (kelvin - 273) + 32);
  return fahrenheit;
};

// register events
const registerEventHandlers = () => {
  updateTempAppearance();
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
};

// DOM listener
document.addEventListener('DOMContentLoaded', registerEventHandlers);

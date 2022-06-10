'use strict';

const state = {
  temp: 80,
  city: 'World',
};

const increaseTemp = () => {
  state.temp += 1;
  updateTemp();
};

const decreaseTemp = () => {
  state.temp -= 1;
  updateTemp();
};

const updateTemp = () => {
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

// register events
const registerEventHandlers = () => {
  updateTemp();
  updateCity();

  const increaseTemperature = document.getElementById('tempUp');
  increaseTemperature.addEventListener('click', increaseTemp);

  const decreaseTemperature = document.getElementById('tempDown');
  decreaseTemperature.addEventListener('click', decreaseTemp);

  const cityInputUpdate = document.getElementById('cityInput');
  cityInputUpdate.addEventListener('input', updateCity);
};

// DOM listener
document.addEventListener('DOMContentLoaded', registerEventHandlers);

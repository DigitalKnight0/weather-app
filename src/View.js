const cityName = document.querySelector('.name');
const weatherIcon = document.querySelector('.main-icon');
const type = document.querySelector('.type');
const temp = document.querySelector('.temp');
const feelsLike = document.querySelector('.feels-like');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');

const populateDisplay = (data) => {
  cityName.textContent = data.name;
  weatherIcon.src = data.iconUrl;
  type.textContent = data.weatherType;
  temp.textContent = `Temprature: ${data.temp}`;
  feelsLike.textContent = `Feels Like: ${data.tempFeelsLike}`;
  wind.textContent = `Wind Speed: ${data.wind}`;
  humidity.textContent = `Humidity: ${data.humidity}`;
};

export default populateDisplay;

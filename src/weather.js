const filterData = (response) => ({
  name: response.name,
  iconUrl: `http://openweathermap.org/img/wn/${response.weather['0'].icon}@2x.png`,
  weatherType: response.weather['0'].description,
  temp: response.main.temp,
  tempFeelsLike: response.main.feels_like,
  wind: response.wind.speed,
  humidity: response.main.humidity,
});

const formatUnits = (weatherData, system) => {
  const data = { ...weatherData };
  const [tempUnit, windUnit] = system === 'imperial' ? ['\u00B0 F', 'mph'] : ['\u00B0 C', 'm/s'];
  data.temp = `${data.temp} ${tempUnit}`;
  data.tempFeelsLike = `${data.tempFeelsLike} ${tempUnit}`;
  data.wind = `${data.wind} ${windUnit}`;
  data.humidity = `${data.humidity} %`;
};

const getWeather = async (location, unitSystem) => {
  try {
    const data = await (await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${unitSystem}&appid=6f404c6c2feb1ace89f818a103284d50`)).json();
    if (data.message) throw new Error(data.message);
    const filteredData = filterData(data);
    formatUnits(filteredData, unitSystem);
    return filteredData;
  } catch (error) {
    return error;
  }
};

export default getWeather;

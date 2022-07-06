import getWeather from './weather';
import populateDisplay from './View';

const unitBtn = document.querySelector('.unit-btn');

const fetchData = async () => {
  try {
    const cityName = document.querySelector('.search-bar').value;
    const unitSystem = unitBtn.checked ? 'metric' : 'imperial';
    const data = await getWeather(cityName, unitSystem);
    if (data instanceof Error) throw data;
    populateDisplay(data);
  } catch (error) {
    alert(error);
  }
};

unitBtn.addEventListener('input', () => {
  const cityName = document.querySelector('.name').textContent;
  document.querySelector('.search-bar').value = cityName;
  fetchData();
  document.querySelector('.search-bar').value = '';
});

document.querySelector('.search').addEventListener('click', fetchData);
window.addEventListener('keydown', (e) => {
  if (document.activeElement === document.querySelector('.search-bar') && e.key === 'Enter') fetchData();
});

(async () => {
  const data = await getWeather('london', 'imperial');
  populateDisplay(data);
})();

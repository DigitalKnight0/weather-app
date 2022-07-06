/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/View.js":
/*!*********************!*\
  !*** ./src/View.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (populateDisplay);


/***/ }),

/***/ "./src/weather.js":
/*!************************!*\
  !*** ./src/weather.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getWeather);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _weather__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./weather */ "./src/weather.js");
/* harmony import */ var _View__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./View */ "./src/View.js");



const unitBtn = document.querySelector('.unit-btn');

const fetchData = async () => {
  try {
    const cityName = document.querySelector('.search-bar').value;
    const unitSystem = unitBtn.checked ? 'metric' : 'imperial';
    const data = await (0,_weather__WEBPACK_IMPORTED_MODULE_0__["default"])(cityName, unitSystem);
    if (data instanceof Error) throw data;
    (0,_View__WEBPACK_IMPORTED_MODULE_1__["default"])(data);
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
  const data = await (0,_weather__WEBPACK_IMPORTED_MODULE_0__["default"])('london', 'imperial');
  (0,_View__WEBPACK_IMPORTED_MODULE_1__["default"])(data);
})();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DLFVBQVU7QUFDOUMseUNBQXlDLG1CQUFtQjtBQUM1RCxvQ0FBb0MsVUFBVTtBQUM5QyxzQ0FBc0MsY0FBYztBQUNwRDs7QUFFQSxpRUFBZSxlQUFlLEVBQUM7Ozs7Ozs7Ozs7Ozs7OztBQ2xCL0I7QUFDQTtBQUNBLCtDQUErQywyQkFBMkI7QUFDMUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxpQkFBaUIsV0FBVyxFQUFFLFNBQVM7QUFDdkMsMEJBQTBCLG9CQUFvQixFQUFFLFNBQVM7QUFDekQsaUJBQWlCLFdBQVcsRUFBRSxTQUFTO0FBQ3ZDLHFCQUFxQixlQUFlO0FBQ3BDOztBQUVBO0FBQ0E7QUFDQSx5RkFBeUYsU0FBUyxTQUFTLFdBQVc7QUFDdEg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBLGlFQUFlLFVBQVUsRUFBQzs7Ozs7OztVQy9CMUI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7QUNObUM7QUFDRTs7QUFFckM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsb0RBQVU7QUFDakM7QUFDQSxJQUFJLGlEQUFlO0FBQ25CLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBLHFCQUFxQixvREFBVTtBQUMvQixFQUFFLGlEQUFlO0FBQ2pCLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9WaWV3LmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL3dlYXRoZXIuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBjaXR5TmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uYW1lJyk7XG5jb25zdCB3ZWF0aGVySWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYWluLWljb24nKTtcbmNvbnN0IHR5cGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudHlwZScpO1xuY29uc3QgdGVtcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50ZW1wJyk7XG5jb25zdCBmZWVsc0xpa2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmVlbHMtbGlrZScpO1xuY29uc3Qgd2luZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53aW5kJyk7XG5jb25zdCBodW1pZGl0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5odW1pZGl0eScpO1xuXG5jb25zdCBwb3B1bGF0ZURpc3BsYXkgPSAoZGF0YSkgPT4ge1xuICBjaXR5TmFtZS50ZXh0Q29udGVudCA9IGRhdGEubmFtZTtcbiAgd2VhdGhlckljb24uc3JjID0gZGF0YS5pY29uVXJsO1xuICB0eXBlLnRleHRDb250ZW50ID0gZGF0YS53ZWF0aGVyVHlwZTtcbiAgdGVtcC50ZXh0Q29udGVudCA9IGBUZW1wcmF0dXJlOiAke2RhdGEudGVtcH1gO1xuICBmZWVsc0xpa2UudGV4dENvbnRlbnQgPSBgRmVlbHMgTGlrZTogJHtkYXRhLnRlbXBGZWVsc0xpa2V9YDtcbiAgd2luZC50ZXh0Q29udGVudCA9IGBXaW5kIFNwZWVkOiAke2RhdGEud2luZH1gO1xuICBodW1pZGl0eS50ZXh0Q29udGVudCA9IGBIdW1pZGl0eTogJHtkYXRhLmh1bWlkaXR5fWA7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBwb3B1bGF0ZURpc3BsYXk7XG4iLCJjb25zdCBmaWx0ZXJEYXRhID0gKHJlc3BvbnNlKSA9PiAoe1xuICBuYW1lOiByZXNwb25zZS5uYW1lLFxuICBpY29uVXJsOiBgaHR0cDovL29wZW53ZWF0aGVybWFwLm9yZy9pbWcvd24vJHtyZXNwb25zZS53ZWF0aGVyWycwJ10uaWNvbn1AMngucG5nYCxcbiAgd2VhdGhlclR5cGU6IHJlc3BvbnNlLndlYXRoZXJbJzAnXS5kZXNjcmlwdGlvbixcbiAgdGVtcDogcmVzcG9uc2UubWFpbi50ZW1wLFxuICB0ZW1wRmVlbHNMaWtlOiByZXNwb25zZS5tYWluLmZlZWxzX2xpa2UsXG4gIHdpbmQ6IHJlc3BvbnNlLndpbmQuc3BlZWQsXG4gIGh1bWlkaXR5OiByZXNwb25zZS5tYWluLmh1bWlkaXR5LFxufSk7XG5cbmNvbnN0IGZvcm1hdFVuaXRzID0gKHdlYXRoZXJEYXRhLCBzeXN0ZW0pID0+IHtcbiAgY29uc3QgZGF0YSA9IHsgLi4ud2VhdGhlckRhdGEgfTtcbiAgY29uc3QgW3RlbXBVbml0LCB3aW5kVW5pdF0gPSBzeXN0ZW0gPT09ICdpbXBlcmlhbCcgPyBbJ1xcdTAwQjAgRicsICdtcGgnXSA6IFsnXFx1MDBCMCBDJywgJ20vcyddO1xuICBkYXRhLnRlbXAgPSBgJHtkYXRhLnRlbXB9ICR7dGVtcFVuaXR9YDtcbiAgZGF0YS50ZW1wRmVlbHNMaWtlID0gYCR7ZGF0YS50ZW1wRmVlbHNMaWtlfSAke3RlbXBVbml0fWA7XG4gIGRhdGEud2luZCA9IGAke2RhdGEud2luZH0gJHt3aW5kVW5pdH1gO1xuICBkYXRhLmh1bWlkaXR5ID0gYCR7ZGF0YS5odW1pZGl0eX0gJWA7XG59O1xuXG5jb25zdCBnZXRXZWF0aGVyID0gYXN5bmMgKGxvY2F0aW9uLCB1bml0U3lzdGVtKSA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IChhd2FpdCBmZXRjaChgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L3dlYXRoZXI/cT0ke2xvY2F0aW9ufSZ1bml0cz0ke3VuaXRTeXN0ZW19JmFwcGlkPTZmNDA0YzZjMmZlYjFhY2U4OWY4MThhMTAzMjg0ZDUwYCkpLmpzb24oKTtcbiAgICBpZiAoZGF0YS5tZXNzYWdlKSB0aHJvdyBuZXcgRXJyb3IoZGF0YS5tZXNzYWdlKTtcbiAgICBjb25zdCBmaWx0ZXJlZERhdGEgPSBmaWx0ZXJEYXRhKGRhdGEpO1xuICAgIGZvcm1hdFVuaXRzKGZpbHRlcmVkRGF0YSwgdW5pdFN5c3RlbSk7XG4gICAgcmV0dXJuIGZpbHRlcmVkRGF0YTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4gZXJyb3I7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGdldFdlYXRoZXI7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBnZXRXZWF0aGVyIGZyb20gJy4vd2VhdGhlcic7XG5pbXBvcnQgcG9wdWxhdGVEaXNwbGF5IGZyb20gJy4vVmlldyc7XG5cbmNvbnN0IHVuaXRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudW5pdC1idG4nKTtcblxuY29uc3QgZmV0Y2hEYXRhID0gYXN5bmMgKCkgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IGNpdHlOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlYXJjaC1iYXInKS52YWx1ZTtcbiAgICBjb25zdCB1bml0U3lzdGVtID0gdW5pdEJ0bi5jaGVja2VkID8gJ21ldHJpYycgOiAnaW1wZXJpYWwnO1xuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBnZXRXZWF0aGVyKGNpdHlOYW1lLCB1bml0U3lzdGVtKTtcbiAgICBpZiAoZGF0YSBpbnN0YW5jZW9mIEVycm9yKSB0aHJvdyBkYXRhO1xuICAgIHBvcHVsYXRlRGlzcGxheShkYXRhKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBhbGVydChlcnJvcik7XG4gIH1cbn07XG5cbnVuaXRCdG4uYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoKSA9PiB7XG4gIGNvbnN0IGNpdHlOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5hbWUnKS50ZXh0Q29udGVudDtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlYXJjaC1iYXInKS52YWx1ZSA9IGNpdHlOYW1lO1xuICBmZXRjaERhdGEoKTtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlYXJjaC1iYXInKS52YWx1ZSA9ICcnO1xufSk7XG5cbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWFyY2gnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZldGNoRGF0YSk7XG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIChlKSA9PiB7XG4gIGlmIChkb2N1bWVudC5hY3RpdmVFbGVtZW50ID09PSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VhcmNoLWJhcicpICYmIGUua2V5ID09PSAnRW50ZXInKSBmZXRjaERhdGEoKTtcbn0pO1xuXG4oYXN5bmMgKCkgPT4ge1xuICBjb25zdCBkYXRhID0gYXdhaXQgZ2V0V2VhdGhlcignbG9uZG9uJywgJ2ltcGVyaWFsJyk7XG4gIHBvcHVsYXRlRGlzcGxheShkYXRhKTtcbn0pKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=
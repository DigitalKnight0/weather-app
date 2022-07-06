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
const cityName = document.querySelector('.name')
const weatherIcon = document.querySelector('.main-icon')
const type = document.querySelector('.type')
const temp = document.querySelector('.temp')
const feelsLike = document.querySelector('.feels-like')
const wind = document.querySelector('.wind')
const humidity = document.querySelector('.humidity')

const populateDisplay = (data) => {
    cityName.textContent = data.name
    weatherIcon.src = data.iconUrl
    type.textContent = data.weatherType
    temp.textContent = `Temprature: ${data.temp}`
    feelsLike.textContent = `Feels Like: ${data.tempFeelsLike}`
    wind.textContent = `Wind Speed: ${data.wind}`
    humidity.textContent = `Humidity: ${data.humidity}`
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (populateDisplay);



/***/ }),

/***/ "./src/weather.js":
/*!************************!*\
  !*** ./src/weather.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getWeather": () => (/* binding */ getWeather)
/* harmony export */ });
const filterData = (response) => {
    return {
        name: response.name,
        iconUrl: `http://openweathermap.org/img/wn/${response.weather['0'].icon}@2x.png`,
        weatherType: response.weather['0'].description,
        temp: response.main.temp,
        tempFeelsLike: response.main.feels_like,
        wind: response.wind.speed,
        humidity: response.main.humidity
    }
}

const formatUnits = (data, system) => {
    const [tempUnit, windUnit] = system === 'imperial' ? ['\u00B0 F', 'mph'] : ['\u00B0 C', 'm/s']
    data.temp = data.temp + ' ' + tempUnit
    data.tempFeelsLike = data.tempFeelsLike + ' ' + tempUnit
    data.wind = data.wind + ' ' + windUnit
    data.humidity = data.humidity + ' %'
}

const getWeather = async (location, unitSystem) => {
    try{
        const data = await (await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${unitSystem}&appid=6f404c6c2feb1ace89f818a103284d50`)).json()
        if(data.message) throw new Error(data.message)
        const filteredData = filterData(data)
        formatUnits(filteredData, unitSystem)
        return filteredData
    }
    catch(error){
        return error
    }
}



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



const unitBtn = document.querySelector('.unit-btn')

const fetchData = async () => {
    try{
        const cityName = document.querySelector('.search-bar').value
        const unitSystem = unitBtn.checked ? 'metric' : 'imperial'
        const data = await (0,_weather__WEBPACK_IMPORTED_MODULE_0__.getWeather)(cityName, unitSystem)
        if(data instanceof Error) throw data
        ;(0,_View__WEBPACK_IMPORTED_MODULE_1__["default"])(data)
    } catch(error){
        alert(error)
    }
}

unitBtn.addEventListener('input', (e) => {
    const cityName = document.querySelector('.name').textContent
    document.querySelector('.search-bar').value = cityName
    fetchData()
    document.querySelector('.search-bar').value = ''
})

document.querySelector('.search').addEventListener('click', fetchData);
window.addEventListener('keydown', (e) => {
    if(document.activeElement === document.querySelector('.search-bar') && e.key === 'Enter') fetchData()
});

(async () => {
    const data = await (0,_weather__WEBPACK_IMPORTED_MODULE_0__.getWeather)('london', 'imperial')
    ;(0,_View__WEBPACK_IMPORTED_MODULE_1__["default"])(data)
})()

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLFVBQVU7QUFDaEQsMkNBQTJDLG1CQUFtQjtBQUM5RCxzQ0FBc0MsVUFBVTtBQUNoRCx3Q0FBd0MsY0FBYztBQUN0RDs7QUFFQSxpRUFBZSxlQUFlOzs7Ozs7Ozs7Ozs7Ozs7O0FDbEI5QjtBQUNBO0FBQ0E7QUFDQSxxREFBcUQsMkJBQTJCO0FBQ2hGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw2RkFBNkYsU0FBUyxTQUFTLFdBQVc7QUFDMUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztVQy9CQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7OztBQ051QztBQUNIOztBQUVwQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixvREFBVTtBQUNyQztBQUNBLFFBQVEsa0RBQWU7QUFDdkIsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0EsdUJBQXVCLG9EQUFVO0FBQ2pDLElBQUksa0RBQWU7QUFDbkIsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL1ZpZXcuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvd2VhdGhlci5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGNpdHlOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5hbWUnKVxuY29uc3Qgd2VhdGhlckljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWFpbi1pY29uJylcbmNvbnN0IHR5cGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudHlwZScpXG5jb25zdCB0ZW1wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRlbXAnKVxuY29uc3QgZmVlbHNMaWtlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZlZWxzLWxpa2UnKVxuY29uc3Qgd2luZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53aW5kJylcbmNvbnN0IGh1bWlkaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmh1bWlkaXR5JylcblxuY29uc3QgcG9wdWxhdGVEaXNwbGF5ID0gKGRhdGEpID0+IHtcbiAgICBjaXR5TmFtZS50ZXh0Q29udGVudCA9IGRhdGEubmFtZVxuICAgIHdlYXRoZXJJY29uLnNyYyA9IGRhdGEuaWNvblVybFxuICAgIHR5cGUudGV4dENvbnRlbnQgPSBkYXRhLndlYXRoZXJUeXBlXG4gICAgdGVtcC50ZXh0Q29udGVudCA9IGBUZW1wcmF0dXJlOiAke2RhdGEudGVtcH1gXG4gICAgZmVlbHNMaWtlLnRleHRDb250ZW50ID0gYEZlZWxzIExpa2U6ICR7ZGF0YS50ZW1wRmVlbHNMaWtlfWBcbiAgICB3aW5kLnRleHRDb250ZW50ID0gYFdpbmQgU3BlZWQ6ICR7ZGF0YS53aW5kfWBcbiAgICBodW1pZGl0eS50ZXh0Q29udGVudCA9IGBIdW1pZGl0eTogJHtkYXRhLmh1bWlkaXR5fWBcbn1cblxuZXhwb3J0IGRlZmF1bHQgcG9wdWxhdGVEaXNwbGF5XG5cbiIsImNvbnN0IGZpbHRlckRhdGEgPSAocmVzcG9uc2UpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICBuYW1lOiByZXNwb25zZS5uYW1lLFxuICAgICAgICBpY29uVXJsOiBgaHR0cDovL29wZW53ZWF0aGVybWFwLm9yZy9pbWcvd24vJHtyZXNwb25zZS53ZWF0aGVyWycwJ10uaWNvbn1AMngucG5nYCxcbiAgICAgICAgd2VhdGhlclR5cGU6IHJlc3BvbnNlLndlYXRoZXJbJzAnXS5kZXNjcmlwdGlvbixcbiAgICAgICAgdGVtcDogcmVzcG9uc2UubWFpbi50ZW1wLFxuICAgICAgICB0ZW1wRmVlbHNMaWtlOiByZXNwb25zZS5tYWluLmZlZWxzX2xpa2UsXG4gICAgICAgIHdpbmQ6IHJlc3BvbnNlLndpbmQuc3BlZWQsXG4gICAgICAgIGh1bWlkaXR5OiByZXNwb25zZS5tYWluLmh1bWlkaXR5XG4gICAgfVxufVxuXG5jb25zdCBmb3JtYXRVbml0cyA9IChkYXRhLCBzeXN0ZW0pID0+IHtcbiAgICBjb25zdCBbdGVtcFVuaXQsIHdpbmRVbml0XSA9IHN5c3RlbSA9PT0gJ2ltcGVyaWFsJyA/IFsnXFx1MDBCMCBGJywgJ21waCddIDogWydcXHUwMEIwIEMnLCAnbS9zJ11cbiAgICBkYXRhLnRlbXAgPSBkYXRhLnRlbXAgKyAnICcgKyB0ZW1wVW5pdFxuICAgIGRhdGEudGVtcEZlZWxzTGlrZSA9IGRhdGEudGVtcEZlZWxzTGlrZSArICcgJyArIHRlbXBVbml0XG4gICAgZGF0YS53aW5kID0gZGF0YS53aW5kICsgJyAnICsgd2luZFVuaXRcbiAgICBkYXRhLmh1bWlkaXR5ID0gZGF0YS5odW1pZGl0eSArICcgJSdcbn1cblxuY29uc3QgZ2V0V2VhdGhlciA9IGFzeW5jIChsb2NhdGlvbiwgdW5pdFN5c3RlbSkgPT4ge1xuICAgIHRyeXtcbiAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IChhd2FpdCBmZXRjaChgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L3dlYXRoZXI/cT0ke2xvY2F0aW9ufSZ1bml0cz0ke3VuaXRTeXN0ZW19JmFwcGlkPTZmNDA0YzZjMmZlYjFhY2U4OWY4MThhMTAzMjg0ZDUwYCkpLmpzb24oKVxuICAgICAgICBpZihkYXRhLm1lc3NhZ2UpIHRocm93IG5ldyBFcnJvcihkYXRhLm1lc3NhZ2UpXG4gICAgICAgIGNvbnN0IGZpbHRlcmVkRGF0YSA9IGZpbHRlckRhdGEoZGF0YSlcbiAgICAgICAgZm9ybWF0VW5pdHMoZmlsdGVyZWREYXRhLCB1bml0U3lzdGVtKVxuICAgICAgICByZXR1cm4gZmlsdGVyZWREYXRhXG4gICAgfVxuICAgIGNhdGNoKGVycm9yKXtcbiAgICAgICAgcmV0dXJuIGVycm9yXG4gICAgfVxufVxuXG5leHBvcnQge2dldFdlYXRoZXJ9IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBnZXRXZWF0aGVyIH0gZnJvbSBcIi4vd2VhdGhlclwiO1xuaW1wb3J0IHBvcHVsYXRlRGlzcGxheSBmcm9tICcuL1ZpZXcnXG5cbmNvbnN0IHVuaXRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudW5pdC1idG4nKVxuXG5jb25zdCBmZXRjaERhdGEgPSBhc3luYyAoKSA9PiB7XG4gICAgdHJ5e1xuICAgICAgICBjb25zdCBjaXR5TmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWFyY2gtYmFyJykudmFsdWVcbiAgICAgICAgY29uc3QgdW5pdFN5c3RlbSA9IHVuaXRCdG4uY2hlY2tlZCA/ICdtZXRyaWMnIDogJ2ltcGVyaWFsJ1xuICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgZ2V0V2VhdGhlcihjaXR5TmFtZSwgdW5pdFN5c3RlbSlcbiAgICAgICAgaWYoZGF0YSBpbnN0YW5jZW9mIEVycm9yKSB0aHJvdyBkYXRhXG4gICAgICAgIHBvcHVsYXRlRGlzcGxheShkYXRhKVxuICAgIH0gY2F0Y2goZXJyb3Ipe1xuICAgICAgICBhbGVydChlcnJvcilcbiAgICB9XG59XG5cbnVuaXRCdG4uYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoZSkgPT4ge1xuICAgIGNvbnN0IGNpdHlOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5hbWUnKS50ZXh0Q29udGVudFxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWFyY2gtYmFyJykudmFsdWUgPSBjaXR5TmFtZVxuICAgIGZldGNoRGF0YSgpXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlYXJjaC1iYXInKS52YWx1ZSA9ICcnXG59KVxuXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VhcmNoJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmZXRjaERhdGEpO1xud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZSkgPT4ge1xuICAgIGlmKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWFyY2gtYmFyJykgJiYgZS5rZXkgPT09ICdFbnRlcicpIGZldGNoRGF0YSgpXG59KTtcblxuKGFzeW5jICgpID0+IHtcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgZ2V0V2VhdGhlcignbG9uZG9uJywgJ2ltcGVyaWFsJylcbiAgICBwb3B1bGF0ZURpc3BsYXkoZGF0YSlcbn0pKClcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
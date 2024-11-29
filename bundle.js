/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Style.css":
/*!***********************!*\
  !*** ./src/Style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://comments/./src/Style.css?");

/***/ }),

/***/ "./src/Comments.js":
/*!*************************!*\
  !*** ./src/Comments.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Style.css */ \"./src/Style.css\");\n\r\n\r\nlet butt = document.querySelector('.send');\r\nlet list = document.querySelector('.list');\r\nconst input = document.querySelector('#notes');\r\nlet note = document.getElementsByClassName('note');\r\n\r\n// Проверка на наличие ключа\r\nfunction checkData() {\r\n    const checking = localStorage.getItem('data');\r\n    if (!checking) {\r\n        localStorage.setItem('data', JSON.stringify([{title: 'Первая заметка'}]))\r\n    }\r\n\r\n}\r\n\r\ncheckData();\r\n\r\n// Последующий вывод\r\nconst parsing = JSON.parse(localStorage.data);\r\n\r\n\r\nfunction renderNotes() {\r\n    list.innerHTML = '';\r\n    localStorage.setItem('data', JSON.stringify(parsing));\r\n    for (let i = 0; i < parsing.length; i++) {\r\n        list.insertAdjacentHTML('beforeend', getNote(parsing[i], i))\r\n    }\r\n    if (parsing.length === 0) {\r\n        list.innerHTML = `<p style='font-size: 30px; margin: 0'>Заметок нет<p>`;\r\n    }\r\n\r\n}\r\n\r\nrenderNotes();\r\n\r\n\r\n//Обработчик, который добавляет новую заметку при нажатии на кнопку\r\nbutt.onclick = function() {\r\n    const notes = {\r\n        title: input.value,\r\n    }\r\n\r\n    if (input.value.length >= 5 && input.value.length <= 50) {\r\n        list.innerHTML = '';\r\n        parsing.push(notes);\r\n        renderNotes();\r\n    }\r\n\r\n    else {input.focus(); viewAlert();}\r\n\r\n    input.value = '';\r\n}\r\n\r\nlist.onclick = function(event) {\r\n    const {type, id} = event.target.dataset;\r\n    if(type === 'remove') {\r\n        list.innerHTML = '';\r\n        parsing.splice(id, 1);\r\n        renderNotes();\r\n    }\r\n    else if (type === 'update') {\r\n        list.innerHTML = '' //Сделано для того, чтобы не допустить открытия 2 окон редактирования\r\n        renderNotes();\r\n        note[id].innerHTML = '';\r\n        note[id].insertAdjacentHTML('beforeend', getUpdateNotes(parsing[id], id));\r\n    }\r\n\r\n    else if (type === 'save') {\r\n        if (up.value) {\r\n            if (up.value.length >= 3 && up.value.length <= 50) {\r\n                parsing[id].title = up.value;\r\n                list.innerHTML = '';\r\n                renderNotes();\r\n            }\r\n            else {\r\n                up.focus();\r\n                viewAlert();\r\n            }\r\n        }\r\n        \r\n    }\r\n\r\n    else if (type == 'cancel') {\r\n        list.innerHTML = '';\r\n        renderNotes();\r\n    }\r\n}\r\n\r\n    function getNote(value, id) {\r\n        return `\r\n        <div class='note' data-id = ${id}>\r\n            <p class='text'>${value.title}</p>\r\n            <button class='update' data-id = ${id} data-type = 'update'>Редактировать</button>\r\n            <button class='delete' data-id = ${id} data-type = 'remove'>Удалить</button>\r\n        </div>\r\n        `\r\n    }\r\n\r\n    function getUpdateNotes(value, id) {\r\n        return `\r\n        <div class='updating' data-id = ${id}>\r\n            <input type='text' id='up' value = '${value.title}' ></input>\r\n            <button class='add' data-id = ${id} data-type = 'save'>Сохранить</button>\r\n            <button class='cancel' data-id = ${id} data-type = 'cancel'>Отмена</button>\r\n        </div>\r\n        `\r\n    }\r\n\r\n    function viewAlert() {\r\n        const alertBlock = document.createElement('div');\r\n        alertBlock.className = 'alert';\r\n        \r\n        const text = document.createElement('span');\r\n        text.style.cssText = ``;\r\n        text.textContent = 'Ошибка, недопустимый размер строки'\r\n\r\n        alertBlock.appendChild(text);\r\n        document.body.append(alertBlock);\r\n\r\n        setTimeout(()=> alertBlock.remove(), 3500)\r\n    }\r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack://comments/./src/Comments.js?");

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/Comments.js");
/******/ 	
/******/ })()
;
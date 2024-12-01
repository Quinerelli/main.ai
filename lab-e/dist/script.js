/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/*!*******************!*\
  !*** ./script.ts ***!
  \*******************/


var msg = "Hello!";
alert(msg);
var styles = ['styles/strona.css', 'styles/strona2.css', 'styles/strona3.css'];
// Referencja do elementu <link> w HTML
var themeLink = document.getElementById('theme-link');
// Funkcja zmieniająca styl CSS
function changeStyle(styleIndex) {
  if (themeLink) {
    themeLink.setAttribute('href', styles[styleIndex]);
    localStorage.setItem('currentStyle', styleIndex.toString());
  }
}
// Funkcja generująca przyciski do zmiany stylu
function generateLinks() {
  var container = document.getElementById('style-links');
  if (container) {
    styles.forEach(function (style, index) {
      var button = document.createElement('button');
      button.innerText = "Styl ".concat(index + 1);
      button.id = "style".concat(index + 1);
      button.addEventListener('click', function () {
        return changeStyle(index);
      });
      container.appendChild(button);
    });
  }
}
// Funkcja do ustawiania stylu na podstawie zapisanej wartości w localStorage
function loadStoredStyle() {
  var storedStyle = localStorage.getItem('currentStyle');
  if (storedStyle && themeLink) {
    var styleIndex = parseInt(storedStyle);
    themeLink.setAttribute('href', styles[styleIndex]);
  }
}
// Inicjalizacja
window.onload = function () {
  loadStoredStyle();
  generateLinks();
};
/******/ })()
;
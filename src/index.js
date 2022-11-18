import './assets/css/styles.css';
import ForexService from './../src/js/forexservice.js';

window.addEventListener('load', function () {

console.log(`${process.env.API_KEY}`);
let response = ForexService.getForexUsd();
console.log(`${response}`);
});

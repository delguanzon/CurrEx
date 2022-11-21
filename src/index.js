import './assets/css/styles.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import ForexService from './../src/js/forexservice.js';

//Business Logic
async function getForexUSD() {
  const response = await ForexService.getForexUsd();
  if (response.conversion_rates) {
    printConversion(response);
  } else {
    printError(response);
  }
}

async function getSymbols() {
  const response = await ForexService.getSymbols();
  if (response.success === true) {
    displaySymbols(response);
  } else {
    printError(response);
  }
}

async function getForexAny(base, conv, amount) {
  const response = await ForexService.getForexAny(base, conv, amount);
  if (response.success === true) {
    printPairConvert(response);
  } else {
    printError(response);
  }
}

function getConvertedValue(rate, amount) {
  return parseFloat(rate) * parseFloat(amount);
}

//UI Logic

function printConversion(response) {

  const curr = document.getElementById("currency").value;
  const rate = response.conversion_rates[curr];
  let amount = document.getElementById("amount").value;
  if (!amount) {
    amount = 1;
    document.getElementById("amount").value = 1;
  }
  document.getElementById("forexAmount").value = getConvertedValue(rate, amount).toFixed(2);
}

function printPairConvert(response) {
  const value = response.result;
  console.log(value);
  document.getElementById('forex-amt2').value = value;
}

function printError(error) {
  document.getElementById("error").replaceChildren("We've encountered an error: " + error + " Please try again later.");
}

function handleFormSubmission(e) {
  e.preventDefault();
  getForexUSD();
  let fetchCtr = parseInt(sessionStorage.getItem("fetchCtr"));
  let seshCtr = parseInt(sessionStorage.getItem("seshCtr"));
  console.log('Number of times a fetch happened: ' + fetchCtr);
  console.log('Number of times a sessionCall happened: ' + seshCtr);
}

function handleKeypress() {
  let base = document.getElementById("curr1").value;
  let conv = document.getElementById("curr2").value;
  let amount = document.getElementById("forex-amt1").value;
  getForexAny(base, conv, amount);
}

function displaySymbols(response) {
  const select = document.querySelectorAll(".currency");
  select.forEach( element => {
    element.replaceChildren();
    console.log(element);
    Object.values(response.symbols).forEach( obj => {
      let code = document.createElement("option");
      code.append(obj.code);
      element.append(code);
    });
  });
}

window.addEventListener('load', function () {
  sessionStorage.setItem("fetchCtr", 0);
  sessionStorage.setItem("seshCtr", 0);
  getSymbols();
  document.getElementById('form').addEventListener('submit', handleFormSubmission);
  document.getElementById('pair-grp').addEventListener('keyup', handleKeypress);
});
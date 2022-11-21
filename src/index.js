import './assets/css/styles.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import ForexService from './../src/js/forexservice.js';

//Business Logic
async function getForexUSD() {
  const response = await ForexService.getForexUsd();
  let fetchCtr = parseInt(sessionStorage.getItem("fetchCtr"));
  let seshCtr = parseInt(sessionStorage.getItem("seshCtr"));
  console.log('Number of times a fetch happened: ' + fetchCtr);
  console.log('Number of times a sessionCall happened: ' + seshCtr);
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

async function getForexAny(base, conv, amount, target) {
  const response = await ForexService.getForexAny(base, conv, amount);
  if (response.result && response.result != null) {
    printPairConvert(response, target);
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
  document.getElementById("error").replaceChildren("");
  let amount = parseInt(document.getElementById("amount").value);
  if (!amount) {
    amount = 1;
    document.getElementById("amount").value = 1;
  }
  document.getElementById("forex-amount").value = getConvertedValue(rate, amount).toFixed(2);
}

function printPairConvert(response, target) {
  const div = document.getElementById("pair-direction");
  const value = response.result;  
  div.setAttribute("class", "input-group-text text-bg-success");
  document.getElementById(`${target}`).value = value.toFixed(2);
}

function printError(error) {
  document.getElementById("error").replaceChildren("We've encountered an error: " + error + " Please try again later.");
}

function handleFormSubmission(e) {
  e.preventDefault();
  getForexUSD();  
}

function handleKeyup(e) {
  const curr1 = document.getElementById("curr1").value;
  const curr2 = document.getElementById("curr2").value;
  const amount = parseInt(document.getElementById(e.target.id).value);
  if(!isNaN(amount)){
    document.getElementById("error").replaceChildren("");
    if (e.target.id === "forex-amt1") {
      getForexAny(curr1, curr2, amount, "forex-amt2");
    }
    else if (e.target.id === "forex-amt2") {
      getForexAny(curr2, curr1, amount, "forex-amt1");
    }
  } else printError("NaN");
}

function handleKeydown(e) {
  const div = document.getElementById("pair-direction");
  let i = document.createElement("i");

  if (e.target.id === "forex-amt1")
    i.setAttribute("class", "bi bi-caret-right-fill");
  if (e.target.id === "forex-amt2")
    i.setAttribute("class", "bi bi-caret-left-fill");

  div.setAttribute("class", "input-group-text text-bg-danger");
  div.replaceChildren(i);
}

function handleSymbolClick(e) {
  const symbolData = JSON.parse(sessionStorage.getItem("symbolData"));

  switch (e.target.id) {
  case ('currency'): {
    const input = document.getElementById('forex-amount');
    const lbl = document.getElementById('lbl1');
    input.value = "";
    input.setAttribute("placeholder", symbolData.symbols[e.target.value].description);
    lbl.replaceChildren(symbolData.symbols[e.target.value].description);
    break;
  }
  case ('curr1'): {
    const input = document.getElementById('forex-amt1');
    const lbl = document.getElementById('lbl2');
    input.value = "";
    input.setAttribute("placeholder", symbolData.symbols[e.target.value].description);
    lbl.replaceChildren(symbolData.symbols[e.target.value].description);
    break;
  }
  case ('curr2'): {
    const input = document.getElementById('forex-amt2');
    const lbl = document.getElementById('lbl3');
    input.value = "";
    input.setAttribute("placeholder", symbolData.symbols[e.target.value].description);
    lbl.replaceChildren(symbolData.symbols[e.target.value].description);
    break;
  }
  default: break;
  }
}

function displaySymbols(response) {
  const select = document.querySelectorAll(".currency");
  select.forEach(element => {
    element.replaceChildren();
    element.addEventListener('click', handleSymbolClick);
    Object.values(response.symbols).forEach(obj => {
      let code = document.createElement("option");
      code.append(obj.code);
      element.append(code);
    });
  });

  const currency = document.getElementById('currency').value;
  const curr1 = document.getElementById('curr1').value;
  const curr2 = document.getElementById('curr2').value;

  document.getElementById('lbl1').replaceChildren(response.symbols[currency].description);
  document.getElementById('lbl2').replaceChildren(response.symbols[curr1].description);
  document.getElementById('lbl3').replaceChildren(response.symbols[curr2].description);
}

window.addEventListener('load', function () {
  sessionStorage.setItem("fetchCtr", 0);
  sessionStorage.setItem("seshCtr", 0);
  getSymbols();
  document.getElementById('form').addEventListener('submit', handleFormSubmission);
  document.getElementById('pair-grp').addEventListener('keyup', handleKeyup);
  document.getElementById('pair-grp').addEventListener('keyup', handleKeydown);
});
import './assets/css/styles.css';
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


function printError(error) {
  document.getElementById("error").replaceChildren("We've encountered an error: " + error + " Please try again later.");
}


function handleFormSubmission(e) {
  e.preventDefault();
  getForexUSD();

}


window.addEventListener('load', function () {
  document.getElementById('form').addEventListener('submit', handleFormSubmission);
  console.log(`${process.env.API_KEY}`);
  let response = ForexService.getForexUsd();
  console.log(`${response}`);
});

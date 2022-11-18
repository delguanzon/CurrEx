import './assets/css/styles.css';
import ForexService from './../src/js/forexservice.js';


//Business Logic
async function getForexUSD() {
  const response = await ForexService.getForexUsd();
  if (response.conversion_rates) {
    printConversion(response);
  } else {
    console.log(response);
  }
}


function printConversion(response) {
  document.getElementById("forexAmount").value = response.conversion_rates.PHP;
}

function handleFormSubmission(e) {
  e.preventDefault();
  getForexUSD();

}

//UI Logic
window.addEventListener('load', function () {
  document.getElementById('form').addEventListener('submit', handleFormSubmission);
  console.log(`${process.env.API_KEY}`);
  let response = ForexService.getForexUsd();
  console.log(`${response}`);
});

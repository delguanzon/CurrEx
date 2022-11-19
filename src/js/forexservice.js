export default class ForexService {


  //exchangerate-api.com fetch logic
  static async getForexUsd() {
    let sessionData = sessionStorage.getItem("forexData");
    let fetchCtr = parseInt(sessionStorage.getItem("fetchCtr"));
    let seshCtr = parseInt(sessionStorage.getItem("seshCtr"));
    
    if (!sessionData) {
      try {
        const response = await fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/USD`);
        const jsonResponse = await response.json();
        if (!response.ok) {
          const errorMessage = `${response.status} ${response.statusText} ${jsonResponse.message}`;
          throw new Error(errorMessage);
        }
        sessionStorage.setItem("forexData", JSON.stringify(jsonResponse));
        fetchCtr += 1;
        sessionStorage.setItem("fetchCtr", fetchCtr);
        return jsonResponse;
      }
      catch (error) {
        return error;
      }
    }
    else {
      seshCtr += 1;
      sessionStorage.setItem("seshCtr", seshCtr);
      return JSON.parse(sessionData);
    }
  }

  //exchangerate.host fetch logic
  static async getSymbols() {
    try {
      const response = await fetch(`https://api.exchangerate.host/symbols`);
      const jsonResponse = await response.json();
      if (!response.ok) {
        const errorMessage = `${response.status} ${response.statusText} ${jsonResponse.message}`;
        throw new Error(errorMessage);
      }
      return jsonResponse;
    }
    catch (error) {
      return error;
    }
  }

}
#  Currency Exchange Calculator

#### By Yodel Guanzon <yodelguanzon@gmail.com>

#### This is an independent project to test out our skills with API calls and async function.

## Technologies Used

* Git
* HTML
* Javascript
* NodeJS
* ESLint
* JEST
* Babel
* Webpack
* Html Loader
* DotEnv
* Bootstrap

## Description

This is a webapp for converting US Dollar Amount into the user's selected currency using the Exchange Rate API <https://www.exchangerate-api.com/>

## Setup/Installation Requirements

* Clone this repository on your desktop
* Navigate to the top level of the directory using bash or cmd
* Run ``` $npm install ``` to install dependencies
* For building and live preview, use ```npm run start```

### API Key Setup Instructions

#### Where to get the API key

* Visit the ExchangeRate-API site <https://www.exchangerate-api.com/>. Input your email address and click the "Get Free Key" button.
* You'll be prompted to create an account with your email, first name and a password. Agree to the terms of use and click "Get Started!"
* At this point, you'll be able to access a dashboard that includes your API key as well as your remaining API calls for the month


#### How to use the API Key in the project

* Using your window explorer, Create a .env file in the top level of the directory .
* Edit the file and type in ``` API_KEY=YOUR+API+KEY+HERE ```  , where you replace the value with your own API Key.

OR 

* Using bash or the command line, Navigate to the top level of the directory and type the following command in your terminal:

  ```touch .env | echo "API_KEY=<YOUR+API+KEY+HERE>" >.env ```

  where <YOUR+API+KEY+HERE> should be replaced by the api key.

Your .env file should have something smilar to this:
```API_KEY=1232131276321671312```

## Known Bugs

* None

Found a bug? Email me at <yodelguanzon@gmail.com>

## License

MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

Copyright (c) 11/18/2022 Yodel Guanzon


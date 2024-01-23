// const { uuid } = require('uuidv4');
const { v4: uuidv4 } = require('uuid');
const express = require('express')  // We import the express application
const cors = require('cors') // Necessary for localhost
const app = express() // Creates an express application in app

/**
 * Initial application setup
 * We need to use cors so we can connect to a localhost later
 * We need express.json so we can receive requests with JSON data attached
 */
app.use(cors())
app.use(express.json())


/**
 * DATA STORAGE
 * We're using a local variable 'currencies' to store our data: a list of currency objects
 * Each object represents a 'currency', and contains the following fields
 * id: a number, 
 * currencyCode: a string, three letters (see https://www.iban.com/currency-codes as reference)
 * country: a string, the name of the country
 * conversionRate: the amount, in that currency, required to equal 1 Canadian dollar
 */
let currencies = [
  {
    id: 1,
    currencyCode: "CDN",
    country: "Canada",
    conversionRate: 1
  },
  {
    id: 2,
    currencyCode: "USD",
    country: "United States of America",
    conversionRate: 0.75
  }
]

/**
 * TESTING Endpoint (Completed)
 * @receives a get request to the URL: http://localhost:3001/
 * @responds with the string 'Hello World!'
 */
app.get('/', (request, response) => {
  response.send('Hello World!')
})

/**
 * TODO: GET Endpoint
 * @receives a get request to the URL: http://localhost:3001/api/currency/
 * @responds with returning the data as a JSON
 */
app.get('/api/currency/', (request, response) => {
  response.json(currencies)
})

/**
 * TODO: GET:id Endpoint
 * @receives a get request to the URL: http://localhost:3001/api/currency/:id
 * @responds with returning specific data as a JSON
 */
//sets up a GET route at the path /api/currency/:id
app.get('/api/currency/:id', (request, response) => {
  //extracts the id parameter from the URL
  const currencyId = request.params.id;
  // Find the currency with the specified id using find method
  //This is the condition inside the arrow function. It checks if the id property of the current currency object (the one being iterated over in the array) is equal to the value stored in the currencyId variable
  const currency = currencies.find(currency => currency.id == currencyId);

  //If the currency is found, it is returned as JSON
  if (currency){
    response.json(currency);
  }else{
    // Return a 404 status with an error message if currency is not found
    response.status(404).json({ error: 'resource not found' });
  }
});

/**
 * TODO: POST Endpoint
 * @receives a post request to the URL: http://localhost:3001/api/currency,
 * with data object enclosed
 * @responds by returning the newly created resource
 */
app.post('/api/currency', (request, response) => {
  //extract data sent in the POST request body using request.body;
  const { currencyCode , country , conversionRate } = request.body;

  // Check if required information is present
  if( !currencyCode || !country || !conversionRate) {
  // Return a 400 status with an error message if content is missing
    return response.status(400).json({ error: 'content missing' });
  }
   //creating a new array "updatedCurrencies" that contains all the elements of the original "currencies"
   //arary + the new currency object
   // Create a new currency object with a unique ID 
   const newCurrency = {
    id:4,
    currencyCode:currencyCode,
    country: country,
    conversionRate: conversionRate,
   }
     // Use concat to create a new array with the old currencies and the new one
    const updatedCurrencies = currencies.concat ( newCurrency);
  
    // currencies.push(newCurrency);

    console.log(newCurrency);
    //creating a new array "updatedCurrencies" that contains all the elements of the original "currencies"
    //array + the new currency object
    // Respond with the newly created currency
  response.status(201).json(updatedCurrencies);

});

/**
 * TODO: PUT:id endpoint
 * @receives a put request to the URL: http://localhost:3001/api/currency/:id/:newRate
 * with data object enclosed
 * Hint: updates the currency with the new conversion rate
 * @responds by returning the newly updated resource
 */
app.put('/api/currency/:id/:newRate', (request, response) => {
  //extract data  properties from an object sent in the PUT request using destructuring assignment" to extract and assign them to variables
  const { currencyCode, country, conversionRate } = request.body;
  const newRate= request.params.newRate;
  const currencyId = parseInt(request.params.id);

  //Use concat to create a new array with the updated conversionRate
  const updatedCurrencies = currencies.map(currency => {
    // Check if the current currency object matches the one you want to update
    if (currency.id === currencyId){
    // Update the conversionRate directly in the existing object
     currency.conversionRate = newRate;

    return {
      ...currency,
      conversionRate: newRate
     };
   };
   return currency;
  });
  console.log(updatedCurrencies);

  //Return the updatedCurrencies
  return response.json(updatedCurrencies)

})

app.get('/api/currencies', (request, response) => {
  response.json(updatedCurrencies)
})

/**
 * TODO: DELETE:id Endpoint
 * @receives a delete request to the URL: http://localhost:3001/api/currency/:id,
 * @responds by returning a status code of 204
 */
app.delete('/api/currencye/:id', (request, response) => {
 

})

// Catch-all route for unknown endpoints
app.use(( request, response) => {
 // Return a 404 status with an error message for unknown endpoints
 response.status(404).json({ error: 'unknown endpoint'});
});

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`)
})
//currencyRoutes.js for handling currency-related routes
const { v4: uuidv4 } = require('uuid');
const express = require('express');
const router = express.Router();  //define router object
const morgan = require('morgan');

router.use(express.json());

router.use


// Use morgan middleware for logging
router.use(morgan(':method :url :status :res[content-length] - :response-time ms :req-body'));

morgan.token('req-body', (req) => {
  return JSON.stringify(req.body);
});

// Use morgan middleware for logging
router.use(morgan('dev'));

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
   * TODO: GET Endpoint
   * @receives a get request to the URL: http://localhost:3001/api/currency/
   * @responds with returning the data as a JSON
   */
  router.get('/', (request, response) => {
    response.json(currencies)
  })
  
  /**
   * TODO: GET:id Endpoint
   * @receives a get request to the URL: http://localhost:3001/api/currency/:id
   * @responds with returning specific data as a JSON
   */
  //sets up a GET route at the path /api/currency/:id
  router.get('/:id', (request, response) => {
    try{
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
   } catch (error) {
    // Handle errors 
    response.status(500).json({ error: 'Internal server error' });
    }
  });
  
  /**
   * TODO: POST Endpoint
   * @receives a post request to the URL: http://localhost:3001/api/currency,
   * with data object enclosed
   * @responds by returning the newly created resource
   */
  router.post('/', (request, response) => {
    try{
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
      id:uuidv4(),  // Generate a new UUID
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

   } catch (error) {
    // Handle errors 
    response.status(500).json({ error: 'Internal server error' });
    }
  });
  
  /**
   * TODO: PUT:id endpoint
   * @receives a put request to the URL: http://localhost:3001/api/currency/:id/:newRate
   * with data object enclosed
   * Hint: updates the currency with the new conversion rate
   * @responds by returning the newly updated resource
   */
  router.put('/:id/:newRate', (request, response) => {
    try{ 

    //extract data  properties from an object sent in the PUT request using destructuring assignment" to extract and assign them to variables
    const { currencyCode, country, conversionRate } = request.body;
    const newRate= request.params.newRate;
    const currencyId = parseInt(request.params.id);
  
    //Use concat to create a new array with the updated conversionRate
    const updatedCurrencies = currencies.map(currency => {
      // Check if the current currency object matches the one you want to update
      if (currency.id === currencyId){
      // Update the conversionRate directly in the existing object
       currency.conversionRate = Number(newRate);
  
      return {
        ...currency,
        conversionRate: newRate
       };
     };
     return currency;
    });
    console.log(updatedCurrencies);
  
    //Return the updatedCurrencies
    return response.json(updatedCurrencies);

  } catch ( error ) {
    response.status(500).json({ error: 'Internal server error' });

     }
  
  })
  
  /**
   * TODO: DELETE:id Endpoint
   * @receives a delete request to the URL: http://localhost:3001/api/currency/:id,
   * @responds by returning a status code of 204
   */
  router.delete('/:id', (request, response) => {
    try{
    
    // Extract the id parameter from the URL
    const currencyId = parseInt(request.params.id);
    console.log(`This is the currencies Array: ${ JSON.stringify(currencies)}`)
    // Use the filter method to create a new array excluding the currency with the specified ID
    //the condition checks if the id of the current currency is not equal (!==) to the specified currencyId
    const updatedCurrencies = currencies.filter(currency => currency.id !== currencyId)
    console.log(`This is the updatedCurrencies Array:`,JSON.stringify(updatedCurrencies))
  
    // Check if any currency was removed (if the arrays have different lengths)
    if(updatedCurrencies.length < currencies.length){
      // Respond with a status code of 204 (success, no content)
      response.status(204).send();
     }else{
      response.status(404).json({
        error: 'resource not found'
      });
     }
    } catch (error) {
      // Handle errors 
      response.status(500).json({ error: 'Internal server error' });
    }
  });

  module.exports = router;   //export 
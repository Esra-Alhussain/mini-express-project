//currencyRoutes.js for handling currency-related routes
const { v4: uuidv4 } = require('uuid');
const express = require('express');
const router = express.Router();  //define router object
const morgan = require('morgan');
const { Currency } = require('../models/Currency');  //import Sequelize Currency model 

//Middleware for parsing JSON request bodies
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
// let currencies = [
//     {
//       id: 1,
//       currencyCode: "CDN",
//       countryId: "Canada",
//       conversionRate: 1
//     },
//     {
//       id: 2,
//       currencyCode: "USD",
//       countryId: "United States of America",
//       conversionRate: 0.75
//     }
//   ]

  /**
   * TODO: GET Endpoint
   * @receives a get request to the URL: http://localhost:3001/api/currency/
   * @responds with returning the data as a JSON
   */
  router.get('/', async (request, response) => {
    try {
       //using the findAll() method to retrives all records from 'Curreny' table in the database and returns them as an array of objects
       const currencies = await Currency.findAll();    //Retrive all currencies from data using Sequelize method
       response.json(currencies);    //send JSON response with currencies
    }catch (error){
       console.error('Error fetching currencies:', error);
       response.status(500).json({ error: 'Internal server error '});
    }
  });
  
  /**
   * TODO: GET:id Endpoint
   * @receives a get request to the URL: http://localhost:3001/api/currency/:id
   * @responds with returning specific data as a JSON
   */
  //sets up a GET route at the path /api/currency/:id
  router.get('/:id', async (request, response) => {
    try{
    //extracts the id parameter from the URL
    const currencyId = request.params.id;
    // Find currency by ID using Sequelize method (findByPk)
    const currency = await Currency.findByPk(currencyId);
  
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
  router.post('/', async (request, response) => {
    try{
    //extract data sent in the POST request body using request.body;
    const { currencyCode , countryId , conversionRate } = request.body;
  
     //create() method will only create a new currency if all required fields are provided and meet the defined constraints in the model 
     const newCurrency = await Currency.create({ currencyCode, countryId, conversionRate })
      console.log(newCurrency);
      // Send JSON response with newly created currency
      response.status(201).json(newCurrency);
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
  // modify an existing record in the Currency table based on the provided ID
  router.put('/:id/:newRate', async (request, response) => {
    try{ 
      //Extracts the newRate and the currencyId from the request parameter 
      const { newRate }= request.params;
      const currencyId = parseInt(request.params.id);
    
      //Use the "update" method to update the currency in the database by taking 2 parameters
      //Pass an object with the new conversionRate to be updated
      //Pass a 'where' clause specifying the ID of the currency to be updated
      const updatedCurrencies = await Currency.update( {conversionRate: newRate}, { where: { id: currencyId } });
      console.log(updatedCurrencies);
    
      // Send a JSON response containing the result of the update operation
      response.json(updatedCurrencies);
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
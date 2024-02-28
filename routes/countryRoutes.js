const { u4: uuidv4 } = require('uuid');
const express = require('express');
const router = express.Router();   //define a router oject
const morgan = require('morgan');
//Import Sequelize country model
const Country = require('../models/Country');

//add middleware to handle JSON data
router.use(express.json())

// Use morgan middleware for logging
router.use(morgan(':method :url :status :res[content-length] - :response-time ms :req-body'));

morgan.token('req-body', (req) => {
  return JSON.stringify(req.body);
});

// Use morgan middleware for logging
router.use(morgan('dev'));

//Get all the countries
router.get('/', async (request, response) => {
    try{
        const countries = await Country.findAll();
        response.json(countries);
    }catch(error){
        console.error('Error fetching countries:', error);
        response.status(500).json({ error: 'Internal server error '});
    };
});


//Get specific country Id 
router.get('/:id', async(request, response) => {
    try{
        const {countryId} = request.params;
        const country = await Country.findByPk(countryId);
        if(country){
            response.json(country);
        }else{
            //Handle the error on the client-side while processing the request
            response.status(404).json({ error: 'resource not found'})
        } 
    }catch(error){
        console.error('Err')
        //Handle the error on server-side while processing the request
        response.status(500).json({ error: 'Internal server error'})
    }
});

//Post a new country
router.post('/', async(request, response) => {
    try{
        //extract the data that was sent in the POST request body 
        const addedCountry = request.body;
        const newCountry = await Country.create(addedCountry)
        response.status(201).json(newCountry);
    }catch(error){
        response.status(500).json({ error: error });
    }
});

// router.put('/:id/:countryCode', async (request, response) => {
//     try{ 
//       //Extracts the newRate and the currencyId from the request parameter 
//       const { countryCode }= request.params;
//       const curId = parseInt(request.params.id);
    
//       //Use the "update" method to update the currency in the database by taking 2 parameters
//       //Pass an object with the new conversionRate to be updated
//       //Pass a 'where' clause specifying the ID of the currency to be updated
//       const updatedCountries = await Country.update( {conversionRate: newRate}, { where: { id: currencyId } });
//       console.log(updatedCountries);
    
//       // Send a JSON response containing the result of the update operation
//       response.json(updatedCountries);
//   } catch ( error ) {
//       response.status(500).json({ error: 'Internal server error' });
//      }
//   })
//Delete a country
router.delete('/:id', async(request, response ) => {
    try{
        const {countryId} = request.params;
        const deletedCountry = await Country.destroy({ where: { id: countryId }})
    }catch(error){
        response.status(500).json({ error:'Internal server error' })
    }
});

module.exports = router;   //export 




const { u4: uuidv4 } = require('uuid');
const express = require('express');
const router = express.Router();   //define a router oject
const morgan = require('morgan');
//Import Sequelize country model
const { Country } = require('../models/Country');

//add middleware to handle JSON data
router.use(express.json)

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
        const { countryId, countryName  } = request.body;
        const newCountry = await Country.create({ countryId, countryName })
        response.status(201).json(newCountry);
    }catch(error){
        response.status(500).json({ error: 'Internal server error' });
    }
});



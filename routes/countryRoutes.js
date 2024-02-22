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

//Get endpoint
router.get('/', async (request, response) => {
    try{
        const countries = await Country.findAll();
        response.json(countries);
    }catch(error){
        console.error('Error fetching countries:', error);
        response.status(500).json({ error: 'Internal server error '});
    };
});



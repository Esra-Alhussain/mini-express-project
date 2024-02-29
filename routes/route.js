const express = require('express');
const router = express.Router();
const Country = require('../models/Country')
const Currency = require('../models/Currency')

//retrives the currency code from the currency model and the country name from the country model
router.get('/currency-countryName', async (request, response) => {
    try{
        // Make a query on the currency model including the country model
        
        const currencies = await Currency.findAll({
            //include the Country model to join the tables
            include: [{ model: Country }]
        });
         // Extract currency code and country name from the result
         const currencyCountryData = currencies.map(currency => {
            return{ 
                currencyCode: currency.currencyCode,
                countryName: currency.Country.name
            };
         });

         //Respond with the extracted data
         response.json(currencyCountryData);
    }catch(error){
        console.error('Error fetching the data', error)
        response.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;

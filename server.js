// Load environment variables
require('dotenv').config();

// const { uuid } = require('uuidv4');
const express = require('express')  // We import the express application
const cors = require('cors') // Necessary for localhost
const app = express() // Creates an express application in app
const middlewares = require("./utils/middleware");
var morgan = require('morgan');
const sequelize = require('./config')
const currencyRoute = require('./routes/currencyRoutes'); //access the currencyRoute file 
const countryRoute = require('./routes/countryRoutes'); //access the country Route file 

/**
 * Initial application setup
 * We need to use cors so we can connect to a localhost later
 * We need express.json so we can receive requests with JSON data attached
 */
app.use(cors())
app.use(express.json());
app.use(middlewares.logger);

// Use morgan middleware for logging
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :req-body'));

morgan.token('req-body', (req) => {
  return JSON.stringify(req.body);
});

// Use Morgan middleware with custom format
app.use(morgan('dev'));
/**
 * TESTING Endpoint (Completed)
 * @receives a get request to the URL: http://localhost:3001/
 * @responds with the string 'Hello World!'
 */
app.get('/', (request, response) => {
  response.send('Hello World!')
})


  app.use('/api/country', countryRoute);  
  app.use('/api/currency/', currencyRoute);   

    // Catch-all route for unknown endpoints
    app.use(( request, response) => {
      // Return a 404 status with an error message for unknown endpoints
      response.status(404).json({ error: 'unknown endpoint'});
     });

     
  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
  });
// import the Sequelize class from the sequelize package
// const { Sequelize } = require('sequelize');

// // Initialize Sequelize with database credentials
// //create a new instance of Sequelize, passing an object with the database credentials

const { Sequelize } = require("sequelize");
const pg = require('pg');

//perform the connection through sequelize
const sequelize = new Sequelize(  
    process.env.DB_NAME,  
    process.env.DB_USER,
    process.env.DB_PASSWORD,  
     {    
      host: process.env.DB_HOST,   
      port: process.env.DB_PORT,
      dialect: "postgres",
      dialectOptions: {
         ssl: {     
          require: true,
          rejectUnauthorized: true,
          },
       }, 
    });

    //Authentication function to test the connection
   const connect = async () => {
     try{
        await sequelize.authenticate()   //if this success continue running 
        console.log("We have successfully connected to database...");    
     }catch (error){   //if the connect failed
        console.log("Unable to connect to database...")
       }
    }                         
                            
   connect()

   module.exports = sequelize;


















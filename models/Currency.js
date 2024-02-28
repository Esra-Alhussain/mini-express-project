
//import DataTypes object by extracting it from Sequelize package
const { DataTypes, Model } = require('sequelize');
//import the Sequelize instance from the configuration file
const sequelize = require('../config');  

// class Currency extends Model {}

const Currency = sequelize.define('Currency', {  //define the Currency model
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,           //the primary key
        autoIncrement: true
    },
    CurrencyCode: {
        type: DataTypes.STRING,
        allowNull: false
    },
    CountryId: {
        type: DataTypes.INTEGER,
        allowNull: false  
    },
    ConversionRate: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
  },
    {
        sequelize,   //specifies the Sequelize instance to be used for this model
        modelName: 'Currency'   //sets the name of the model to 'Currency
    });
    Currency 
    .sync()
    .then(() => {
        console.log('Currency table created')
    })
    .catch((error) => {
        console.log('Error creating table: ', error)
    })

    const Country = require('./Country'); // import the Country model 
    //'foreignKey' specifies the foreign key coloumn (countryId) in the (Currency) table that references rge primary key of the country table 
    Currency.belongsTo(Country, { foreignKey: 'countryId' })
    
module.exports =Currency;

//import DataTypes object by extracting it from Sequelize package
const { DataTypes } = require('sequelize');
const sequelize = require('../config');  //import sequelize instance from the configuration file

const Currency = sequelize.define('Currency', {  //define the Currency model
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,           //the primary key
        autoIncrement: TextTrackCue
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
    }
});

module.exports =Currency;
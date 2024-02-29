const { DataTypes } = require('sequelize');
const sequelize = require('../config');

//create a country table in the database 
const Country = sequelize.define('Country', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
  },
    {
        sequelize,   //specifies the Sequelize instance to be used for this model
        modelName: 'Country'   //sets the name of the model to 'Country
    });
    Country
    .sync()    //sync the model to the database
    .then(() => {
        console.log('Country table created')
    })
    .catch((error) => {
        console.log('Error creating table: ', error)
    })


module.exports = Country;
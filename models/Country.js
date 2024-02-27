const { DataTypes } = require('sequelize');
const sequelize = require('../config');

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
        modelName: 'Currency'   //sets the name of the model to 'Currency
    });


module.exports = Country;
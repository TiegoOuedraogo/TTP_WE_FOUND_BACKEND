const { DataTypes } = require('sequelize')
const db = require("./database")

const CartItems = db.define('cartItems', {

        purchased: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },

        quantity: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        },

        productId: {
          type: DataTypes.STRING(50),
        },

        upc: {
          type: DataTypes.STRING(50),
        },

        aisleLocations: {
          type: DataTypes.ARRAY(DataTypes.JSONB),
        },

        brand: {
          type: DataTypes.STRING(100),
        },

        categories: {
          type: DataTypes.ARRAY(DataTypes.STRING(50)),
        },

        countryOrigin: {
          type: DataTypes.STRING(100),
        },

        description: {
          type: DataTypes.STRING(500),
        },

        images: {
            type: DataTypes.ARRAY(DataTypes.JSONB),
        },

        items: {
            type: DataTypes.ARRAY(DataTypes.JSONB),
        },

        itemInformation: {
            type: DataTypes.JSONB,
        },

        temperature: {
            type: DataTypes.JSONB,
        },

})

module.exports = CartItems
const { DataTypes } = require('sequelize')
const db = require("./database")

const CartItems = db.define('cart_items', {

        purchased: {
            type: DataTypes.BOOLEAN,
            default: false,
        },

        quantity: {
            type: DataTypes.INTEGER,
            default: 1
        },

        product_id: {
          type: DataTypes.INTEGER,
        },

        upc: {
          type: DataTypes.INTEGER,
        },

        aisle_locations: {
          type: DataTypes.ARRAY(DataTypes.JSONB),
        },

        brand: {
          type: DataTypes.STRING(100),
        },

        categories: {
          type: DataTypes.ARRAY(DataTypes.STRING(50)),
        },

        country_origin: {
          type: DataTypes.STRING(100),
        },

        description: {
          type: DataTypes.STRING(500),
        },

        images: {
            type: DataTypes.ARRAY(DataTypes.JSONB),
        },

        item_info: {
            type: DataTypes.ARRAY(DataTypes.JSONB),
        },

        item_dimensions: {
            type: DataTypes.JSONB,
        },

        temperature: {
            type: DataTypes.JSONB,
        },

})

module.exports = CartItems
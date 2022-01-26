const { DataTypes } = require('sequelize')
const db = require("./db")

const cart_items = db.define('cart_items', {
           key: {
            type: DataTypes.STRING,
              type: String,
              require: true,
              unique: true,
            },
        
            date_added: {
              type: DataTypes.STRING,
              type: String,
              require: true,
            },
        
            date_updated: {
              type: DataTypes.STRING,
              type: String,
              require: true,
            },
        
            purchased: {
              type: DataTypes.STRING,
              type: Boolean,
              default: false,
              
            },
        
            prod_id: {
              type: DataTypes.STRING,
              type: String,
              require: true,
            },
        
            prod_name: {
              type: DataTypes.STRING,
              type: String,
              require: true,
            },
        
            prod_quantity: {
              type: DataTypes.STRING,
              type: String,
              require: true,
            },
        
            rating: {
              type: DataTypes.STRING,
              type: String,
              require: true,
            },
        
            description: {
              type: DataTypes.STRING,
              type: String,
              require: true,
            },
        
            aisle_location: {
              type: DataTypes.STRING,
              type: Number,
              require: true,
            },
        
            price: {
              type: DataTypes.STRING,
              type: Float32Array,
              require: true,
            },
        
            unit_shipping: {
              type: DataTypes.STRING,
              type: Float32Array,
              require: true,
            },
        
            shipping: {
              type: DataTypes.STRING,
              type: Float32Array,
              require: true,
            },

}, {
    freezeTableName: true
})

module.exports = cart_items
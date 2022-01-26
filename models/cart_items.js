const { DataTypes } = require('sequelize')
const db = require("./db")

const Cart_items = db.define('cart_items', {
            purchased: {
              type: DataTypes.BOOLEAN,

              default: false,
            },
        
            prod_id: {
              type: DataTypes.STRING,

              require: true,
            },
        
            prod_name: {
              type: DataTypes.STRING,

              require: true,
            },
        
            prod_quantity: {
              type: DataTypes.STRING,

              require: true,
            },
        
            rating: {
              type: DataTypes.STRING,

              require: true,
            },
        
            description: {
              type: DataTypes.STRING,

              require: true,
            },
        
            aisle_location: {
              type: DataTypes.INTEGER,
              require: true,
            },
        
            price: {
              type: DataTypes.DECIMAL(6, 2),
              require: true,
            },
        
            unit_shipping: {
              type: DataTypes.STRING,
              require: true,
            },
        
            shipping: {
              type: DataTypes.DECIMAL(6, 2),
              require: true,
            },

}, {
    freezeTableName: true
})

module.exports = Cart_items
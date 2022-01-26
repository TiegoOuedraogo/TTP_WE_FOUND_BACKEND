const { DataTypes } = require('sequelize')
const db = require("./database")

const Items = db.define('item', {

            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },

            purchased: {
              type: DataTypes.BOOLEAN,
              default: false,
            },
        
            // prod_id: {
            //   type: DataTypes.STRING,
            //
            //   require: true,
            // },
        
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
        
            // aisle_location: {
            //   type: DataTypes.INTEGER,
            //   require: true,
            // },
            //
            // price: {
            //   type: DataTypes.DECIMAL(6, 2),
            //   require: true,
            // },
            //
            unit_shipping: {
              type: DataTypes.STRING,
              require: true,
            },
        
            // shipping: {
            //   type: DataTypes.DECIMAL(6, 2),
            //   require: true,
            // },
}, {
    // freezeTableName: true
})

module.exports = Items
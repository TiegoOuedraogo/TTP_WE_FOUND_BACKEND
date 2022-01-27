const { DataTypes } = require('sequelize')
const db = require("./database")
const crypto = require('crypto') //auth implementation


const WeFoundUser = db.define('weFoundUsers', {

    firstName: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
            notEmpty: true,
            notNull: true
        }
    },

    lastName: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
            notEmpty: true,
            notNull: true
        }
    },

    email: {
        type: DataTypes.STRING(100),
        validate: {
            notEmpty: true,
            isEmail: true
        }
    },

    image: {
        type: DataTypes.STRING(2048),
        defaultValue: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    },

    street_address: {
        type: DataTypes.STRING(2048),
    },

    zipcode: {
        type: DataTypes.STRING(2048),
    },

    city: {
        type: DataTypes.STRING(2048),
    },

    state: {
        type: DataTypes.STRING(100),
    },

    country: {
        type: DataTypes.STRING(2048),
    },

    dark_mode: {
        type: DataTypes.BOOLEAN(),
        defaultValue: false
    },

})

module.exports = WeFoundUser
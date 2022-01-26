const { DataTypes } = require('sequelize')
const db = require("./database")


const Username = db.define('username', {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'username',
            key: 'id'
        }
    },

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
        allowNull: false,
        validate: {
            notEmpty: true,
            notNull: true,
            isEmail: true
        }
    },
    image: {
        type: DataTypes.STRING(2048),
        defaultValue: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    },
    address: {
        type: DataTypes.STRING(2048),
        allowNull: false,
        validate: {
            notEmpty: true,
            notNull: true
        }
    },
    zipcode: {
        type: DataTypes.STRING(2048),
        allowNull: false,
        validate: {
            notEmpty: true,
            notNull: true
        }
    },
    city: {
        type: DataTypes.STRING(2048),
        allowNull: false,
        validate: {
            notEmpty: true,
            notNull: true
        }
    },
    country: {
        type: DataTypes.STRING(2048),
        allowNull: false,
        validate: {
            notEmpty: true,
            notNull: true
        }
    },

}, {
    freezeTableName: true
})

module.exports = Username
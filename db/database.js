const { Sequelize } = require('sequelize')

const database = new Sequelize(`postgres://localhost:5432/${process.env.DB_NAME}`,{
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    logging: false
});

module.exports = database
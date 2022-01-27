const { Sequelize } = require('sequelize')

const database = new Sequelize(
    process.env.DATABASE_URL || `postgres://localhost:5432/${process.env.DB_NAME}`,
    {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        logging: false
    }, {
        "dialectOptions": {
            "ssl": {
                "require": true,
                "rejectUnauthorized": false
            }
        }
    }
);

module.exports = database
const { Sequelize } = require('sequelize')
const db = new Sequelize(`postgres://localhost:5432/${process.env.DB_NAME}`,{ 
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    logging: false
});

async function connectStatus() {
    try {
        await db.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

connectStatus()

module.exports = db
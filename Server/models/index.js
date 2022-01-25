const Sequelize = require(Sequelize);
require('env').config();

const sequelize = new sequelize(process.env.API_KEY,{
  dialect: 'prosgres',
  dialectOptions:{
    ssl:{
      rejectUnAuthorized: false
    }
  }

})

const db ={}

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports =db;
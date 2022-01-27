const db = require("./database")
const Items = require("./items")
const Username = require("./username")


Username.hasMany(Items)
Items.belongsTo(Username)


module.exports = {
    db,
    Items,
    Username,

}
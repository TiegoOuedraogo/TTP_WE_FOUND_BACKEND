const db = require("./database")
const user = require("./user")
const cart_items = require("./cart_items")


cart_items.hasMany(user)
user.belongsTo(cart_items)

module.exports = {
    db,
    user,
    cart_items
}
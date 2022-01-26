const db = require("./db")
const User = require("./user")
const Cart_items = require("./cart_items")


Cart_items.hasMany(User)
User.belongsTo(Cart_items)

module.exports = {
    db,
    User,
    Cart_items
}
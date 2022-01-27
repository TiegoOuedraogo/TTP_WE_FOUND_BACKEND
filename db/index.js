const db = require("./database")
const CartItems = require("./cartItems")
const WeFoundUser = require("./weFoundUsers")


WeFoundUser.hasMany(CartItems)
CartItems.belongsTo(WeFoundUser)


module.exports = {
    db,
    CartItems,
    WeFoundUser,

}
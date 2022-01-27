const router = require("express").Router()

router.use("/weFoundUsers", require("./weFoundUsers"))
router.use("/cartItems", require("./cartItems"))
router.use("/kroger", require("./kroger"))
module.exports = router
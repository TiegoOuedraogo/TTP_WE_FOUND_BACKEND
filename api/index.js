const router = require("express").Router()
router.use('/auth', require('../auth/authen'))

router.use("/weFoundUsers", require("./weFoundUsers"))
router.use("/cartItems", require("./cartItems"))
router.use("/kroger", require("./kroger"))
module.exports = router
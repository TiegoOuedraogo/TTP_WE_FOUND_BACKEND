const router = require("express").Router()

router.use("/user", require("./users"))
router.use("/cart_items", require("./cart_items"))
module.exports = router
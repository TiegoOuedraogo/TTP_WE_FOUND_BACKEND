const router = require("express").Router()
const CartItem = require("../db/cartItems")
const WeFoundUser = require("../db/weFoundUsers")

router.get("/", async (req, res) => {
    try {
        const users = await WeFoundUser.findAll()
        res.status(200).send(users)
    } catch (error) {
        console.log(error)
        res.status(404).send(error)
    }
})

//get user based on id
router.get("/:id",async (req,res) => {
    try{
        const user = await WeFoundUser.findByPk(req.params.id);
        res.status(200).json(user);
    } catch(error){
        console.log(error)
        res.status(404).send(error)
    }
})

//get single user based on id with its cart_items
router.get("/:id/cart_items", async (req, res) => {
    try {
        const user = await WeFoundUser.findByPk(req.params.id);
        const cart_items = await cart_items.findOne({
            where: {
                id: user.getDataValue("cart_itemsId")
            }
        })

        res.status(200).json({
            user,
            cart_items
        })

    } catch(error) {
        console.log(error)
        res.status(404).send(error)
    }
})


router.post("/", async (req, res) => {
    try {
        console.log(req.body)
        const user = await WeFoundUser.create(req.body)
        res.status(201).send(user)
    } catch (error) {
        console.log(error)
        res.status(404).send(error)
    }
})

router.patch("/:id",async (req,res) => {
    try{
        console.log(req.body)
        await WeFoundUser.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        res.status(200).send()
    } catch(error){
        console.log(error)
        res.status(404).send(error)
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const user = await WeFoundUser.findByPk(req.params.id)
        user.destroy()
        res.status(200).send(`Deleted user with ID of ${req.params.id}`)
    } catch (error) {
        console.log(error)
        res.status(404).send(error)
    }
})


module.exports = router
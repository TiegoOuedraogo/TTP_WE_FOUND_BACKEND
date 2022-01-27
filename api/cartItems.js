const router = require("express").Router()
const CartItem = require("../db/cartItems")
const WeFoundUser = require("../db/weFoundUsers")

router.post("/", async (req, res) => {

    try {
        const item = await CartItem.create(req.body);
        res.status(201).send(item)
    } catch (error) {
        console.log(error)
        res.status(404).send(error)
    }
})

router.patch("/:id",async (req,res) => {
    try{
        console.log(req.body)
        await CartItem.update(req.body, {
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
        const cart_items = await CartItem.findByPk(req.params.id)
        await cart_items.destroy()
        res.status(200).send(`Deleted cart_items with ID of ${req.params.id}`)
    } catch (error) {
        console.log(error)
        res.status(404).send(error)
    }
})


module.exports = router
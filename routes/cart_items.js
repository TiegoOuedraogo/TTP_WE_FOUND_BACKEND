const router = require("express").Router()
const cart_items = require("../db/cart_items")
const user = require("../db/user")

router.get("/", async (req, res) => {
    try {
        const cart_items = await cart_items.findAll()
        res.status(200).send(cart_items)
    } catch (error) {
        console.log(error)
        res.status(404).send(error)
    }
})

//get single cart_items based on id
router.get("/:id", async (req, res) => {
    try {
        const cart_items = await cart_items.findByPk(req.params.id);
        res.status(200).json(cart_items);
    } catch(error) {
        console.log(error)
        res.status(404).send(error)
    }
})

//get single cart_items based on id with its users
router.get("/:id/users", async (req, res) => {
    try {
        const cart_items = await cart_items.findByPk(req.params.id);
        const user = await user.findAll({
            where: {
                cart_itemsId: req.params.id
            }
        })

        res.status(200).json({
            cart_items,
            user
        })

    } catch(error) {
        console.log(error)
        res.status(404).send(error)
    }
})


router.post("/", async (req, res) => {
    try {
        console.log(req.body)
        const cart_items = await cart_items.create(req.body)
        res.status(201).send(cart_items)
    } catch (error) {
        console.log(error)
        res.status(404).send(error)
    }
})

router.patch("/:id",async (req,res) => {
    try{
        console.log(req.body)
        await cart_items.update(req.body, {
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
        const cart_items = await cart_items.findByPk(req.params.id)
        cart_items.destroy()
        res.status(200).send(`Deleted cart_items with ID of ${req.params.id}`)
    } catch (error) {
        console.log(error)
        res.status(404).send(error)
    }
})


module.exports = router
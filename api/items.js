const router = require("express").Router()
const Cart = require("../db/items")
const User = require("../db/username")
const {Items} = require("../db");

router.get("/", async (req, res) => {
    try {
        const cart_items = await Cart.findAll()
        res.status(200).send(cart_items)
    } catch (error) {
        console.log(error)
        res.status(404).send(error)
    }
})

//get single cart_items based on id
router.get("/:id", async (req, res) => {
    try {
        const cart_items = await Cart.findByPk(req.params.id);
        res.status(200).json(cart_items);
    } catch(error) {
        console.log(error)
        res.status(404).send(error)
    }
})

//get single cart_items based on id with its users
router.get("/:id/users", async (req, res) => {
    try {
        const cart_items = await Cart.findByPk(req.params.id);
        const user = await User.findAll({
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

        const item = await  Items.create({
            name: req.body.name,
            price: req.body.price,
            image: req.body.image,
            brand: req.body.brand,
            category: req.body.category||"",
            countInStock: req.body.countInStock,
            description: req.body.description,
            rating: req.body.rating,
            quality: req.body.quality|| "0",
        });
        res.sendStatus(201).send(item)
    } catch (error) {
        console.log(error)
        res.status(404).send(error)
    }
})

router.patch("/:id",async (req,res) => {
    try{

        console.log(req.body)
        await Cart.update(req.body, {
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
        const cart_items = await Cart.findByPk(req.params.id)
        await cart_items.destroy()
        res.status(200).send(`Deleted cart_items with ID of ${req.params.id}`)
    } catch (error) {
        console.log(error)
        res.status(404).send(error)
    }
})


module.exports = router
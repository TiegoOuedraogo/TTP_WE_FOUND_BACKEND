const router = require('express').Router();
const {Items} = require("../db");
router.get("/", async (req, res) => {

    try {
        const item = await Items.create({
            name: {type: String, required: true},
            image: {type: String, required: true},
            brand: {type: String, required: true},
            price: {type: Number, default: 0, required: true},
            category: {type: String, default: ""},
            countInStock: {type: Number, default: 0, required: true},
            description: {type: String, required: true},
            rating: {type: Number, default: 0, required: true},
            quality: {type: Number, default: 0, required: true},

    })

        res.sendStatus(201).send(item)
    } catch (error) {
        console.log(error)
        res.status(404).send(error)
    }
})
module.exports = Items;
const router = require('express').Router();
const {Items} = require("../db");
const {DataTypes} = require("sequelize");
const orders = require('express')

router.get("/", async (req, res) => {

    try {
        const shippingInfo = await Items.create({
           fullName: {type: String, required: true},
            address: {type: String, required: true},
            address2: {type: String, required: false},
            city: {type: String, required: true},
            state: {type: String, required: true},
            zip: {type: String, required: true},
        })

        res.sendStatus(201).send(shippingInfo)
    } catch (error) {
        console.log(error)
        res.status(404).send(error)
    }
})


const paymentInfo = {
    paymentMethod: { type: String, required: true }
};
router.get("/", async (req, res) => {
    try {
        const orderItem = await Items.create({
            name: {type: String, required: true},
            qty: {type: Number, required: true},
            image: {type: String, required: true},
            price: {type: String, required: true},
            _id: {
                type: DataTypes,
                ref: 'Product',
                required: true
            },
        });
      res.sendStatus(201).send(orderItem)
} catch (error) {
    console.log(error)
    res.status(404).send(error)
}
})

router.get("/", async (req, res) => {
    try{
    const ordered = await Items.create({
        user: {
            type: DataTypes,
            ref: 'User',
            required: true},
        orderItems: ordered,
        shipping: shippingInfo,
        payment: paymentInfo,
        paymentResult: {
            id: String,
            status: String,
            update_time: String,
            email_address: String,
        },
        itemsPrice: {type: Number},
        taxPrice: {type: Number},
        shippingPrice: {type: Number},
        totalPrice: {type: Number},
        isPaid: {type: Boolean, default: false},
        paidAt: {type: Date},
        isDelivered: {type: Boolean, default: false},
        deliveredAt: {type: Date},
    }, {
        timestamps: true
    })
        res.sendStatus(201).send(ordered)
    } catch (error) {
        console.log(error)
        res.status(404).send(error)
    }
})

module.exports = orders;
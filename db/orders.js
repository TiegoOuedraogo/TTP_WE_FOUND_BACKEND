const express = require('express');
const Order = require('../api/orders');
const router = express.Router();

router.get("/", async (req, res) => {
    try{
    const orders = await Order.find({}).populate('user');
    res.sendStatus(200).send(orders)
    } catch (error) {
        console.log(error)
        res.status(404).send(error)
    }
});
router.get("/order",  async (req, res) => {
    try{
        const orders = await Order.find({ user: req.user._id });
        res.sendStatus(200).send(orders)
    } catch (error) {
        console.log(error)
        res.status(404).send(error)
    }
});

router.get("/:id",  async (req, res) => {
    try{
        const order = await Order.findOne({ _id: req.params.id });
        res.sendStatus(200).send(order)
    } catch (error) {
        console.log(error)
        res.status(404).send("Orders not found",error)
    }
});

router.delete("/:id",  async (req, res) => {

    const order = await Order.findOne({ _id: req.params.id });
    if (order) {
        const deletedOrder = await order.remove();
        res.send("we are removing this order: ",deletedOrder);
    } else {
        res.status(404).send("Order cannot be found: ",deletedOrder)
    }
});

router.post("/",  async (req, res) => {
        try{
            const orderNewProduct = await Order.create({
                orderItems: req.body.orderItems,
            user: req.user._id,
            shipping: req.body.shipping,
            payment: req.body.payment,
            itemsPrice: req.body.itemsPrice,
            taxPrice: req.body.taxPrice,
            shippingPrice: req.body.shippingPrice,
            totalPrice: req.body.totalPrice,
        })
            res.status(201).send({
                message: "New Order Created",
                data: orderNewProduct });
        }catch (err){
            res.status(401).send("Order cannot be created: ")

        }
    })


router.put("/:id/deliver",  async (req, res) => {
        const order = await Order.findById(req.params.id);
        if (order) {
            order.isDelivered = true ;
            order.deliveredAt = new Date();
            const updatedOrder = await order.save();
            res.send(updatedOrder);
        } else {
            res.status(404).send({ message: 'Order Not Found' });
        }
    }
);

router.put("/:id/pay",  async (req, res) => {
       try{
           const order = await Order.findById(req.params.id)
               if (order) {
                   order.isPaid = true;
                   order.paidAt = Date.now();
                   order.paymentResult = {
                       id: req.body.id,
                       status: req.body.status,
                       update_time: req.body.update_time,
                       email_address: req.body.email_address,
                   };
           }
               const updatedOrder = await order.save();
               res.send({ message: 'Order has been Paid', order: updatedOrder })
       }catch (err){
            res.status(404).send({ message: 'Order Not Found'});
        }
    }
);

module.exports = {Order,router};
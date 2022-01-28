const router = require("express").Router()
const CartItem = require("../db/cartItems")
const WeFoundUser = require("../db/weFoundUsers")
const jwt = require("jsonwebtoken")
const { nanoid } = require("nanoid")
const auth = require("../middleware/auth")

router.get("/", auth, async (req, res) => {
    try {
        const users = await WeFoundUser.findAll()
        res.status(200).send(users)
    } catch (error) {
        console.log(error)
        res.status(404).send(error)
    }
})

//get user based on id
router.get("/:id", auth, async (req,res) => {
    try{
        const user = await WeFoundUser.findByPk(req.params.id);
        res.status(200).json(user);
    } catch(error){
        console.log(error)
        res.status(404).send(error)
    }
})

//get single user based on id with its cart_items
router.get("/:id/cartItems", auth, async (req, res) => {
    try {
        const user = await WeFoundUser.findByPk(req.params.id);
        const cartItems = await CartItem.findAll({
            where: {
                weFoundUserId: req.params.id
            }
        })

        res.status(200).json({
            user,
            cartItems
        })

    } catch(error) {
        console.log(error)
        res.status(404).send(error)
    }
})


// router.post("/", async (req, res) => {
//     try {
//         console.log(req.body)
//         const user = await WeFoundUser.create(req.body)
//         const token = jwt
//         res.status(201).send(user)
//     } catch (error) {
//         console.log(error)
//         res.status(404).send(error)
//     }
// })


router.post("/signup", async (req, res) => {
    try {
        const superId = nanoid()
        const token = jwt.sign({superId: superId.toString()}, "ihopethisworks")
        const user = await WeFoundUser.create({
            ...req.body,
            superId,
            tokens: [{
                token
            }]
        })

        res.status(201).send({
            message: "Successfully signed up",
            user,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            error: `Can't create user: ${error}`
        })
    }


})

router.post("/login", async(req, res) => {
    try {
        console.log(req.body)
        const user = await WeFoundUser.findOne({
            where: {
                username: req.body.username,
                password: req.body.password
            }
        })

        const superId = user.superId
        const token = jwt.sign({superId: superId.toString()}, "ihopethisworks")

        user.set('tokens', user.get('tokens').concat({token}))
        await user.save()

        res.status(201).send({ user, token })

    } catch(e) {
        console.log(e)
        res.status(404).send({
            error: "User not found"
        })
    }
})

router.post("/logout", auth, async(req, res) => {
    try {
        req.user.set("tokens", req.user.tokens.filter((token) => {
            return token.token != req.token
        }))
        await req.user.save()

        res.status(200).send("Successfully logged out")

    } catch (error) {
        console.log(error)
        res.status(500).send({
            error: "Cannot log out"
        })
    }
})

router.post("/logoutAll", auth, async(req, res) => {
    try {
        req.user.set("tokens", [])
        await req.user.save()
        res.status(200).send("All access tokens cleared on user's account")
    } catch (error) {
        res.status(500).send({
            error: "Cannot clear user's access tokens"
        })
    }
})


router.patch("/:id", auth, async (req,res) => {
    try{
        console.log(req.body)
        await WeFoundUser.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        res.status(200).send({
            success: "User updated successfully. If you don't see a change, check to see you're changing the right attribute."
        })
    } catch(error){
        console.log(error)
        res.status(404).send(error)
    }
})

router.delete("/:id", auth, async (req, res) => {
    try {
        const user = await WeFoundUser.findByPk(req.params.id)
        user.destroy().then(() => "Deletion successful.")
        res.status(200).send(`Deleted user with ID of ${req.params.id}`)
    } catch (error) {
        console.log(error)
        res.status(404).send(error)
    }
})


module.exports = router
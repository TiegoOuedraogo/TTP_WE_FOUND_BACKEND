const express = require("express");
const router = express.Router();
const WeFoundUsers  = require("../db/weFoundUsers");
var session = require('express-session');

router.post("/login", async (req,
                             res, next) => {
    try {
        const user = await WeFoundUsers.findOne(
            {
                where:
                    {
                        username: req.body.username ,
                        password: req.body.password
                    }
            });
        if (!user) {
            throw Error
        }
        else {
            res.status(200).send(user)
        }
    }
    catch (err) {
        res.status(401).send("Wrong username and/or password");
        next(err);
    }
});

router.post('/signup', async(req,
                             res,next) =>
{
    try{
        const user = await WeFoundUsers.create(req.body)
        res.status(200).send(user)
    }catch (err){
        res.status(401).send('invalid information provided');
    }
})

module.exports = router;
const express = require("express");
const router = express.Router();
const WeFoundUsers  = require("../db/weFoundUsers");
const session = require('express-session');

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

router.post('/signup', async(req, res,next) =>
{
    try{
        const user = await WeFoundUsers.create(req.body)
        res.status(200).send(user)
    }catch (err){
        console.log(err)
        res.status(401).send('invalid information provided');
    }
})

router.delete('/logout', (req, res) => {
    try {
        if(req.session){
            req.session.destroy();
        }
    res.status(302).send('successfully log out')
        //throw Error
        }catch (err){
        res.status(400).send('user cannot not be found')
    }

        });
module.exports = router;
const express = require("express");
const router = express.Router();
const WeFoundUsers  = require("../db/weFoundUsers");

router.post("/login", async (req,
                             res, next) => {
    try {
        const user = await WeFoundUsers.findOne({ where: { username: req.body.username , password: req.body.password} });
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
    console.log("line 25",req.body)
    try{

        const user = await WeFoundUsers.create(

                req.body
            )
        res.status(200).send(user)

    }catch (err){
        console.log("line 34",err)
        res.status(401).send('invalide informations provided');
    }

})

router.delete("/logout", (req, res ,next) => {
    req.logout();
    req.session.destroy((err) => {
        if (err) {
            return next(err);
        }
        else {
            res.status(204).end();
        }
    });
});

module.exports = router;
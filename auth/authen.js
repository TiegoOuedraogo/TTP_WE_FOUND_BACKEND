const express = require("express");
const router = express.Router();
const WeFoundUsers  = require("../db/weFoundUsers");

router.post("/login", async (req, res, next) => {
    try {
        const user = await WeFoundUsers.findOne({ where: { username: req.body.username , password: req.body.password} });

            console.log(user)
        if (!user) {
            throw Error
        }

        else {
            res.status(200).send(user)
        }
    }
    catch (err) {
        console.log(err,"line 20")
        res.status(401).send("Wrong username and/or password");

        next(err);

    }
});

router.post("/signup", async (req, res, next) => {
    try {
        const user = await user.create(req.body);
        req.login(user, err => (err ? next(err) : res.json(user)));
    }
    catch (err) {
        if (err.name === "SequelizeUniqueConstraintError") {
            res.status(401).send("Username already exists");
        }
        else {
            next(err);
        }
    }
});

router.delete("/logout", (req, res, next) => {
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

router.get("/me", (req, res) => {
    res.json(req.user);
});

module.exports = router;
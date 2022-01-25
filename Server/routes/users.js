const express = require("express");
//importing body parser
const bodyParser = require("body-parser");
//user and model schema import
const User = require("../models/user");
//passport
const passport = require("passport");
const authenticate = require('../Capstone/authentication');
const cookieParser = require("cookie-parser");

const authenticate = require('../Capstone/authentication');

const router = express.Router();
router.use(bodyParser.json());
/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

//this will allow the user to sign up
router.post("/signup", (req, res, next) => {
  //if the user already exist the we won't allow a duplicate
  User.register(
    new User({ username: req.body.username }),
    req.body.password,
    (err, user) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");
        res.json({ err: err });
      }
      //if the user doesn't exist we create one
      else {
        passport.authenticate("local")(req, res, () => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json({ success: true, status: " Successfully Register! " });
        });
      }
    }
  );
});

router.post("/login",  passport.authenticate("local"), (req, res) => {
  //the payload contains only the id of the user
  //50 & 53 create the token that will be send to the user
  const token = authenticate.getToken({ _id: req.user._id });
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.json({
    success: true,
    token: token,
    status: "You are successfully logged in! ",
  });

});

router.get("/logout", (req, res) => {
  /* if you are already login we logout destroy the session
clear the cookieParsertake you back to home page
 */
  if (req.session) {
    req.session.destroy();
    res.clearCookie("session-id");
    res.redirect("/");

    /*     if you are not login basically there is nothing to do
    you will receve the "You are not logged in!" message
    */
  } else {
    const err = new Error("You are not logged in!");
    err.status = 403;
    next(err);
  }
});

module.exports = router;
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const config =require('./config')


const bodyParser = require('body-parser')
const session = require('express-session'); 
const FileStore = require('session-file-store')(session); 
const passport= require('passport');
const authenticate = require('./authentication');

const url = require('./config')
function auth (req, res, next) {
  console.log(req.headers);
  const authHeader = req.headers.authorization;
  if (!authHeader) {
      const err = new Error('You are not authenticated!');
      res.setHeader('WWW-Authenticate', 'Basic');
      err.status = 401;
      next(err);
      return;
  }

  const auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
  const user = auth[0];
  const pass = auth[1];
  if (user == 'admin' && pass == 'password') {
      next(); // authorized
  } else {
      const err = new Error('You are not authenticated!');
      res.setHeader('WWW-Authenticate', 'Basic');      
      err.status = 401;
      next(err);
  }
}

app.use(auth);
const indexRouter = require("./Capstone/index");
const usersRouter = require("./Capstone/Server/routes/users");
const cartIems = require("./Capstone/Server/routes/CartIems");


const mongoose = require("mongoose");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");


//connection with the server
// const url = "mongodb://localhost:27017/conFusion";

//new from the config file
const url = config.mongoUrl;
const connect = mongoose.connect(url);
connect.then(
  (db) => {
    console.log("succefully connected to the server");
  },
  (err) => {
    console.log(err);
  }
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());

app.use("/", indexRouter);
app.use("/users", usersRouter);

//static use in the public folder
app.use(express.static(path.join(__dirname, "public")));

//mountain
app.use("/items", itemRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
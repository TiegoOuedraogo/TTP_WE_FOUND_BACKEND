const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const authenticate = require('../authenticate');

const items = require("../models/cart_items");

const cart_items = express.Router();

cart_items.use(bodyParser.json());

cart_items
  .route("/")
  .get((req, res, next) => {
    Items.find({})
      .then(
        (items) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(items);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  
  .post(authenticate.verifyUser,(req, res, next) => {
    Items.create(req.body)
      .then(
        (item) => {
          console.log("Item Created ", item);
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(item);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .patch(authenticate.verifyUser,(req, res, next) => {
    res.statusCode = 200;
    res.end("Item is" , req.body);
  })
  .delete(authenticate.verifyUser,(req, res, next) => {
    Items.remove({})
      .then(
        (resp) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(resp);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  });

cart_items
  .route("/:itemId")
  .get((req, res, next) => {
    Items.findById(req.params.itemId)
      .then(
        (item) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(item);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .post(authenticate.verifyUser,(req, res, next) => {
    res.statusCode = 403;
    res.end("POST operation not supported on /items/" + req.params.itemId);
  })
  .put(authenticate.verifyUser,(req, res, next) => {
    Items.findByIdAndUpdate(
      req.params.itemId,
      {
        $set: req.body,
      },
      { new: true }
    )
      .then(
        (item) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(item);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .delete(authenticate.verifyUser,(req, res, next) => {
    Items.findByIdAndRemove(req.params.itemId)
      .then(
        (resp) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(resp);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  });

module.exports = cart_items;
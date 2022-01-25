//importing mongoose
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//this will load the new currency into mongoose
require("mongoose-currency").loadType(mongoose);
const Currency = mongoose.Types.Currency;

const cart_items = new Schema(
  {
    key: {
      type: String,
      require: true,
      unique: true,
    },

    date_added: {
      type: String,
      require: true,
    },

    date_updated: {
      type: String,
      require: true,
    },

    purchased: {
      type: Boolean,
      default: false,
      
    },

    prod_id: {
      type: String,
      require: true,
    },

    prod_name: {
      type: String,
      require: true,
    },

    prod_quantity: {
      type: String,
      require: true,
    },

    rating: {
      type: String,
      require: true,
    },

    description: {
      type: String,
      require: true,
    },

    aisle_location: {
      type: Number,
      require: true,
    },

    price: {
      type: Float32Array,
      require: true,
    },

    unit_shipping: {
      type: Float32Array,
      require: true,
    },

    shipping: {
      type: Float32Array,
      require: true,
    },

  },
  
);
//constructing the model for the schema
let Itemes = mongoose.model("Item", cart_items);
//exporting the model
module.exports = Itemes;
//importing mongoose
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//this will load the new currency into mongoose
require("mongoose-currency").loadType(mongoose);
const Currency = mongoose.Types.Currency;

const cart_items = new Schema(
  {
    name: {
      type: String,
      require: true,
      unique: true,
    },

    description: {
      type: String,
      unique: true,
    },

    image: {
      type: String,
      require: true,
    },

    category: {
      type: String,
      require: true,
    },

    label: {
      type: String,
      default: " ",
    },

    price: {
      type: Currency,
      require: true,
      min: 0,
    },

    featured: {
      type: Boolean,
      default: false,
    },

    comments: [commentSchema],
  },
  {
    timestamps: true,
  }
);
//constructing the model for the schema
let Itemes = mongoose.model("Item", cart_items);
//exporting the model
module.exports = Itemes;
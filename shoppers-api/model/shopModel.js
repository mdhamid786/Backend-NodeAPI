const mongoose = require("mongoose");
const validator = require("validator");

const shopSchema = new mongoose.Schema({

  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
 
  name: {
    type: String,
    required: [true, "Please enter the shop's name"],
    trim: true,
  },
  location: {
    type: String,
    required: [true, "Please enter the shop's location"],
    trim: true,
  },
  owner: {
    type: String,
    required: [true, "Please enter the owner's name"],
    trim: true,
  },
  city: {
    type: String,
    required: [true, "City is required"],
  },
  society: {
    type: String,
    required: [true, "Society Name is required"],
  },

  date: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Shop", shopSchema);

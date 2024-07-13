const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const eventSchema = new mongoose.Schema({

      name: {
        type: String,
        required: [true, "Please Enter Your Name"],
        maxLength: [30, "Name cannot exceed 30 characters"],
        minLength: [4, "Name should have more than 4 characters"],
      },

      description: {
        type: String,
        required: [true, "Please Enter Description"],
       
      },

      dateTime: {
        type: Date,
        required: [true, "Please Enter Date and Time"],
      },

      QRCode: {
        type: String,
        required: [true, "Please Enter QRCODE"],
       
      },

      
  createdAt: {
    type: Date,
    default: Date.now,
  },

});




module.exports = mongoose.model("Event", eventSchema);
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const activitySchema = new mongoose.Schema({

    event_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
        required: true,
      },

      name: {
        type: String,
        required: [true, "Please Enter Your Name"],
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
      
  createdAt: {
    type: Date,
    default: Date.now,
  },

});




module.exports = mongoose.model("Activity", activitySchema);
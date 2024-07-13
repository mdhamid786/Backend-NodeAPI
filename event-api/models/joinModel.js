const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const joinSchema = new mongoose.Schema({

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      event_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
        required: true,
      },

  createdAt: {
    type: Date,
    default: Date.now,
  },

});

module.exports = mongoose.model("Join", joinSchema);
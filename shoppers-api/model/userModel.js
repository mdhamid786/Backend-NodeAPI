const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  nameOfUser: {
    type: String,
    maxLength: [30, "Name cannot exceed 30 characters"],
    minLength: [5, "Name should have more than 5 characters"],
    default: false,
  },
  phone_number: {
    type: String,
    minLength: [10, "phone_number should have 10 digits"],
  },
  password: {
    type: String,
  },
  role: {
    type: String, 
    enum: ["shopkeeper", "user", "Admin"],
    default:'user'
  },

  isBlocked: {
    type: Boolean,
    default: false,
  },
  isRegistered: {
    type: Boolean,
    default: false,
  },
  // otpExpiration: { type: Date },
  fcmToken: { type: String },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});


module.exports = mongoose.model("User", userSchema);

const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({

  event_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
  
  },

  // activity_id: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Activity",
   
  // },

  name: {
    type: String,
    required: [true, "Please Enter Your Name"],
    maxLength: [30, "Name cannot exceed 30 characters"],
    minLength: [4, "Name should have more than 4 characters"],
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
    
  },
  password: {
    type: String,
    select: false,
  },

  mobile: {
    type: String,
    minLength:10,
    maxLength:10,
    required: [true, "Please Enter Your mobile num"],
   
  },

  QRCode: {
    type: String,
    required: [true, "Please Enter QR CODE"],
   
  },

  role: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});


userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};



module.exports = mongoose.model("User", userSchema);
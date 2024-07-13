const mongoose = require("mongoose");
const validator = require("validator");

const walletsSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  shop_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shop",
    required: true,
  },

  amount: {
    type: Number,
    required: [true, "Please Enter Your amount"],
    min: 0,
  },
  comments: {
    type: String, 
    required: [true, "Please Enter Your comments"],
    trim: true,
  },
  
  name: {
    type: String, 
  },

  PaymentMode: {
    type: String, 
    required: [true, "Please Enter Your payment "],
    trim: true,
  },

  images: {
    type: Array,
    required: true,
  },
  currency: {
    type: String,
    required: true,
    default: "INR",
  },
  transactionId: {
    type: String, 
    required: true,
  },
  outstandingAmount: {
    type: Number,
   
  },
  isDebit: {
    type: Boolean,
    default: false,
  },
  isCredit: {
    type: Boolean,
    default: false,
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

module.exports = mongoose.model("Wallets", walletsSchema);

const mongoose = require("mongoose");
const validator = require("validator");

const billSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  shop_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shop",
    required: [true, "Please Enter Shop id"],
  },
  comments: {
    type: String, 
    required: [true, "Please Enter Your comments"],
  },
  

  PaymentMode: {
    type: String, 
    required: [true, "Please Enter Your payment "],
  
  },
  
  amount: {
    type: Number,
    required: [true, "Please Enter Your amount"],
    min: 0,
  },
  images: {
    type: Array,
    required: [true, "Please Enter Your bill image"],
  },
  currency: {
    type: String,
    required: [true, "Please Enter Currency"],
    
  },

  name: {
    type: String,
    required: [true, "Please Enter name"],
    
  },

  isDebit: {
    type: Boolean,
    default: false,
  },
  isDeleted: {
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

billSchema.methods.getShortDate = function() {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return this.date.toLocaleDateString(undefined, options);
};

module.exports = mongoose.model("Bill", billSchema);

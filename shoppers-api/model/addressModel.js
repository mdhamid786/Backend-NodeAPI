const mongoose = require("mongoose");

// Define the Address schema
const addressSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  // state: {
  //   type: String,
  //   required: [true, "State is required"],
  // },
  city: {
    type: String,
    required: [true, "City is required"],
  },
  society: {
    type: String,
    required: [true, "Society Name is required"],
  },
  tower_block: {
    type: String,
    required: [true, "Tower/Society Block is required"],
  },
  flat_number: {
    type: String,
    required: [true, "Flat/House Number is required"],
  },
  
});

module.exports = mongoose.model("Address", addressSchema);

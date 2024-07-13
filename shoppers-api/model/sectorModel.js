const mongoose = require("mongoose");

// Define the Address schema
const sectorSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  city: {
    type: String,
    required: [true, "City is required"],
  },
  sector: {
    type: String,
    required: [true, "Sector is required"],
  },
  
  h_number: {
    type: String,
    required: [true, "House Number is required"],
  },
});

module.exports = mongoose.model("Sector", sectorSchema);

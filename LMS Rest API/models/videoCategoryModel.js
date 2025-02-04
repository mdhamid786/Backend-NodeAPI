const mongoose = require("mongoose");

let videoCatSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      default:
        "https://climate.onep.go.th/wp-content/uploads/2020/01/default-image.jpg",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("VideoCat", videoCatSchema);


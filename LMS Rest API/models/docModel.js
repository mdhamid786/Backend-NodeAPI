const mongoose = require("mongoose");

let docSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    type: { type: String, required: true },
    author: {
      type: String,
      default: "Developer's Corner",
    },
    content: {
      type: String,
      required: true,
    },
    keywords: {
      type: [],
      required: true,
    },
    doc_image: {
      type: String,
      default:
        "https://climate.onep.go.th/wp-content/uploads/2020/01/default-image.jpg",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Doc", docSchema);

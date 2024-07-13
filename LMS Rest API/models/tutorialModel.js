const mongoose = require("mongoose");

const tutorialSchema = new mongoose.Schema(
  {
    title: {
      required: true,
      unique: true,
      type: String,
    },
    slug: {
      required: true,
      type: String,
      unique: true,
      index: true,
    },
    tutorialCategory: {
      type: String,
      require: true,
    },
    tutorialCategorySlug: { type: String, require: true },
    topicName: {
      required: true,
      unique: true,
      type: String,
    },
    content: {
      required: true,
      type: String,
    },
    keywords: {
      type: [],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tutorial", tutorialSchema);

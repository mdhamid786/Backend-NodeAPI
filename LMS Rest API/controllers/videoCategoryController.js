const { default: slugify } = require("slugify");
const VideoCat = require("../models/videoCategoryModel");
const asyncHandler = require("express-async-handler");
const validateMongodbId = require("../utils/validateMongodbId");

// create video category
// POST API
exports.postVideoCategory = asyncHandler(async (req, res) => {
  try {
    const videoCategory = await VideoCat.create(req.body);
    res.status(200).json({
      success: true,
      message: "Video category created successfully",
      videoCategory,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// get all video category
// GET API
exports.getAllVideoCategory = asyncHandler(async (req, res) => {
  try {
    const videoCategory = await VideoCat.find();

    if (!videoCategory) {
      res.status(404).json({
        success: false,
        message: "Video category not found",
      });
    }

    res.status(200).json({
      success: true,
      videoCategory,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// get single video category
// GET API
exports.getSingleVideoCategory = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  try {
    const videoCategory = await VideoCat.findOne({ slug: slug });

    if (!videoCategory) {
      res.status(404).json({
        success: false,
        message: "Video category not found",
      });
    }

    res.status(200).json({
      success: true,
      videoCategory,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// update video category
// PUT API
exports.updateVideoCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const videoCategory = await VideoCat.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!videoCategory) {
      res.status(404).json({
        success: false,
        message: "Video category not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Video category update successfully",
    });
  } catch (error) {
    throw new Error(error);
  }
});

// Delete video category
// DELETE API
exports.deleteVideoCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const videoCategory = await VideoCat.findByIdAndDelete(id);

    if (!videoCategory) {
      res.status(404).json({
        success: false,
        message: "Video category not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Video category delete successfully",
    });
  } catch (error) {
    throw new Error(error);
  }
});

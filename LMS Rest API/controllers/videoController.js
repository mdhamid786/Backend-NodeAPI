const Video = require("../models/videoModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");
const { default: slugify } = require("slugify");

// post a video
// POST API

exports.postVideo = asyncHandler(async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const video = await Video.create(req.body);
    res.status(200).json({
      success: true,
      message: "Video posted successfully...",
      video,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// get single video
// GEt API

exports.getSingleVideo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const video = await Video.findById(id);
    if (!video) {
      res.status(404).json({
        success: false,
        message: "Video not found",
      });
    }
    res.status(200).json({
      success: true,
      video,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// get all video
// GEt API

exports.getAllVideo = asyncHandler(async (req, res) => {
  try {
    const videos = await Video.find();
    if (!videos) {
      res.status(404).json({
        success: false,
        message: "Video not found",
      });
    }
    res.status(200).json({
      success: true,
      videos,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// update video
// PUT API

exports.updateVideo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const video = await Video.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!video) {
      res.status(404).json({
        success: false,
        message: "Video not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Video update successfully",
      video,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// delete video
// DELETE API

exports.deleteVideo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const video = await Video.findByIdAndDelete(id);
    if (!video) {
      res.status(404).json({
        success: false,
        message: "Video not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Video delete successfully",
    });
  } catch (error) {
    throw new Error(error);
  }
});


// 5 
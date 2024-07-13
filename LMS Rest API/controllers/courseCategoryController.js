const { default: slugify } = require("slugify");
const CourseCat = require("../models/courseCategoryModel");
const asyncHandler = require("express-async-handler");
const validateMongodbId = require("../utils/validateMongodbId");

// post course category
// POST API

exports.postCourseCategory = asyncHandler(async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const courseCategory = await CourseCat.create(req.body);
    res.status(200).json({
      success: true,
      message: "Course category created successfully",
      courseCategory,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// get all course category
// GET API

exports.getAllCourseCategory = asyncHandler(async (req, res) => {
  try {
    const courseCategory = await CourseCat.find();
    if (!courseCategory) {
      res.status(404).json({
        success: false,
        message: "Course category not found",
      });
    }

    res.status(200).json({
      success: true,
      courseCategory,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// get single course category
// GET API

exports.getSingleCourseCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const courseCategory = await CourseCat.findById(id);
    if (!courseCategory) {
      res.status(404).json({
        success: false,
        message: "Course category not found",
      });
    }

    res.status(200).json({
      success: true,
      courseCategory,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// delete single course category
// DELETE API

exports.deleteCourseCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const courseCategory = await CourseCat.findByIdAndDelete(id);
    if (!courseCategory) {
      res.status(404).json({
        success: false,
        message: "Course category not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Course category deleted successfully",
    });
  } catch (error) {
    throw new Error(error);
  }
});

// update single course category
// DELETE API

exports.updateCourseCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const courseCategory = await CourseCat.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!courseCategory) {
      res.status(404).json({
        success: false,
        message: "Course category not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Course category updated successfully",
      courseCategory,
    });
  } catch (error) {
    throw new Error(error);
  }
});

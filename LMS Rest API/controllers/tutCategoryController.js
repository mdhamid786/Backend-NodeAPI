const { default: slugify } = require("slugify");
const TutotrialCategory = require("../models/tutorialCategoryModel");
const asyncHandler = require("express-async-handler");
const validateMongodbId = require("../utils/validateMongodbId");

// post api created
// POST API
exports.postTutorialCategory = asyncHandler(async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title.toLowerCase());
    }
    const postTutorial = await TutotrialCategory.create(req.body);

    res.status(200).json({
      success: true,
      message: "Tutorial category created successfully",
      postTutorial,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// get all tutorial category api
// GET API

exports.getAllTutorialCategory = asyncHandler(async (req, res) => {
  try {
    const tutorialCategory = await TutotrialCategory.find();
    if (!tutorialCategory) {
      res.status(404).json({
        success: false,
        message: "Tutorial category not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Tutorial category fetch successfully",
    });
  } catch (error) {
    throw new Error(error);
  }
});

// get single tutorial category api
// GET API

exports.getSingleTutorialCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);

  try {
    const singleTutCat = await TutotrialCategory.findById(id);

    if (!singleTutCat) {
      res.status(404).json({
        success: false,
        message: "Tutorial category not found ",
      });
    }

    res.status(200).json({
      success: true,
      singleTutCat,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// delete tutorial category api
// DELETE API

exports.deleteTutorialCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const deleteTutCat = await TutotrialCategory.findByIdAndDelete(id);
    if (!deleteTutCat) {
      res.status(200).json({
        success: false,
        message: "Tutorial category not found ",
      });
    }

    res.status(200).json({
      success: false,
      message: "Tutorial category delete successfully",
    });
  } catch (error) {
    throw new Error(error);
  }
});

// update tutorial category api
// UPDATE API

exports.updateTutCat = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);

  try {
    const updateTutCat = await TutotrialCategory.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    );

    if (!updateTutCat) {
      res.status(200).json({
        success: false,
        message: "Tutorial Category not found...",
      });
    }
    res.status(200).json({
      success: true,
      message: "Tutorial Category update successfully",
    });
  } catch (error) {
    throw new Error(error);
  }
});

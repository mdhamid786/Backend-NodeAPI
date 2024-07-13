const Category = require("../models/categoryModel");
const validateMongoDbId = require("../utils/validateMongodbId");
const asyncHandler = require("express-async-handler");

// 1 @DES ADD CATEGORY API
exports.addCategory = async (req, res, next) => {
  try { 
    const category = await Category.create(req.body);
    res.status(200).json({
      success: true,
      category,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

// 2 @DES GET SINGLE CATEGORY API

exports.getSingleCategory = async (req, res, next) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const category = await Category.findById(id);
    if (!category) {
      res.status(404).json({
        message: "Category not find ..",
      });
    }
    res.status(200).json({
      success: true,
      category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

// 3 @DES GET TOTAL CATEGORY API
exports.getAllCategory = async (req, res, next) => {
  try {
    const category = await Category.find();
    if (!category) {
      res.status(404).json({
        success: false,
        message: "Category not found ",
      });
    }
    res.status(200).json({
      success: true,
      category: category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

// 4 @DES DELETE CATEGORY API

exports.deleteCategory = async (req, res, next) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }
    res.status(200).json({
      message:"Category delete successfully",
      success: true,
    
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

// 5 @DES UPDATE CATEGORY API

exports.updateCategory = async (req, res, next) => {
  const { id } = req.params;
  try {
    const category = await Category.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!category) {
      res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }
    res.status(200).json({
      success: true,
      message:"Category Update successfully"
    });
  } catch (error) {
    res.status(500).json({
        success: false,
        error: "Internal server error ",
      });
  }
};


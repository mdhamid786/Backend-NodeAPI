const { default: slugify } = require("slugify");
const DocCat = require("../models/docCategoryModel");
const asyncHandler = require("express-async-handler");
const validateMongodbId = require("../utils/validateMongodbId");

// add document category
// POST API

exports.postDocCategory = asyncHandler(async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const documentCat = await DocCat.create(req.body);

    res.status(200).json({
      success: true,
      message: "Document category created successfully",
      documentCat,
    });
  } catch (error) {
    throw Error(error);
  }
});

// get all document category
// GET API

exports.getAllDocCategory = asyncHandler(async (req, res) => {
  try {
    const documentCat = await DocCat.find();

    if (!documentCat) {
      res.status(404).json({
        success: false,
        message: "Document category not found",
      });
    }

    res.status(200).json({
      success: true,
      documentCat,
    });
  } catch (error) {
    throw Error(error);
  }
});

// get single document category
// GET API

exports.getSingleDocCategory = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  validateMongodbId(id);
  try {
    const documentCat = await DocCat.findById({ slug: slug });

    if (!documentCat) {
      res.status(404).json({
        success: false,
        message: "Document category not found",
      });
    }

    res.status(200).json({
      success: true,
      documentCat,
    });
  } catch (error) {
    throw Error(error);
  }
});

// update document category
//   PUT API

exports.updateDocCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const documentCat = await DocCat.findById(id, req.body, { new: true });

    if (!documentCat) {
      res.status(404).json({
        success: false,
        message: "Document category not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Document category update successfully",
    });
  } catch (error) {
    throw Error(error);
  }
});

// update document category
//   PUT API

exports.deleteDocCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const documentCat = await DocCat.findById(id);

    if (!documentCat) {
      res.status(404).json({
        success: false,
        message: "Document category not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Document category delete successfully",
    });
  } catch (error) {
    throw Error(error);
  }
});

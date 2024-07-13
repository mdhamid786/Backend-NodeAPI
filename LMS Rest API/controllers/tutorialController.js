const { default: slugify } = require("slugify");
const Tutorial = require("../models/tutorialModel");
const asyncHandler = require("express-async-handler");

// post tutorials
// POST API
exports.postTutorial = asyncHandler(async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title.toLowerCase());
    }
    if (req.body.tutorialCategory) {
      req.body.tutorialCategorySlug = slugify(
        req.body.tutorialCategory.toLowerCase()
      );
    }

    const postTut = await Tutorial.create(req.body);
    res.status(200).json({
      success: true,
      message: "Tutorial Created Successfully ...",
      postTut,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// get single tutorials
// GET API
exports.getATutorial = asyncHandler(async (req, res) => {
  const { slug, type } = req.params;
  console.log(slug, type);

  try {
    const tutorialSingle = await Tutorial.findOne({
      slug: slug,
      tutorialCategorySlug: type,
    });
    const tutorialTopics = await Tutorial.find({ tutorialCategorySlug: type })
      .select("topicName title slug tutorialCategorySlug")
      .sort("createdAt");

    res.status(200).json({
      success: true,
      message: "Tutorials Fetch Successfully !",
      tutorialSingle,
      tutorialTopics,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// get all tutorials
// GRT API

exports.getAllTutorials = asyncHandler(async (req, res) => {
  try {
    const tutorial = await Tutorial.find();
    if (!tutorial) {
      res.status(404).json({
        success: false,
        message: "tutorial not found ",
      });
    }

    res.status(200).json({
      success: true,
      tutorial,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// get all tutorials
// GRT API

exports.getTutorialById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const tut = await Tutorial.findById(id);
    res
      .status(200)
      .json({ status: true, message: "Tutorials Fetched successfully", tut });
  } catch (error) {
    throw new Error(error);
  }
});

// update tutorials
// UPDATE API
exports.updateTutorials = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title.toLowerCase());
    }
    if (req.body.tutorial) {
      req.body.tutorialCategorySlug = slugify(
        req.body.tutorialCategory.toLowerCase()
      );
    }

    const tutorialUpdate = await Tutorial.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Tutorial update successfully..",
      tutorialUpdate,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// delete tutorials
// DELETE API

exports.deleteTutorials = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const deleteTutorial = await Tutorial.findByIdAndDelete(id);
    if (!deleteTutorial) {
      res.status(404).json({
        success: false,
        message: "Tutorial not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Delete tutorial successfully..",
      deleteTutorial,
    });
  } catch (error) {
    throw new Error(error);
  }
});

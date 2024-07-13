const Blog = require("../models/blogModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");
const { default: slugify } = require("slugify");
const async = require('async');

// post blog
// POST API

// exports.postBlog = asyncHandler(async (req, res) => {
//   try {
//     async.waterfall([
//       // Generate slug if title exists
//       function(callback) {
//         if (req.body.title) {
//           req.body.slug = slugify(req.body.title);
//         }
//         callback(null, req.body);
//       },
//       // Create the blog post
//       function(blogData, callback) {
//         Blog.create(blogData)
//           .then(postBlog => callback(null, postBlog))
//           .catch(err => callback(err));
//       }
//     ], function(err, postBlog) {
//       if (err) {
//         throw new Error(err); // Handle error appropriately
//       }
//       res.status(200).json({
//         success: true,
//         message: "Blog posted successfully!",
//         postBlog,
//       });
//     });
//   } catch (error) {
//     throw new Error(error);
//   }
// });

exports.postBlog = asyncHandler(async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const postBlog = await Blog.create(req.body);
    res.status(200).json({
      success: true,
      message: "Blog posted successfully! ",
      postBlog,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// get all blog
// GET API

exports.getAllBlog = asyncHandler(async (req, res) => {
  try {
    const postBlog = await Blog.find();
    if (!postBlog) {
      res.status(404).json({
        success: false,
        message: "Blog posted not found",
      });
    }
    res.status(200).json({
      success: true,
      postBlog,
    });
  } catch (error) {
    throw new Error(error);
  }
});



// get single blog
// GET API

exports.getSingleBlog = asyncHandler(async (req, res) => {
  const {slug} = req.params;
  validateMongoDbId(id);
  try {
    const postBlog = await Blog.findOne({slug:slug});
    if (!postBlog) {
      res.status(404).json({
        success: false,
        message: "Blog posted not found",
      });
    }
    res.status(200).json({
      success: true,
      postBlog,
    });
  } catch (error) {
    throw new Error(error);
  }
});


// delete single blog
// DELEETE API

exports.deleteBlog = asyncHandler(async (req, res) => {
  const {id} = req.params;
  validateMongoDbId(id);
  try {
    const deleteBlog = await Blog.findByIdAndDelete(id);
    if (!deleteBlog) {
      res.status(404).json({
        success: false,
        message: "Blog posted not found",
      });
    }
    res.status(200).json({
      success: true,
      message:"Blog posted deleted",
    });
  } catch (error) {
    throw new Error(error);
  }
});


// update single blog
// PUT API

exports.deleteBlog = asyncHandler(async (req, res) => {
  const {id} = req.params;
  validateMongoDbId(id);
  try {
    const updateBlog = await Blog.findByIdAndDelete(id, req.body , {new:true});
    if (!updateBlog) {
      res.status(404).json({
        success: false,
        message: "Blog posted not found",
      });
    }
    res.status(200).json({
      success: true,
      message:"Blog posted update",
      updateBlog
    });
  } catch (error) {
    throw new Error(error);
  }
});
const { default: slugify } = require("slugify");
const Document = require("../models/docModel");
const asyncHandler = require("express-async-handler");
const validateMongodbId = require("../utils/validateMongodbId");

// post document api
// POST API

exports.postDocument = asyncHandler(async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const document = await Document.create(req.body);

    res.status(200).json({
      success: true,
      message: "Document post successfully !",
      document,
    });
  } catch (error) {
    throw new Error(error);
  }
});


// get all document api
// GET API

exports.getAllDocument = asyncHandler(async (req, res) => {
    try {
      const documents = await Document.find();
      res.status(200).json({
        success: true,
        documents,
      });
    } catch (error) {
      throw new Error(error);
    }
  });



  // get all document api
// GET API

exports.getSingleDocument = asyncHandler(async (req, res) => {
    const {slug} = req.params;
    try {
      const document = await Document.findById({slug:slug});
      res.status(200).json({
        success: true,
        document,
      });
    } catch (error) {
      throw new Error(error);
    }
  });
  

  
  // update  document api
// PUT API

exports.updateDocument = asyncHandler(async (req, res) => {
    const {id} = req.params;
    validateMongodbId(id)
    try {
      const updateDocument = await Document.findByIdAndUpdate(id , req.body, {
        new:true
      });
      res.status(200).json({
        success: true,
        message:"Document update successfully",
        updateDocument,
      });
    } catch (error) {
      throw new Error(error);
    }
  });
  
  
  
    
  // delete  document api
// DELETE API

exports.deleteDocument = asyncHandler(async (req, res) => {
    const {id} = req.params;
    validateMongodbId(id)
    try {
      const deleteDocument = await Document.findByIdAndUpdate(id);
      res.status(200).json({
        success: true,
        message:"Document delete successfully",
        deleteDocument,
      });
    } catch (error) {
      throw new Error(error);
    }
  });
  
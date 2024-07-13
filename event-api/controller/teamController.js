const catchAsyncError = require("../middleware/catchAsyncError");
const Team = require("../models/teamModel");
const validator = require("validator");
const ErrorHandler = require("../utils/errorhandler");
const QRCode = require("qrcode");
const  cloudinaryController  = require("./cloudinaryController");
const galleryModel = require("../models/galleryModel");

exports.addTeam = catchAsyncError(async (req, res, next) => {
  const { name, images, mobile } = req.body;

  const requiredFields = ['name' ,'mobile']
  const missingFields = requiredFields.filter(feild => !(feild in req.body))
  
  if(missingFields.length > 0){
    return next(new ErrorHandler(`please provide ${missingFields}`, 400))
  }

  if(req.files.images.length >0){
    return next(new ErrorHandler("Please Upload images", 400));
  }
  try {
    const file = req.files.images;
    cloudinaryController.uploadToCloudinary(file, async (error, result) => {
      if (error) {
        console.error('Error uploading image to Cloudinary:', error);
        return res.status(500).json({ success: false, message: "Failed to upload image" });
      }

      const resultUrlParts = result.url.toString().split('/');
     
      // Pushing result.url into an array
      const imagesArray = [result.url];
     
      const team = new Team({
        name: req.body.name,
        mobile: req.body.mobile,
        images: imagesArray, // Corrected property name to 'images'
      });

      // Generate QR code
      const qrCodeDataURL = await QRCode.toDataURL(mobile);
      team.QRCode = qrCodeDataURL;

      // Save team to database
      await team.save();

     

      res.status(200).json({
        success: true,
        team,
        message: "Team added successfully"
      });
    });
  } catch (error) {
    console.error('Error adding team:', error);
    res.status(500).json({ success: false, message: "An error occurred while adding team" });
  }
});

  
exports.getAllTeam = async (req, res, next) => {
  try {
    const team = await Team.find();

    if (!team || team.length === 0) {
      return next(new ErrorHandler("Team not found", 404));
    }

    res.status(200).json({
      success: true,
      team
    });
  } catch (err) {
    return next(new ErrorHandler("Internal Server Error", 404));
  }
};

exports.getSingleTeam = async (req, res, next) => {
 
  try {
    const team = await Team.findById(req.params.teamId);
    res.status(200).json({
      success: true,
      team,
    });
    if (team.length === 0) {
      return next(new ErrorHandler("team not found", 400));
      }
  } catch (error) {
    return next(new ErrorHandler("team not found", 404));
  }
};



exports.deleteATeam = catchAsyncError(async (req, res, next) => {
  try {
    const deleteTeam = await Team.findByIdAndDelete(req.params.teamId);

    if (!deleteTeam) {
      return next(new ErrorHandler("Team not found", 404));
    }
    res.status(200).json({
      success: true,
      message: "Team deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});



// image gallery apis 
exports.addGallery = catchAsyncError(async (req, res, next) => {
  const {images } = req.body;

  try {
    const file = req.files.images;
    cloudinaryController.uploadToCloudinary(file, async (error, result) => {
      if (error) {
        console.error('Error uploading image to Cloudinary:', error);
        return res.status(500).json({ success: false, message: "Failed to upload image" });
      }
     
      // Pushing result.url into an array
      const imagesArray = [result.url];

      const gallery = new galleryModel({
        images: imagesArray,
      });
      await gallery.save();

     

      res.status(200).json({
        success: true,
        gallery,
        message: "gallery added successfully"
      });
    });
  } catch (error) {
    console.error('Error adding team:', error);
    res.status(500).json({ success: false, message: "An error occurred while adding team" });
  }
});


exports.getAllGallery = async (req, res, next) => {
  try {
    const gallery = await galleryModel.find();

    if (!gallery || gallery.length === 0) {
      return next(new ErrorHandler("Gallery not found", 404));
    }

    res.status(200).json({
      success: true,
      gallery
    });
  } catch (err) {
    return next(new ErrorHandler("Internal Server Error", 404));
  }
};




exports.deleteGallery = catchAsyncError(async (req, res, next) => {
  try {
    const deleteGallery = await galleryModel.findByIdAndDelete(req.params.galleryId);

    if (!deleteGallery) {
      return next(new ErrorHandler("gallery not found", 404));
    }
    res.status(200).json({
      success: true,
      message: "gallery deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

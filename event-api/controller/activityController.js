const catchAsyncError = require("../middleware/catchAsyncError");
const Activity = require("../models/activityModel");

const ErrorHandler = require("../utils/errorhandler");



// Add Activity User
//@POST API
 
exports.addActivity = catchAsyncError(async (req, res, next) => {
  const { description, name , dateTime, event_id } = req.body;
  const requiredFields = ['description', 'name', 'event_id','dateTime'];
  const missingFields = requiredFields.filter(field => !(field in req.body));
  
  if (missingFields.length > 0) {
    return next(new ErrorHandler(`Please provide ${missingFields.join(', ')}`, 400));
  }
  try {
    const activity = new Activity({
      description,
      name,
      event_id,
      dateTime
    });
   
   
    await activity.save();

   console.log(activity)
    res.status(200).json({ success: true, activity });
  } catch (error) {
    return next(new ErrorHandler("Internal Server Error", 500));
   
  }
});

// @des  to retrieve a list of Activity
// GET API

exports.getallActivity = catchAsyncError(async (req, res, next) => {
  try {
    const activity = await Activity.find();

    if (activity.length === 0) {
        return next(new ErrorHandler("Activity not found", 400));
        }
        
    res.status(200).json({
      success: true,
      activity,
    });
  
  } catch (error) {
    return next(new ErrorHandler("Internal Server Error", 500));
  }
});



// @des  to retrieve Activity by id
// GET API
exports.getSingleActivity = catchAsyncError(async (req, res, next) => {
 
  try {
    const activity = await Activity.findById(req.params.activityId);

    if (activity.length === 0) {
        return next(new ErrorHandler("activity not found", 400));
        }


    res.status(200).json({
      success: true,
      activity,
    });
   
  } catch (error) {
    return next(new ErrorHandler("Internal Server Error", 500));
  }
});

// delete Activity
// @  DELETE API

exports.deleteActivity = catchAsyncError(async (req, res, next) => {
  try {
    const deleteActivity = await Activity.findByIdAndDelete(req.params.activityId);

    if (!deleteActivity) {
      return next(new ErrorHandler("activity not found", 404));
    }
    res.status(200).json({
      success: true,
      message: "activity deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});




// Update existing Activity
//@PUT API :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

exports.updateActivity = catchAsyncError(async (req, res, next) => {
  const { name ,description } = req.body;
  try {
    const updateActivity = await Activity.findByIdAndUpdate(req.params.activityId, {
      name,description
    });
    if (!updateActivity || updateActivity.length === 0) {
      return next(new ErrorHandler("Activity not found", 404));
    }
    res.status(200).json({
      success: true,
      message: "Activity updated successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});
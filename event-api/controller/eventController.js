const catchAsyncError = require("../middleware/catchAsyncError");
const activityModel = require("../models/activityModel");
const Event = require("../models/eventModel");
const ErrorHandler = require("../utils/errorhandler");
const QRCode = require("qrcode")


// Add Event User
//@POST API

exports.addEvent = catchAsyncError(async (req, res, next) => {
  const { description, name ,dateTime} = req.body;
  const requiredFields = ['description','name','dateTime']
  const missingFields = requiredFields.filter(feild =>!(feild in req.body));

  if(missingFields.length > 0){
    return next(new ErrorHandler(`please provide ${missingFields.join(",")}` , 400))
  }

  try {
    const event = new Event({
      description,
      name,
      dateTime
    });
    const dataToEncode =
      event._id
   
    console.log(dataToEncode)
    const qrCodeDataURL = await QRCode.toDataURL(JSON.stringify(dataToEncode));
    event.QRCode = qrCodeDataURL;
    await event.save();
    res.status(200).json({ success: true, event });
  } catch (error) {
    console.error('Error generating or saving QR code:', error);
   
  }
});

// @des  to retrieve a list of event
// GET API


exports.getallEvent = catchAsyncError(async (req, res, next) => {
  try {
    const events = await Event.find();

    if (events.length === 0) {
      return next(new ErrorHandler("Events not found", 400));
    }
    
    const eventsWithActivities = [];
    
    for (const event of events) {
      const event_id = event._id;
      const activities = await activityModel.find({ event_id });
      eventsWithActivities.push({
        event,
        activities
      });
    }
    const eventNames = eventsWithActivities.map(eventItem => ({ name: eventItem.event.name  , _id:eventItem.event.id ,description: eventItem.event.description, QRCode:eventItem.event.QRCode,createdAt:eventItem.event.createdAt, dateTime:eventItem.event.dateTime}));


    res.status(200).json({
      success: true,
      events: eventsWithActivities,
      eventNames: eventNames
    });
  } catch (error) {
    return next(new ErrorHandler("Error occurred while fetching events and activities", 500));
  }
});









// @des  to retrieve event by id
// GET API
exports.getSingleEvent = catchAsyncError(async (req, res, next) => {
 
  try {
    const events = await Event.findById(req.params.eventId);
    res.status(200).json({
      success: true,
      events,
    });
    if (events.length === 0) {
      return next(new ErrorHandler("Events not found", 400));
      }
  } catch (error) {
    return next(new ErrorHandler("Event not found", 404));
  }
});

// delete event
// @  DELETE API

exports.deleteEvent = catchAsyncError(async (req, res, next) => {
  try {
    const deleteEvent = await Event.findByIdAndDelete(req.params.eventId);

    if (!deleteEvent) {
      return next(new ErrorHandler("Event not found", 404));
    }
    res.status(200).json({
      success: true,
      message: "Event deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});




// Update existing Event
//@PUT API :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

exports.updateEvent = catchAsyncError(async (req, res, next) => {
  const { name ,description } = req.body;
  try {
    const updateEvents = await Event.findByIdAndUpdate(req.params.eventId, {
      name,description
    });
    if (!updateEvents || updateEvents.length === 0) {
      return next(new ErrorHandler("Event not found", 404));
    }
    res.status(200).json({
      success: true,
      message: "Event updated successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});
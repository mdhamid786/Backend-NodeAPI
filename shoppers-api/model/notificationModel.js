const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  type: {
    type: String,
    required: true,
  },

  typeId:{
    type:String,
    required:true
  },

  unread: {
    type: Boolean,
    default: true,
  },

  readAt: {
    type: Date, 
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },


});

module.exports = mongoose.model('Notification', NotificationSchema);

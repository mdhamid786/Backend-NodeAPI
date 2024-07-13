const {mongoose } = require("mongoose");

const teamSchema = new mongoose.Schema({

    name:{
        type:String,
        required:[true, "Please Enter Your Name"]
    },
  
    mobile:{
        type:String,
        required:[true, "Please Enter Your Mobile Number"],
        minLength:10,
        maxLength:10,
    },
    QRCode: {
        type: String,
        required: [true, "Please Enter QR CODE"],
       
      },

      images: {
        type: Array,
        required: [true, "Please Enter Your  image"],
      },
    createdAt:{
        type:Date,
        default:Date.now
    }
});


module.exports = mongoose.model("Team" , teamSchema)
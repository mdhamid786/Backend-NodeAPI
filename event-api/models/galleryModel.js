const {mongoose } = require("mongoose");

const gallerySchema = new mongoose.Schema({

   
      images: {
        type: Array,
        required: [true, "Please Enter Your image"],
      },
    createdAt:{
        type:Date,
        default:Date.now
    }
});


module.exports = mongoose.model("Gallery" , gallerySchema)
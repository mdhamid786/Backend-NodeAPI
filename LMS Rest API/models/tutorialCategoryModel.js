const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
      },
      slug: {
        type: String,
        required: true,
        unique: true,
        index: true,
      },
      image: {
        type: String,
        default:
          "https://climate.onep.go.th/wp-content/uploads/2020/01/default-image.jpg",
      },
  
  
},{
    timestamps: true,


}
);

//Export the model
module.exports = mongoose.model('User', userSchema);
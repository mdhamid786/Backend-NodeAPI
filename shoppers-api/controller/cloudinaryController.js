// cloudinaryController.js
const dotenv = require("dotenv");
const cloudinary = require('cloudinary').v2;
dotenv.config({ path: "./config/config.env" });
 

 

cloudinary.config({
    cloud_name: 'dfpanyr0i',
    api_key: '892427648852683',
    api_secret: 'kNzRsenQv0QcLGJzMkW29qqMyuk',
    
});

// console.log(process.env.CLOUD_NAME);
// console.log(process.env.API_KEY);
// console.log(process.env.API_SECRET);


exports.uploadToCloudinary = (file, callback) => {
  cloudinary.uploader.upload(file.tempFilePath, { resource_type: 'image' }, (error, result) => {
    callback(error, result);
  });
};

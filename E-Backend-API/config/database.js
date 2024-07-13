const mongoose = require("mongoose")


// Function to connect to MongoDB database
const connectDatabase = ()=>{
    mongoose.connect("mongodb+srv://node-api:node-api-123@cluster0.inckfas.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
        // useNewUrlParser: true,
        // useUnifiedTopology: true
    }).then((data)=>{
        console.log(`Mongodb connected with server`);
    }).catch((error)=>{
        console.log(error)
    }) 
}

// Export the function to use it in other files
module.exports = connectDatabase
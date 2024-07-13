const mongoose = require("mongoose")


const connectDatabase = ()=>{
    mongoose.connect(process.env.MONGO_DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then((data)=>{
        console.log(`Mongodb connected with server`);
    }).catch((error)=>{
        console.log(error)
    }) 
}


module.exports = connectDatabase;
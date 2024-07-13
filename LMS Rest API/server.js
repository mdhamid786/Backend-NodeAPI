// import node package
const app = require("./app");
const dotenv = require("dotenv");
const express = require('express');
const cors = require('cors')
const connectDatabase = require("./config/database");
const { notFound, errorHandler } = require("./middleware/errorhandler");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const colors = require('colors');
var gravatar = require('gravatar');


app.use(express.json())
app.use(cors)
connectDatabase();

// 2:33
// app.use(
//     session({
//         resave:false,
//         saveUninitialized:false,
//         secret:"mysecret",
//         store:MongoStore.create({mongoUrl:process.env.MONGO_DB_URI, ttl:12*60*60,
//         })
//     })
// );
// // app.use(passport.initialize());
// app.use(passport.session())

// for env file import 
dotenv.config({path:"config/config.env"});


app.get("/", (req, res)=>{
    res.send("server is running")
})


app.use(notFound);
app.use(errorHandler);


 app.listen(process.env.PORT,()=>{
    console.log(`server is working on port http://localhost:${process.env.PORT}`.blue);
    
})






// unhandle promise error

// process.on("unhandledRejection", (err)=>{
//     console.log(`error : ${err.message}`);
//     console.log("shutting down the server due to unhandle promise rejection")
// })


// server.close(()=>{
//     process.exit(1)
// })




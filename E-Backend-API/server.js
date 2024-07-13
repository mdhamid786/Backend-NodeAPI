// import node package
const app = require("./app");
const dotenv = require("dotenv");
const express = require('express');
const cors = require('cors')

const connectDatabase = require("./config/database");
const { notFound, errorHandler } = require("./middleware/errorhandler");

app.use(express.json())
app.use(cors)
connectDatabase();

// for env file import 
dotenv.config({path:"config/config.env"});


app.get("/", (req, res)=>{
    res.send("server is running")
})


app.use(notFound);
app.use(errorHandler);

 app.listen(process.env.PORT,()=>{
    console.log(`server is working on port http://localhost:${process.env.PORT}`);
})







// unhandle promise error

// process.on("unhandledRejection", (err)=>{
//     console.log(`error : ${err.message}`);
//     console.log("shutting down the server due to unhandle promise rejection")
// })


// server.close(()=>{
//     process.exit(1)
// })




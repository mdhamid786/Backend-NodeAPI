const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const bodyParser = require("body-parser");
const errorMiddleware = require('./middleware/error')
const fileupload = require('express-fileupload')
const app = express();
const cors = require('cors')

app.use(bodyParser.json());



app.use(cors())

app.use(fileupload({
    useTempFiles:true
}))

//1. User
const user = require("./router/userRouter");
app.use("/api", user);
// 2. Address
const address = require("./router/addressRouter");
app.use("/api", address);
// 3. Bill
const bill = require("./router/billRouter");
app.use("/api", bill);
// 5. Shop
const shop = require("./router/shopRouter");
app.use("/api", shop);
// 5. Notification
const notification = require("./router/notificationRouter");
app.use("/api", notification);


const sectoraddress = require("./router/sectorRoute");
app.use("/api", sectoraddress);



app.use(errorMiddleware)

module.exports = app;

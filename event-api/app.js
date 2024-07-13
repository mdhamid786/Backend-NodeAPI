

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const fileupload = require('express-fileupload')
const errorMiddleware = require("./middleware/error")
const cors = require("cors")

// parse the body data in json format
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
// routing api url set 


app.use(fileupload({
    useTempFiles:true
}))


app.use(cors())

const user = require("./routers/userRouter");
const event = require("./routers/eventRouter")
const join = require("./routers/joinRouter")
const team = require("./routers/teamRouter")
const activity = require("./routers/activityRouter")
app.use("/api",user)
app.use("/api",event)
app.use("/api",join)
app.use("/api", team)
app.use("/api", activity)


// middleware set 
app.use(errorMiddleware)

module.exports = app

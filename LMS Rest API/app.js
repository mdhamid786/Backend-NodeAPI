const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const cookiesParser = require("cookie-parser")
const morgan = require("morgan")

// Middleware to parse request bodies as JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))
app.use(cookiesParser())
app.use(morgan("dev"));

// Middleware to enable CORS (Cross-Origin Resource Sharing)
app.use(cors());

// Root route of the API (to be defined in your application)
const user = require("./routers/userRouter");
// const blog = require("./routers/blogRouter");
app.use("/api", user);
// app.use("/api", blog);

// Exporting the Express application instance
module.exports = app;

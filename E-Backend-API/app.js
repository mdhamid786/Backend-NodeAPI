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
const product = require("./routers/productRouter");
const coupon = require("./routers/couponRouter");
const blog = require("./routers/blogRouter");
const category = require("./routers/categoryRouter");
app.use("/api", user);
app.use("/api", product);
app.use("/api", coupon);
app.use("/api", blog);
app.use("/api", category);

// Exporting the Express application instance
module.exports = app;

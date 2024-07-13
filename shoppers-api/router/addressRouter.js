const express = require("express");
const router = express.Router();
const {
  addAddress,
  getAdderssById,
  getAdderssByUserId,
  updateAddress,
} = require("../controller/addressController");
const { authenticate } = require("../middleware/auth");
const languageMiddleware = require("../middleware/languageMiddleware"); // Import the middleware

//Define routes below
router.route("/addaddress").post(authenticate, addAddress);
router.route("/getadderssbyid/:addressId").get(authenticate, getAdderssById);
router
  .route("/getAdderssbyuserid/:user_id")
  .get(authenticate, getAdderssByUserId);
router.route("/updateaddress/:user_id").put(authenticate, updateAddress);

module.exports = router;

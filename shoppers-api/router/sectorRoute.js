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
const { addSectorAddress, getAdderssUser, updateSectorAddress } = require("../controller/sectorConroller");

//Define routes below
router.route("/sectoraddress").post(authenticate, addSectorAddress);
router.route("/getsectoraddress/:user_id").get(authenticate, getAdderssUser);
router.route("/update-sector-addresss/:user_id").put(authenticate, updateSectorAddress);


module.exports = router;

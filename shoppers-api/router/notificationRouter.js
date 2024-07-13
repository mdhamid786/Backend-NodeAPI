const express = require("express");
const {
  authenticate
} = require("../middleware/auth");
const {
  userNotification,
  readNotification,
} = require("../controller/notificationController");
const router = express.Router();

router.route("/usernotification/:user_id").get(authenticate, userNotification);
router.route("/readnotification/:user_id").put(authenticate,readNotification);


module.exports = router;
const express = require('express')
const { addActivity, getallActivity, getSingleActivity, deleteActivity, updateActivity } = require('../controller/activityController')
const { authenticate } = require('../middleware/auth')

const router = express.Router()



router.route("/activity/add").post(authenticate, addActivity)
router.route("/activity").get(getallActivity)
router.route("/activity/:activityId").get(getSingleActivity)
router.route("/activity/:activityId").put(authenticate,updateActivity)
router.route("/activity/:activityId").delete(authenticate,deleteActivity)


module.exports = router
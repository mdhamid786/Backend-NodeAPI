const express = require('express')

const { addEvent, getallEvent, deleteEvent, updateEvent, getSingleEvent } = require('../controller/eventController')
const router = express.Router()
const {
  
    authenticate
  } = require("../middleware/auth"); 


router.route('/event/add').post(authenticate,addEvent)
router.route('/event').get(getallEvent)
router.route('/event/:eventId').delete(authenticate,deleteEvent)
router.route('/event/:eventId').put(authenticate,updateEvent)
router.route('/event/:eventId').get(authenticate,getSingleEvent)



module.exports = router
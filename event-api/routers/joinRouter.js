const express = require('express')
const { authenticate } = require('../middleware/auth')
const { joinUser } = require('../controller/joinController')
const router = express.Router()



router.route("/event/join").post(authenticate,joinUser);



module.exports = router
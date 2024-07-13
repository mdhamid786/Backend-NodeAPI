const express = require('express')
const {
    registerUser,
    loginUser,
    getProfileDetails,
    getAllUser,
    addUser,
    deleteUser,
    updateUser,
    checkUserExist,
   
} = require('../controller/userController')
const {
  authenticate
  } = require("../middleware/auth"); 
const router = express.Router()


router.route('/users/register').post(registerUser)

router.route('/users/login').post(loginUser)

router.route("/users/profile/:user_id").get(authenticate,getProfileDetails)

router.route("/users").get(authenticate,getAllUser);

router.route("/adduser").post(authenticate,addUser);

router.route("/delete/:user_id").delete(authenticate,deleteUser);

router.route("/update/:user_id").put(authenticate,updateUser);
router.route("/checkevent").post(authenticate,checkUserExist);





module.exports = router
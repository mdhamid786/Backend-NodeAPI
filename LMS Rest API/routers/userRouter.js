const express = require("express");
const {
  registerUser,
  loginUser,
  updateUser,
  saveAddress,
  blockUser,
  unBlockUser,
  adminLogin,
  updateOrderStatus,
  deleteUser,
  emptyCart,
  getAllUser,
  getUserDetails,
  getUserCart,
  userWishlist,
  userLogout,
  handleRefreshToken,
  getOrderByUserId,
  getAllOrders,
  getOrders,
  createOrder,
  applyCoupon,
  addToCart,
  updatePassword,
  forgotPassword,
  resetPassword,
} = require("../controllers/userController");
const { authMiddleware, isAdmin } = require("../middleware/auth");

const router = express.Router();

// route defined
router.route("/register").post(registerUser);  //done 
router.route("/login").post(loginUser);       // done
router.route("/admin-login").post(adminLogin); //done 
router.route("/all-users").get( getAllUser);  //done
router.route("/user/:id").get(authMiddleware, getUserDetails); //done
router.route("/edit-user").put(authMiddleware,updateUser);    //done
router.route("/user/:id").delete(deleteUser);          //done
router.route("/user/save-address").put( authMiddleware, saveAddress);   //done  
router.route("/block-user/:id").put(blockUser);       //done
router.route("/unblock-user/:id").put(unBlockUser);  //done
router.route("/refresh").get(handleRefreshToken);    //done 
router.route("/logout").get(userLogout);             //done
router.route("/update-password").put(authMiddleware, updatePassword); //done
router.route("/forgot-password-token").post(authMiddleware, forgotPassword); //done



// router.route("/reset-password/:token").put(resetPassword);

// 46 api ready 
module.exports = router;



// 65 api target in april -  may  -  june
// design of carbike ready 
// api integration
// payment gateway 
// admin panel






// In april done  
// 50 api created 
// home , login , register , product details , cart page , checkout page 
// no api integration 
// kal 50 api real fully



// may 
// week1
// may start
// 10 api create 
//  wishlist , product listing page , all responsive check


// may end 

// 5 api create
// address page , user profile , order page ,
// api integration start - login , register , forgot password , reset password , home page


// june start
// api integration , cart page , checkout page,address 
// admin panel start


// june end 
//  admin panel design 
// admin panel api integration





// 
// Winston
// Redis
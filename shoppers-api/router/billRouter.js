const express = require("express");
const router = express.Router();
const {
    authenticate,
    authorizedRoles,
    authorizedAdmin
} = require("../middleware/auth");
const multer = require('multer')
const path = require('path')
const {
    addBill,
    totalBill,
    SingleBill,
    updateBill,
    deleteBill,
   sigleShopAndSingleUser,
   TransectionShopToMultiUser,
    TransectionUserToMultiShop,
    TransectionUserToSingleShop,
    BillByUserId,
    BillByShopId,
} = require("../controller/billController");

// upload image using multer multipart images add
 
 


router.route("/addbill").post(authenticate,addBill);
router.route("/getallbills").get(authenticate,totalBill);
router.route("/getbill/:billId").get(authenticate, SingleBill);
router.route("/updatebill").put(updateBill);
router.route("/deletebill/:billId").delete(authenticate, deleteBill);


router.route("/getallbillbyuser/:user_id").get(authenticate, BillByUserId);
router.route("/getallbillbyshopid/:shop_id").get(authenticate, BillByShopId);


// user access...
router.route("/transaction-history-user-to-shop/:user_id/:shop_id").get(authenticate, TransectionUserToSingleShop);
router.route("/transaction-history-multiple-shop/:user_id").get( authenticate,TransectionUserToMultiShop);

// shop access only... 
router.route("/transaction-history-shop-to-user/:shop_id/:user_id").get(authenticate,sigleShopAndSingleUser);
router.route("/transaction-history-multi-user/:shop_id").get(authenticate,  TransectionShopToMultiUser);

module.exports = router;   
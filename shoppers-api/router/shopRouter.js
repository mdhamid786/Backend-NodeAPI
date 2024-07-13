const express = require("express");
const {
  addShop, 
  getAllShop,
  getSingleShop,
  updateShop,
  deleteShop,
  getShopByShopId,   

} = require("../controller/shopController");
const router = express.Router();
const {
  authenticate,
  authorizedRoles 
} = require("../middleware/auth"); 

router.route("/addshops").post(authenticate,  addShop);
router.route("/getallshops").get(authenticate, getAllShop);
router.route("/getshopbyid/:user_id").get(authenticate, getSingleShop);
router.route("/getshopbyshopid/:id").get(authenticate, getShopByShopId);
router.route("/updateshop").put(authenticate, updateShop);
router.route("/deleteshop/:shopId").delete(authenticate, authorizedRoles('shopkeeper', 'Admin'), deleteShop);


module.exports = router; 
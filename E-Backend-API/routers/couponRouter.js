const express = require("express");
const {
  addCoupn,
  getSingleCoupon,
  updateCoupon,
  deleteCoupon,
  getAllCoupon,
} = require("../controllers/couponController");

const router = express.Router();

// define routing
router.route("/add-coupon").post(addCoupn);
router.route("/coupon/:id").get(getSingleCoupon);
router.route("/coupon/:id").put(updateCoupon);
router.route("/coupon/:id").delete(deleteCoupon);
router.route("/coupon").get(getAllCoupon);


module.exports = router;
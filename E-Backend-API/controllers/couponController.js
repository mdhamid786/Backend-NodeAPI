const Coupon = require("../models/couponModel");
const validateMongoDbId = require("../utils/validateMongodbId");
const asyncHandler = require("express-async-handler");

// 1 ADD COUPON API

exports.addCoupn = async (req, res, next) => {
  try { 
    const coupon = await Coupon.create(req.body);
    res.status(200).json({
      success: true,
      coupon,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

// 2 GET ALL COUPON API
exports.getAllCoupon = asyncHandler(async (req, res) => {
  try {
    const coupon = await Coupon.find();
    if (!coupon) {
      res.status(404).json({
        success: false,
        message: "Coupon not found",
      });
    }
    res.status(200).json({
      success: true,
      coupons: coupon,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error: "Internal server error",
    });
  }

});

// 3 GET SINGLE COUPON API
exports.getSingleCoupon = async (req, res, next) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const coupon = await Coupon.findById(id);
    if (!coupon) {
      res.status(404).json({
        success: false,
        message: "Coupon not found",
      });
    }
    res.status(200).json({
      success: true,
      coupons: coupon,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

// 4 DELETE COUPON API
exports.deleteCoupon = async (req, res, next) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const coupon = await Coupon.findByIdAndDelete(id);
    if (!coupon) {
      res.status(404).json({
        success: false,
        message: "Coupon not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Coupon deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

// 5 UPDATE COUPON API
exports.updateCoupon = async (req, res, next) => {
    const { id } = req.params;
    validateMongoDbId(id);

    try {
    const coupon = await Coupon.findByIdAndUpdate(id, req.body, {
        new:true
    });

    if (!coupon) {
        res.status(404).json({
          success: false,
          message: "Coupon not found",
        });
      }
      res.status(200).json({
        success: true,
        message: "Coupon update successfully",
      });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            error: "Internal server error",
          });  
    }
};

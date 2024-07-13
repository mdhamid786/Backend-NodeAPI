const Bill = require("../model/billModel");
const User = require("../model/userModel");
const messageHandler = require("../utils/messageHandler");
const catchHandler = require("../utils/catchHandler");
const Wallets = require("../model/walletsModel");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const Notification = require("../model/notificationModel");
const cloudinary = require("cloudinary").v2;
const cloudinaryController = require("./cloudinaryController");
const crypto = require("crypto");
const config = require("../config/imageConfig");
const imageUrls = require("../config/imageConfig");
const { getapiHandler, getBillsAndRespond, calculateOutstandingAmount, getTranAndRespond, getPaymentModeFlags } = require("../utils/apiHandler");

// Add Bill
//@POST API  :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

exports.addBill = catchAsyncErrors(async (req, res, next) => {
  const { user_id, shop_id, amount, PaymentMode} = req.body;
  try {
    cloudinaryController.uploadToCloudinary(req.files.images, async (error, result) => {
      if (error) {
        return res.status(500).json({ error });
      }
      try {
        const PrivateImg = result.url.toString().split("/").slice(6, 8).join("/");
        const { isCredit, isDebit } = getPaymentModeFlags(PaymentMode);
        const newBill = new Bill({
          user_id,
          shop_id,
          comments: req.body.comments,
          amount: req.body.amount,
          PaymentMode: req.body.PaymentMode,
          images: PrivateImg,
          currency: req.body.currency,
          name: req.body.name,
          isCredit,
          isDebit,
        });
        await newBill.save();
        const newNotification = new Notification({
          type: "BILL_ADDED",
          typeId: newBill._id,
          user_id: newBill.user_id,
        });
        await newNotification.save();
        const transaction = new Wallets({
          user_id,
          shop_id,
          amount,
          isDebit,
          isCredit,
          transactionId: newBill._id,
          PaymentMode: newBill.PaymentMode,
          images: newBill.images,
          currency: newBill.currency,
          name: newBill.name,
          comments: newBill.comments,
        });
        await transaction.save();
        const outstandingAmount = await calculateOutstandingAmount(user_id, shop_id);
        await Wallets.updateOne(
          { _id: transaction._id },
          { $set: { outstandingAmount } }
        );
        return messageHandler.handleMessage(
          "BILL_ADDED",
          user_id,
          "",
          req,
          res
        );
      } catch (error) {
        res.status(500).json({
          message: error,
        });
      }
    });
  } catch (err) {
    res.status(500).json({
      err: err,
    });
  }
});

// Get All Bill from databse == used
//@Get API   :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

exports.totalBill = catchAsyncErrors(async (req, res, next) => {
  try {
    await getBillsAndRespond({ isDeleted: false }, undefined, req, res);
  } catch (err) {
    return catchHandler.handleCatchErrors(
      "INTERNAL_ERROR",
      err,
      undefined,
      req,
      res
    );
  }
});

// Get All Bill from databse by user_id  == used
//@Get API   :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

exports.BillByUserId = catchAsyncErrors(async (req, res, next) => {
  const { user_id } = req.params;
  try {
    await getBillsAndRespond(
      { user_id: user_id, isDeleted: false },
      user_id,
      req,
      res
    );
  } catch (err) {
    return catchHandler.handleCatchErrors(
      "INTERNAL_ERROR",
      err,
      user_id,
      req,
      res
    );
  }
});

// Get All Bill from databse by shop_id == used
//@Get API   :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

exports.BillByShopId = catchAsyncErrors(async (req, res, next) => {
  var user_id;
  const { shop_id } = req.params;
  try {
    await getBillsAndRespond(
      { shop_id: shop_id, isDeleted: false },
      user_id,
      req,
      res
    );
  } catch (err) {
    return catchHandler.handleCatchErrors(
      "INTERNAL_ERROR",
      err,
      user_id,
      req,
      res
    );
  }
});

// Get a specific bill by ID == used
//@GET API   :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

exports.SingleBill = catchAsyncErrors(async (req, res, next) => {
  var user_id;
  try {
    await getBillsAndRespond({ _id: req.params.billId }, user_id, req, res);
  } catch (err) {
    return catchHandler.handleCatchErrors("INTERNAL_ERROR", "", err, req, res);
  }
});

// Update Bill   == used
//@PUT API   :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

exports.updateBill = catchAsyncErrors(async (req, res, next) => {
  const { user_id, shop_id, PaymentMode, comments, amount, billId } = req.body;
  try {
    const file = req.files.images;
    cloudinaryController.uploadToCloudinary(file, async (error, result) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      const updateCriteria = {
        user_id,
        shop_id,
      };
      const PrivateImg = result.url.toString().split("/").slice(6, 8).join("/");
      const { isCredit, isDebit } = getPaymentModeFlags(PaymentMode);

      const updateFields = {
        $set: {
          comments,
          amount,
          PaymentMode,
          images: PrivateImg,
        },
      };
      await Bill.findByIdAndUpdate(billId, updateFields);
      const transactionUpdateFields = {
        $set: {
          comments,
          amount,
          PaymentMode,
          images: PrivateImg,
          isCredit,
          isDebit,
        },
      };
      await Wallets.updateOne(updateCriteria, transactionUpdateFields);
      const outstandingAmount = await calculateOutstandingAmount(user_id, shop_id);
      await Wallets.updateOne(
        { user_id, shop_id },
        { $set: { outstandingAmount } }
      );

      return messageHandler.handleMessage(
        "BILL_UPDATED",
        user_id,
        "",
        req,
        res
      );
    });
  } catch (err) {
    return catchHandler.handleCatchErrors("INTERNAL_ERROR", "", err, req, res);
  }
});

// Delete a bill by ID   == used
//@DELETE API   :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
exports.deleteBill = catchAsyncErrors(async (req, res, next) => {
  try {
    const { user_id } = req.body;
    const deletedBill = await Bill.findByIdAndUpdate(
      req.params.billId,
      { isDeleted: true },
      {
        new: true,
      }
    );
    if (!deletedBill || deletedBill.length === 0) {
      return messageHandler.handleMessage(
        "BILL_NOT_FOUND",
        user_id,
        "",
        req,
        res
      );
    }
    return messageHandler.handleMessage("BILL_DELETED", user_id, "", req, res);
  } catch (err) {
    return catchHandler.handleCatchErrors("INTERNAL_ERROR", "", err, req, res);
  }
});

//  {Transection Management} //

// @ get transection history {... user to single-shokeeper ...}
// @ GET API

exports.TransectionUserToSingleShop = catchAsyncErrors(
  async (req, res, next) => {
    try {
      const { user_id, shop_id } = req.params;
      const transactions = await Wallets.find({ user_id, shop_id });
      const transactionAmounts = transactions.map((transaction) => {
        return {
          amount: transaction.amount,
          isDebit: transaction.isDebit,
          comments: transaction.comments,
          isCredit: transaction.isCredit,
          transactionId: transaction.transactionId,
          timestamp: transaction.createdAt,
          PaymentMode: transaction.PaymentMode,
          images: transaction.images,
          currency: transaction.currency,
          date: transaction.date,
          outstandingAmount: transaction.outstandingAmount,
        };
      });

      if (!transactions || transactions.length === 0) {
        return messageHandler.handleMessage(
          "BILL_NOT_FOUND",
          user_id,
          "",
          req,
          res
        );
      }

      res.json(transactionAmounts);
    } catch (err) {
      return catchHandler.handleCatchErrors(
        "INTERNAL_ERROR",
        "",
        err,
        req,
        res
      );
    }
  }
);

// get transection history from {... user=> multi-shop ...}
// GET API

exports.TransectionUserToMultiShop = catchAsyncErrors(
  async (req, res, next) => {
    try {
      const { user_id } = req.params;
      await getTranAndRespond(
        {user_id},
        user_id,
        req,
        res
      );

    } catch (error) {
      console.error(" transaction amount history:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// get transection history from {... shop=> Muiti-user ... }      access only shopkeeper
// GET API

exports.TransectionShopToMultiUser = catchAsyncErrors(
  async (req, res, next) => {
    var user_id;
    try {
      const { shop_id } = req.params;
      await getTranAndRespond(
        {shop_id},
        user_id,
        req,
        res
      );
    } catch (err) {
      return catchHandler.handleCatchErrors(
        "INTERNAL_ERROR",
        "",
        err,
        req,
        res
      );
    }
  }
);

// @ get transection history {... shopkeeper to single-user ...} // access only shopkeeper
// @ GET API

exports.sigleShopAndSingleUser = catchAsyncErrors(async (req, res, next) => {
  try {
    const { shop_id, user_id } = req.params;
    await getTranAndRespond({shop_id,user_id}, req, res, user_id)
    res.json(transactions);
  } catch (err) {
    return catchHandler.handleCatchErrors("INTERNAL_ERROR", "", err, req, res);
  }
});

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

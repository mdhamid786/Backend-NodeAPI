const Bill = require("../model/billModel");
const User = require("../model/userModel");
const Wallets = require("../model/walletsModel");

const messageHandler = require("../utils/messageHandler");


  exports.getBillsAndRespond = async (query, userId, req, res) => {
    const bills = await Bill.find(query);
    if (!bills || bills.length === 0) {
      return messageHandler.handleMessage(
        "BILL_NOT_FOUND",
        "",
        userId,
        req,
        res
      );
    }
    res.status(200).json({
      success: true,
      bills,
    });
  };


  exports.getTranAndRespond = async (query, userId, req, res) => {
    // const bills = await Bill.find(query);
    const transactions = await Wallets.find(query);
    if (!transactions || transactions.length === 0) {
      return messageHandler.handleMessage(
        "BILL_NOT_FOUND",
        "",
        userId,
        req,
        res
      );
    }
    res.status(200).json({
      success: true,
      transactions,
    });
  };



  exports.getPaymentModeFlags = (PaymentMode) => {
    let isCredit = false;
    let isDebit = false;
  
    if (PaymentMode === "credit") {
      isCredit = true;
    } else if (PaymentMode === "debit") {
      isDebit = true;
    }
    return { isCredit, isDebit };
  };
  
  

// utility outstanding amount
exports.calculateOutstandingAmount = async (user_id, shop_id) => {
  try {
    const transactions = await Wallets.find({ user_id, shop_id });
    const totalDebits = transactions
      .filter((tr) => tr.isDebit)
      .reduce((acc, tr) => acc + tr.amount, 0);
    const totalCredits = transactions
      .filter((tr) => tr.isCredit)
      .reduce((acc, tr) => acc + tr.amount, 0);
    const outstandingAmount = totalCredits - totalDebits;
    return outstandingAmount;

  } catch (error) {
    throw new Error("Error calculating outstanding amount");
  }
};
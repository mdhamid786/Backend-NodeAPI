const Contact = require("../models/contactModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../config/validateMongoDbId");

// create contact
// POST API

exports.createContact = asyncHandler(async (req, res) => {
  try {
    const contact = await Contact.create(req.body);

    res.status(200).json({
      success: true,
      message: "Enquiry Form Submitted Successfully!",
      contact,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// get all contact
// GET API

exports.getAllContact = asyncHandler(async (req, res) => {
  try {
    const contacts = await Contact.find();

    if (!contacts) {
      res.status(404).json({
        success: false,
        message: "Contact not found..",
      });
    }
    res.status(200).json({
      success: true,
      contacts,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// get single contact
// GET API

exports.getSingleContact = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const contact = await Contact.findById(id);

    if (!contact) {
      res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }
    res.status(200).json({
      success: true,
      contact,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// delete contact by id
// DELETE API

exports.deleteContact = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const deleteContact = await Contact.findByIdAndDelete(id);
    if (!deleteContact) {
      res.status(404).json({
        success: false,
        message: "Contact form not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Contact from delete seccessfully",
    });
  } catch (error) {
    throw new Error(error);
  }
});

// update sttaus contact by id
// UPDATE

exports.updateContact = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const contact = await Contact.findByIdAndUpdate(
      id,
      { status: req.body.status },
      { new: true }
    );
    res
      .status(200)
      .json({ status: true, message: "Enquiry Updated Successfully!" });
  } catch (error) {
    throw new Error(error);
  }
});

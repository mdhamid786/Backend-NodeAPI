const express = require("express");
const {
  addCategory,
  getSingleCategory,
  updateCategory,
  deleteCategory,
  getAllCategory,
} = require("../controllers/categoryController");
const { authMiddleware } = require("../middleware/auth");
const router = express.Router();

// define routing
router.route("/add-category").post( authMiddleware, addCategory);
router.route("/category").get(authMiddleware,getAllCategory);
router.route("/category/:id").get(authMiddleware,getSingleCategory);
router.route("/category/:id").put(authMiddleware,updateCategory);
router.route("/category/:id").delete(authMiddleware,deleteCategory);



module.exports = router;

const express = require("express");
const {
  addProduct,
  getSingleProduct,
  getAllProducts,
  updateProduct,
  deleteProduct, 
  addWishlist,
  ratingProduct,
} = require("../controllers/productController");
const { authMiddleware } = require("../middleware/auth");
const router = express.Router();

// routing define
router.route("/add-product").post( authMiddleware, addProduct);
router.route("/product/:id").get(getSingleProduct);
router.route("/products").get(getAllProducts);
router.route("/products/:id").put(authMiddleware,updateProduct);
router.route("/products/:id").delete(authMiddleware,deleteProduct);
router.route("/wishlist").put(authMiddleware,addWishlist);
router.route("/rating").put(authMiddleware, ratingProduct);



module.exports = router; 
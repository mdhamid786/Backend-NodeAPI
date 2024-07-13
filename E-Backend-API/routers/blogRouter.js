const express = require("express");
const {
  likeBlog,
  dislikeBlog,
  updateBlog,
  deleteBlog,
  getSingleBolog,
  getAllBlog,
  addBlog,
  getSingleBlog,
} = require("../controllers/blogController");
const { authMiddleware } = require("../middleware/auth");

const router = express.Router();
  
// define routing
router.route("/add-blog").post( authMiddleware, addBlog);
router.route("/blog/likes").put( authMiddleware,likeBlog);
router.route("/blog/dis-likes").put( authMiddleware,dislikeBlog);
router.route("/blog/:id").put( authMiddleware,updateBlog);
router.route("/blog/:id").delete( authMiddleware,deleteBlog);
router.route("/blog/:id").get( authMiddleware,getSingleBlog);
router.route("/blogs").get( authMiddleware,getAllBlog);


module.exports = router;
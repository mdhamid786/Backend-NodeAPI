const express = require("express")
const { addTeam, getAllTeam, addGallery, getAllGallery, deleteATeam, deleteGallery, getSingleTeam } = require("../controller/teamController")
const { authenticate } = require("../middleware/auth")

const router = express.Router()


router.route("/addteam").post(authenticate, addTeam)
router.route("/teams").get(getAllTeam)
router.route("/teams/:teamId").get(getSingleTeam)
router.route("/teams/:teamId").delete(authenticate,deleteATeam)
router.route("/addgallery").post(authenticate, addGallery)
router.route("/gallery").get(getAllGallery)
router.route("/gallery/:galleryId").delete(authenticate,deleteGallery)



module.exports = router
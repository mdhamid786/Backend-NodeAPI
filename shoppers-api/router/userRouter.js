const {
  registerUser,
  loginUser,
  profileData,
  profileUpdate,
  allProfileData,
  deleteProfile,
  allShopkeeperProfiles,
  allTenantProfiles,
  adminLogin,
  addAdmin,
  addUser,
} = require("../controller/userController");
const express = require("express");
const router = express.Router();
router.route("/users/login").post(loginUser);

const {
  authenticate,
  authorizedRoles,
  authorizedAdmin,
} = require("../middleware/auth");

router.route("/users/register").post( registerUser);
router.route("/users/login").post(loginUser);
router.route("/users/profile/:id").get(authenticate, profileData);
router.route("/users/profiles").get(authenticate, allProfileData);
router.route("/users/role").put(authenticate, profileUpdate);
router.route("/users/delete/:user_id").delete(authenticate, deleteProfile);
router
  .route("/users/getallshopkeeper")
  .get(authenticate, allShopkeeperProfiles);
router.route("/users/getalltenant").get(authenticate, allTenantProfiles);
router.route("/users/newuseradd").post(authenticate, addUser);

module.exports = router;

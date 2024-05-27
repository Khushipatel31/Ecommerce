const express=require("express");
const userController = require('../controllers/userController');
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router=express.Router();
router.route("/register").post(userController.registerUser)
router.route("/login").post(userController.loginUser)
router.route('/logout').get(userController.logOut);
router.route('/password/forgot').post(userController.forgotPassword);
router.route('/password/reset/:token').put(userController.resetPassword);
router.route('/me').get(isAuthenticatedUser,userController.getUserDetails);
router.route('/me/update').put(isAuthenticatedUser,userController.updateProfile);
router.route('/password/update').put(isAuthenticatedUser,userController.updatePassword);
router.route('/admin/users').get(isAuthenticatedUser,authorizeRoles("admin"),userController.getAllUsers);
router.route('/admin/user/:id').get(isAuthenticatedUser,authorizeRoles("admin"),userController.getAllDetails).put(isAuthenticatedUser,authorizeRoles("admin"),userController.adminUpdateProfile).delete(isAuthenticatedUser,authorizeRoles("admin"),userController.deleteProfile);




module.exports=router;
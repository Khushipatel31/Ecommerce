const express = require("express");
const paymentController = require("../controllers/paymentController");
const router = express.Router();
const { isAuthenticatedUser } = require("../middleware/auth");
router.route("/payment/process").post(isAuthenticatedUser, paymentController.processPayment);
router.route("/stripeapikey").get(isAuthenticatedUser, paymentController.sendStripeApiKey);

module.exports=router;
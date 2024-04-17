const express = require("express");
const productController = require("../controllers/productController");
const product = require("../model/product");
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/products").get(productController.getAllProducts);
router
  .route("/admin/products")
  .get(
    isAuthenticatedUser,
    authorizeRoles("admin"),
    productController.getAdminProducts
  );
router
  .route("/admin/product/new")
  .post(
    isAuthenticatedUser,
    authorizeRoles("admin"),
    productController.createProduct
  );
router
  .route("admin/product/:id")
  .put(
    isAuthenticatedUser,
    authorizeRoles("admin"),
    productController.updateProduct
  )
  .delete(
    isAuthenticatedUser,
    authorizeRoles("admin"),
    productController.deleteProduct
  );

router.route("/product/:id").get(productController.getProductDetails);

router
  .route("/review")
  .put(isAuthenticatedUser, productController.createProductReview);
router
  .route("/review")
  .get(productController.getProductReviews)
  .delete(isAuthenticatedUser, productController.deleteProductReviews);

module.exports = router;

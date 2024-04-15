const Product = require("../model/product");
// const { ObjectId } = require('mongoose').Types; 
const mongoose = require("mongoose");
const { CustomHttpError } = require("../utils/CustomError");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/ApiFeatures");
exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
  let resultPerPage = 3;
  const productCount = await Product.countDocuments();
  let apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    // .paginate(resultPerPage);
  let products = await apiFeature.query;
  let filteredProductsCount = products.length;//8

  apiFeature.paginate(resultPerPage);

  // console.log(products);

  products = await apiFeature.query.clone();//3
  res.status(200).json({
    success: true,
    results: products.length,
    products,
    productCount,
    resultPerPage,
    filteredProductsCount
  });
});
//create product --admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id;
  const product = await Product.create(req.body);
  res.status(200).json({
    success: true,
    product,
  });
});

//update product --admin
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return res
      .status(500)
      .json({ success: false, msg: "No such product found" });
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true, //return the updated document,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    product,
  });
});

//delete product --admin
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return res
      .status(500)
      .json({ success: false, msg: "No such product found" });
  }
  let response = await Product.deleteOne({ _id: product._id });
  if (response.acknowledged) {
    return res.status(200).json({
      success: true,
      msg: "Deleted successfully",
    });
  }
  res.status(500).json({
    success: false,
    msg: "Something went wrong",
  });
});
function isValidObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}
//get product details
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  // try {
  // const id = isValidObjectId(req.params.id);
  // console.log(req.params.id);
  // if (id == "false") {
  //   throw new CustomHttpError(400, "Rdsjfhewkjfharameter  is missing!");
  // }
  // console.log(req.params.id);
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(
      new CustomHttpError("Required query parameter  is missing!", 400)
    );
  } else {
    return res.status(200).json({
      success: true,
      product,
    });
  }
  // } catch (e) {
  //   return next(e);
  // }
});


// const { ObjectId } = require('mongoose').Types; // Import ObjectId from mongoose

// exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
//   const { rating, comment, productId } = req.body;
//   const review = {
//     user: req.user._id, //as we want reference to that id if we write only id it will print only id and not reference
//     name: req.user.name,
//     rating: Number(rating),
//     comment,
//   };
//   console.log(req.user._id.toString());
//   const product = await Product.findById(productId);
//   const isReviewed =  product.reviews.find(
//     (rev) => rev.user.toString() === req.user._id.toString()
//   );

//   //found user id and replaced msg and rating
//   if (isReviewed) {
//     product.reviews.forEach((rev) => {
//       if (rev.user.toString() === req.user._id.toString())
//         (rev.rating = rating), (rev.comment = comment);
//     });
//   } else {
//     product.reviews.push(review);
//     product.numOfReviews = product.reviews.length;
//   }

//   // let avgRating=0;
//   // product.ratings=product.reviews.forEach(rev=>{
//   //   avgRating+=rev.rating;
//   // })/product.reviews.length;
//   //finding aggreagte
//   const avgRating = await Product.aggregate([
//     {
//       $match: {
//         _id:  new ObjectId(product._id) // Correct usage of ObjectId
//       }
//     },
//     {
//       $unwind: "$reviews"
//     },
//     {
//       $group: {
//         _id: "$_id",
//         avgRate: {
//           $avg: {
//             $convert: {
//               input: "$reviews.rating",
//               to: "double"
//             }
//           }
//         }
//       }
//     }
//   ]);

//   // Update product's average rating
//   if (avgRating.length > 0) {
//     product.ratings = avgRating[0].avgRate;
//   } else {
//     product.ratings = 0; // Set to default if no reviews
//   }
//   await product.save();
//   res.status(200).json({
//     success: true
//   })

// });

exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;
  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});


//get all reviews
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id);
  if (!product) {
    return next(new CustomHttpError(404, "Product not found"));
  }
  res.status(200).json({
    success: true,
    reviews: product.reviews
  })
})

exports.deleteProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);
  if (!product) {
    return next(new CustomHttpError(404, "Product not found"));
  }
  //jo reviews chahiye that will keep and else will be deleted
  const reviews = product.reviews.filter((rev) => rev._id.toString() !== req.query.id.toString());
  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });
  let ratings = 0;
  if (reviews.length === 0) {
    ratings = 0;
  }
  else {
    ratings = avg / reviews.length;
  }
  const numOfReviews = reviews.length;
  await Product.findByIdAndUpdate(req.query.productId, {
    reviews, ratings, numOfReviews
  }, {
    new: true,
    runValidators: true,
    useFindAndModify: false
  })

  await product.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  })
})
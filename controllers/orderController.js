const Order = require("../model/order");
const Product = require("../model/product");
const { CustomHttpError } = require("../utils/CustomError");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

//create New order
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    user: req.user._id,
    paidAt: Date.now()
  });

  res.status(201).json({
    success: true,
    order
  })

});

//get single order
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new CustomHttpError(404, "Order does not found"));
  }
  res.status(200).json({
    success: true,
    order
  })

})


//get order of logged in user
exports.myOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });
  if (!orders) {
    return next(new CustomHttpError(404, "Order does not found"));
  }
  res.status(200).json({
    success: true,
    orders
  })

})

//get all orders
exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find();
  let totalAmount = 0;
  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  })
  res.status(200).json({
    success: true,
    totalAmount,
    orders
  })
})

//update order status
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new CustomHttpError(404, "Order does not found"));
  }
  if (order.orderStatus === "Delivered") {
    return next(new CustomHttpError(400, "Already delivered the order"));
  }
  //when order delivered will decrease quantity in product model

  if (req.body.status === "Shipped") {
    order.orderItems.forEach(async (o) => {
      await updateStock(o.product, o.quantity);
    })
  }


  order.orderStatus = req.body.status;
  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({
    validateBeforeSave: false
  })

  res.status(200).json({
    success: true,
  })
})


async function updateStock(id, quantity) {
  const product = await Product.findById(id);
  product.stock -= quantity;
  await product.save({
    validateBeforeSave: false
  })
}

//delete order
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new CustomHttpError(404, "Order not found"));
  }

  let response = await Order.deleteOne({ _id: order._id });
  if (response.deletedCount > 0) {
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

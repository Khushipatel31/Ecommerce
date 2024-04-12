const catchAsyncErrors = require("../middleware/catchAsyncErrors");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.processPayment = catchAsyncErrors(async (req, res, next) => {
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "inr",
    metadata: {
      company: "Ecommerce",
    },
    // automatic_payment_methods: {
    //   enabled: true,
    // },
    // shipping:{
    //   name: 'Jane Doe',
    //   address: {
    //     line1: "shippingInfo.address",
    //     line2:"abc",
    //     city: "shippingInfo.city",
    //     state: "",
    //     postal_code:"123456",
    //     country:"IN",
    //   }
    // },
    description:"abc"
  });

  res
    .status(200)
    .json({ success: true, client_secret: myPayment.client_secret });
});

exports.sendStripeApiKey = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
});
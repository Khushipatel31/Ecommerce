const express = require("express");
const app=express();
const cors = require('cors');
const morgan=require("morgan")
const dotenv=require("dotenv");
// const fileUpload=require("express-fileupload");
dotenv.config();
app.use(morgan("dev"))
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
// app.use(fileUpload());
const { errorHandler } = require("./middleware/errorHandling");
const cookieParser=require("cookie-parser");
app.use(cookieParser())
app.use(cors());
//Route imports
const product=require("./routes/productRoute");
app.use("/api/v1",product);
const user=require("./routes/userRoutes")
app.use("/api/v1",user);
const order=require("./routes/orderRoute");
app.use("/api/v1",order);
const payment=require("./routes/paymentRoute");
app.use("/api/v1",payment);


//Middleware for error
app.use(errorHandler);
module.exports=app; 
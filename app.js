const express = require("express");
const app=express();
const cors = require('cors');
const bodyParser=require("body-parser");
const fileUpload=require("express-fileupload");
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(fileUpload());
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
//Middleware for error
app.use(errorHandler);
module.exports=app; 
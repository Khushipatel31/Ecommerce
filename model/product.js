const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter product name"],
        trim:true
    },
    description: {
        type: String,
        required: [true, "Please enter product description"],
    },
    price: {
        type: Number,
        required: [true, "Price cannot exceed 8 characters"],
    },
    ratings: {
        type: Number,
        default: 0,
    },
    numOfReviews: {
        type: Number,
        default: 0,
    },
    images: [ //will use cloudmary jema public id and url madse
        {
            public_id: {
                type: String,
                require: true
            },
            url: {
                type: String,
                require: true
            }
        }
    ],
   category: {
        type: String,
        required: [true, "Please enter product category"],
    },
    stock: {
        type: Number,
        required: [true, "Please enter product stock"],
        maxLength:[4,"stock cannot exceed 4 characters"],
        default:1
    },
    reviews:[
        {
            user:{
                type:mongoose.Schema.ObjectId,
                ref:'user',//while module exports whatever we have written 
                required:true
            },
            name:{
                type:String,
                required:true
            },
            rating:{
                type:String,
                required:true
            },
            comment:{
                type:String,
            }
        }
    ],
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'user',
        required:true
        //this is added in product controller while creating product
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
   
});

module.exports = mongoose.model("product", productSchema, "product");

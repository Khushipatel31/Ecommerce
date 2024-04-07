const mongoose=require("mongoose");
require('dotenv').config()

const {MONGODB_URL}=process.env;
module.exports.getDBConnection=function(){
    mongoose.connect(MONGODB_URL).then(()=>console.log("DB connected"))
    // .catch((err)=>{
    //     console.log(err);
    // })//this is not required as we have used in server.js to handle error
}
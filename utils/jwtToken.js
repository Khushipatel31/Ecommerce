//creating token and saving in cookie
const sendToken=(user,status,res)=>{
    const token=user.getJWTToken();
    const options={
        httpOnly:true,
        expires:new Date(Date.now()+process.env.COOKIE_EXPIRE*24*60*60*1000)//2 days to milliseconds
    }
    return res.status(status).cookie('token',token,options).json({
       success:true,
        user,token
    })
}
module.exports=sendToken;
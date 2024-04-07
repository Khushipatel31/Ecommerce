const users=require("../model/user");



async function check(data){
  let res=await users.findOne({email:data});
  return res;
}


    async function signup(data){
        const user = new users({
            firstName:data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password,
            image:data.image,
           confirmPassword:data.confirmPassword
        });
        user.save();
        console.log(user);
        return user;
    }

    async function login(email,password){

        let res = await users.findOne({ email: email, password:password });
        console.log(res);
        return res;
    }
    

module.exports={
    login,
    signup,
    check
}
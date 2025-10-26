let jwt = require("jsonwebtoken");
let bcrypt = require("bcrypt");
const { Usermodel } = require("../models/userModel");

//login
let login = async(req,res)=>{
try{
let email = await Usermodel.findOne({email:req.body.email});
if(!email){
    return res.status(404).json({
        success:false,
        message:"User does not exist"
    });
}
let password = await bcrypt.compare(req.body.password,email.password);
if(!password){
    return res.status(400).json({
        success:false,
        message:"Password is incorrect"
    });
}
let data = {user:{id:email._id}}
let token  = jwt.sign(data,process.env.JWT_PASS);
return res.status(200).json({
    success:true,
    token:token
});
}
catch(error){
 return res.status(500).json({
            success:false,
            message:error.message
        })
}
}

//Sign up
let signUp = async (req,res)=>{
try{
    let email = await Usermodel.findOne({email:req.body.email});
    if(email){
        return res.status(400).json({
            success:false,
            message:"User already exist"
        });
    }
    let password = await bcrypt.hash(req.body.password,Number(process.env.HASH_PASS));
    let userData = new Usermodel({
        username:req.body.user,
        email:req.body.email,
        phone:req.user.phone,
        password:password,
        county:req.user.county,
        location_description:req.body.description
    });
    let user = userData.save();
    let data = {
        user:{
            id:user._id
        }
    }
    let token  = jwt.sign(data,process.env.JWT_PASS);
    return res.status(200).json({
    success:true,
    token:token
});
}
catch(error){
 return res.status(500).json({
            success:false,
            message:error.message
        })
}
}

module.exports={login,signUp}
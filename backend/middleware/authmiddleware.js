let jwt = require("jsonwebtoken");

let authMiddleware = (req,res,next)=>{
    try{
let token  = req.header("auth-token");
if(!token){
    return res.status(404).json({
        success:false,
        message:"Token has not been found"
    });
}
let data = jwt.verify(token,process.env.JWT_PASS);
req.user = data.id;
next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

module.exports = {authMiddleware};
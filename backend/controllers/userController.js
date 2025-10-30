let jwt = require("jsonwebtoken");
let bcrypt = require("bcrypt");
const { Usermodel } = require("../models/userModel");
const { postModel } = require("../models/postmodel");
const { Applicationmodel } = require("../models/resumemodel");

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
        let data = {user:
            {id:
                email._id}}
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
            phone:req.body.phone,
            password:password,
            county:req.body.county,
            location_description:req.body.description
        });
        let user = await userData.save();
        let data = {
            user:{
                id:user._id
            }
        }
        let token  = jwt.sign(data,process.env.JWT_PASS);
        return res.status(201).json({
            success:true,
            token:token
        });
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

//upload
let Upload = (req,res)=>{
    try{
        if(!req.file){
            return res.status(404).json({
                success:false,
                message:"No files have been found"
            });
        }
        return res.status(200).json({
            success:true,
            url:req.file.path
        });
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

let getcredentials = async(req,res)=>{
    try{
        // ✅ Added .select('-password') to exclude password
        let user = await Usermodel.findOne({_id:req.user.id}).select('-password');
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User has not been found"
            });
        }
        return res.status(200).json({
            success:true,
            credentials:user
        });
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

// get news
let getnews = async(req,res)=>{
    try{
        let news = await postModel.find({category:"news"});
        // ✅ Fixed validation
        if(!news || news.length === 0){
            return res.status(404).json({
                success:false,
                message:"No news found"
            });
        }
        return res.status(200).json({
            success:true,
            news
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        });  
    }
}

//get products
let getproducts = async(req,res)=>{
    try{
        let products = await postModel.find({category:"products"});
        // ✅ Fixed validation and message
        if(!products || products.length === 0){
            return res.status(404).json({
                success:false,
                message:"No products found"
            });
        }
        return res.status(200).json({
            success:true,
            products
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        });  
    }
}

//get jobs
let getjobs = async(req,res)=>{
    try{
        let jobs = await postModel.find({category:"jobs"});
        // ✅ Fixed validation and message
        if(!jobs || jobs.length === 0){
            return res.status(404).json({
                success:false,
                message:"No jobs found"
            });
        }
        return res.status(200).json({
            success:true,
            jobs
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        });  
    }
}

//posts
let posts = async(req,res)=>{
    try{
        let user = await Usermodel.findOne({_id:req.user.id});
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User has not been found"
            });
        }
        let post = new postModel({
            name:user.username,
            title:req.body.title,
            location:user.county,
            category:req.body.category,
            image_url:req.body.image_url,
            description:req.body.description,
            details:req.body.details,
            price:req.body.price,
            tel:req.body.tel,
            salary:req.body.salary,
            responsibities:req.body.responsibities
        });
        await post.save();
        return res.status(200).json({
            success:true,
            message:"Post has been added"
        });
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        }); 
    }
}

let Resume = async(req,res)=>{
    try{
        let user = await Usermodel.findOne({_id:req.user.id});
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User has not been found"
            });
        }
        let applications = new Applicationmodel({
            owner:req.body.owner,
            job_title:req.body.title,
            salary:req.body.salary,
            job_details:req.body.details,
            applicant:user.username,
            resume:req.body.url,
        });
        await applications.save();
        return res.status(200).json({
            success:true,
            message:"Resume has been uploaded successfully"
        });
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        });  
    }
}

let myapplication = async(req,res)=>{
    try{
        let user = await Usermodel.findOne({_id:req.user.id});
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User has not been found"
            });
        }
        let myapplication = await Applicationmodel.find({applicant:user.username});
        if(!myapplication || myapplication.length === 0){
            return res.status(404).json({
                success:false,
                message:"No applications found"
            });
        }
        return res.status(200).json({
            success:true,
            myapplication  
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        });  
    }
}

let receivedApplication = async(req,res)=>{
    try{
        let user = await Usermodel.findOne({_id:req.user.id});
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User has not been found"
            });
        }
        let receivedapplication = await Applicationmodel.find({owner:user.username});
        if(!receivedapplication || receivedapplication.length === 0){
            return res.status(404).json({
                success:false,
                message:"No applications found"
            });
        }
        return res.status(200).json({
            success:true,
            receivedapplication  
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        });  
    }
}

let updateStatus = async (req,res)=>{
    try{
        let user = await Usermodel.findOne({_id:req.user.id});
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User has not been found"
            });
        }
        
        let update = req.body.status;
        
        if(update === "accepted"){
            let application = await Applicationmodel.findOneAndUpdate(
                {_id:req.body.id},
                {status:update}
            );
            
            if(!application){
                return res.status(404).json({
                    success:false,
                    message:"Application not found"
                });
            }
            
            await postModel.findOneAndUpdate(
                {job_title:application.job_title},
                {status:"Not available"}
            );
            
            // ✅ Send success response
            return res.status(200).json({
                success:true,
                message:"Application accepted and job marked as unavailable"
            });
        } else {
            // ✅ Handle other status updates (rejected, pending, etc.)
            let application = await Applicationmodel.findOneAndUpdate(
                {_id:req.body.id},
                {status:update}
            );
            
            if(!application){
                return res.status(404).json({
                    success:false,
                    message:"Application not found"
                });
            }
            
            return res.status(200).json({
                success:true,
                message:`Application status updated to ${update}`
            });
        }
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        });  
    }
}

module.exports = {
    login,
    signUp,
    Upload,
    getcredentials,
    getnews,
    getproducts,
    getjobs,
    posts,
    Resume,
    receivedApplication,
    myapplication,
    updateStatus
}
let multer = require("multer");
let cloudinary = require("cloudinary").v2;
let {CloudinaryStorage} = require("multer-storage-cloudinary");

cloudinary.config({
cloud_name:"",
api_key:"",
api_secret:""
});

let storage = CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        folder_name:"Neighbourhood images",
        allowed_formats:["png","jpeg","jpg","doc","docx","pdf"]
    }
});

let upload = multer({storage:storage});
module.exports={upload};

let mongoose = require("mongoose");
let userSchema  = new mongoose.Schema({
username:{
    type:String,
    required:true
},
email:{
    type:String,
    required:true
},
phone:{
    type:Number,
    required:true
},
password:{
    type:String,
    required:true
},
county:{
     type:String,
    required:true
},
location_description:{
    type:String,
    required:true
}
});

let Usermodel = mongoose.model("User",userSchema);
module.exports={Usermodel};
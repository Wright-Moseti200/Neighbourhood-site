let mongoose = require("mongoose");
let postmodelSchema = new mongoose.Schema({
name:{
    type:String, 
},
title:{
    type:String,
},
location:{
    type:String
},
category:{
 type:String
},
image_url:{
 type:String
},
description:{
     type:String
},
details:{
     type:String
},
price:{
    type:Number
},
tel:{
    type:Number
},
salary:{
     type:Number
},
responsibities:{
     type:String
},
status:{
    type:String,
    default:""
}
});

let postModel = mongoose.model("Post",postmodelSchema);
module.exports = {postModel}
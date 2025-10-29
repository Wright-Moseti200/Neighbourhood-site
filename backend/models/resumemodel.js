let mongoose = require("mongoose");
let applicationSchema  = new mongoose.Schema({
    owner:{
        type:String
    },
    job_title:{
        type:String,
    },
    salary:{
        type:Number
    },
    location:{
        type:String,
    },
    job_details:{
        type:String
    },
    applicant:{
        type:String,
    },
    resume:{
        type:String,
    },
    status:{
        type:String,
        default:"pending"
    }
});

let Applicationmodel = mongoose.model("application",applicationSchema);
module.exports = {Applicationmodel};
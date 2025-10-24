let mongoose = require("mongoose");
require("dotenv").config();

let connectDB = async()=>{
    try{
        await mongoose.connection(`${process.env.MONGO_URL}/neighbourhood`)
    }
    catch(error){
        console.log(error.message)
    }
}

module.exports = {connectDB};
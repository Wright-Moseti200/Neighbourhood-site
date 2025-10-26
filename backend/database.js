let mongoose = require("mongoose");
require("dotenv").config();

let connectDB = async()=>{
    try{
        await mongoose.connect(`${process.env.MONGO_URL}/neighbourhood`);
        console.log("Database is connected successfuly");
    }
    catch(error){
        console.log(error.message)
    }
}

module.exports = {connectDB};
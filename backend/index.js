let express = require("express");
let app = express();
require("dotenv").config();
let PORT = process.env.PORT || 3000;
let ratelimit = require("express-rate-limit");
const { connectDB } = require("./database");
let cors =  require("cors");
const { userRouter } = require("./routes/userRoutes");
let limit = ratelimit({
    windowMs:15*60*1000,
    max:100
});
app.set("trust proxy",1);
app.use(cors());
app.use(express.json());

connectDB();
app.use("/api/user",userRouter);
app.get("/",(req,res)=>{
res.send("Express server is running")
});

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});
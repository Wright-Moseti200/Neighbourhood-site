let express = require("express");
const { upload } = require("../middleware/uploadmiddleware");
const {  login,
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
    updateStatus } = require("../controllers/userController");
const { authMiddleware } = require("../middleware/authmiddleware");
let userRouter = express.Router();

userRouter.post("/login",login);
userRouter.post("/signup",signUp);
userRouter.get("/getcredentials",authMiddleware,getcredentials);
userRouter.get("/getnews",getnews);
userRouter.get("/getproducts",getproducts);
userRouter.get("/getjobs",getjobs);
userRouter.post("/post",authMiddleware,posts)
userRouter.post("/uploaddocument",upload.single("document"),Upload);
userRouter.post("/uploadimage",upload.single("image"),Upload);
userRouter.post("/resume",authMiddleware,Resume);
userRouter.get("/myapplication",authMiddleware,myapplication)
userRouter.get("/receivedapplication",authMiddleware,receivedApplication)
userRouter.put("/updatestatus",authMiddleware,updateStatus)

module.exports={userRouter}
let express = require("express");
const { upload } = require("../middleware/uploadmiddleware");
const { login, signUp, Upload, } = require("../controllers/userController");
const { authMiddleware } = require("../middleware/authmiddleware");
let userRouter = express.Router();

//userRouter.post("/login",login);
//userRouter.post("/signup",signUp);
//userRouter.get("/getcredentials",authMiddleware);
//userRouter.get("/getnews",);
//userRouter.get("/getproducts",);
//userRouter.get("/getjobs",);
//userRouter.post("/post",authMiddleware)
//userRouter.post("/uploaddocument",upload.single("document"),Upload);
//userRouter.post("/uploadimage",upload.single("image"),Upload);
//userRouter.post("/resume",authMiddleware,);
//userRouter.get("/myapplication",authMiddleware,)
//userRouter.get("/receivedapplication",authMiddleware)
userRouter.put("/updatestatus",authMiddleware,)

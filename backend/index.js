let express = require("express");
let app = express();
let PORT = 3000

app.get("/",(req,res)=>{
res.send("Express server is running")
})

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})
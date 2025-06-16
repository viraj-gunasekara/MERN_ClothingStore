const express=require("express");
const cors=require('cors');

const app=express();

app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
    return res.status(200).send({message:"welcome to Clothing store - server", status:true})
});

// User
const authRouter = require("./routes/auth.routes.js");
app.use("/auth",authRouter);

const userRouter = require("./routes/user.routes.js");
app.use("/api/users",userRouter);

// Products
const productRouter = require("./routes/product.routes.js");
app.use("/api/products",productRouter);

const adminProductRouter = require("./routes/product.admin.routes.js");
app.use("/api/admin/products",adminProductRouter);

module.exports={app};
const express=require("express");
const app=express();
const path=require("path");
require("./db/conn");

const port=process.env.PORT || 3000;

const static_path=path.join(__dirname,"../home");
app.use(express.static(static_path))
app.set("view engine","hbs");

app.get("/",(req,res)=>{
    res.render("index")
})

app.get("/login",(req,res)=>{
    res.send("signup")
})

app.listen(3000,()=>{
    console.log("port connected");
})
const express=require("express");
const app=express();
require('dotenv').config({path:"./config/.env"})

const connectDb=require("./config/connectDb")
// const connectDb=require("./config/connectDb")
// console.log(connectDb):
connectDb() 
const User=require("./model/user")
app.use(express.json())
const PORT=process.env.PORT||6000;

app.post("/post",async(req,res)=>{
    const {fullName,email,phone}=req.body
    try {
        const newUser=new User({
            fullName,phone,email
        })
        await newUser.save()
        res.send(newUser)
    } catch (error) {
        res.send(error.message)
    }
})

app.get("/get",async(req,res)=>{
    try {
        const users=await User.find()
       
        res.send(users)
    } catch (error) {
        res.send(error.message)
    }
})
app.get("/get/:id",async(req,res)=>{
    try {
        const theUser=await User.findById(req.params.id)
        res.send(theUser)
    } catch (error) {
        res.send(error.message) 
    }
})

app.delete("/delete/:id",async(req,res)=>{
    try {
        const deletedUser=await User.findByIdAndDelete(req.params.id)
        res.send("the user mchaa ......")
    } catch (error) {
        res.send(error.message) 
    }
})

app.put("/edit/:id",async(req,res)=>{
    try {
        const editedUser=await User.findByIdAndUpdate(req.params.id,{...req.body},{new:true})
        res.send(editedUser)
    } catch (error) {
        res.send(error.message) 
    }
})





app.listen(PORT,err=>err?
    console.log(err)
    :console.log(`the server is successfuly runing on PORT ${PORT}`)
    );

const express=require("express")
const { UserModel } = require("../Models/user.model")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const userRouter=express.Router()

userRouter.post("/register",async(req,res)=>{
    const {email,password,gender,name}=req.body
    let already= await UserModel.findOne({email})

    if(already){
        res.status(200).send({"msg":"user already registersd"})
    }else{
        bcrypt.hash(password, 5, async(err, hash) =>{
            if(hash){
                let newuser=new UserModel({email,password:hash,gender,name})
                await newuser.save()
                res.status(200).send({"msg":"user registered successfully"})
            }else{
                res.status(400).send({"err":err.message})
            }
        })
    }
})
userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body
    let already= await UserModel.findOne({email})

    if(already){   
        bcrypt.compare(password, already.password, async(err, result)  =>{
            if(result){
                console.log(result)
                jwt.sign({ author:already.name,authorID:already._id }, "wow", async(err, token)=> {
                   if(token){
                    res.status(200).send({"msg":"login successfully",token})
                   }else{
                     res.status(400).send({"err":err.message})
                   }
                  })
            }else{
                res.status(400).send({"err":err.message})
            }
        })
    }
})




module.exports={
    userRouter
}
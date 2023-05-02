

const express=require("express")
const { PostModel } = require("../Models/post.model")

const postRouter=express.Router()


postRouter.post("/add",async(req,res)=>{
    console.log(req.body)
    try {
        let newpost=new PostModel(req.body)
        await newpost.save()
        res.status(200).send({"msg":"new post added"})
    } catch (error) {
        res.status(400).send({"err":error.message})
    }
})

postRouter.get("/",async(req,res)=>{
const {authorID}=req.body
    const {device,device1,device2}=req.query
    let query={authorID}
if(device){
    query.device=device
}
if(device1 && device2){
    let data=await PostModel.find({$and:[{device:device1},{device:device2}]})
    res.status(200).send(data)
}
try {
    let data=await PostModel.find(query)
    res.status(200).send(data)
} catch (error) {
    res.status(400).send({"err":error.message})
}
})

postRouter.get("/:id",async(req,res)=>{
    const {id}=req.params

    try {
        let find=await PostModel.find({_id:id})
        console.log(find)
        res.status(200).send(find)
        
    } catch (error) {
        res.send({"err":error.message})
    }
})

postRouter.patch("/update/:id",async(req,res)=>{
    const {id}=req.params
    try {
        let updateuser=await PostModel.findByIdAndUpdate({_id:id},req.body)
        res.status(200).send({"msg":"post updated succesfully",updateuser})
    } catch (error) {
        res.status(400).send({"err":error.message})
    }
})


postRouter.delete("/delete/:id",async(req,res)=>{
    const {id}=req.params
    try {
        let deleteduser=await PostModel.findByIdAndDelete({_id:id})
        res.status(200).send({"msg":"post deleted succesfully",deleteduser})
    } catch (error) {
        res.status(400).send({"err":error.message})
    }
})

module.exports={
    postRouter
}
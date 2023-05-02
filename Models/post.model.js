const mongoose=require("mongoose")

const PostSchema=mongoose.Schema({
    "title" :{ type:String,required:true},
"body" : { type:String,required:true},
"device" : { type:String,required:true},
"author" : { type:String,required:true},
"authorID" : { type:String,required:true},
},{
    versionKey:false
})

const PostModel=mongoose.model("posts",PostSchema)

module.exports={
    PostModel
}
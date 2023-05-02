const jwt=require("jsonwebtoken")
const auth=(req,res,next)=>{

    let token=req.headers.authorization
    if(token){
        token =token.split(" ")[1]
        jwt.verify(token, 'wow', async(err, decoded)=> {
           if(decoded){
            console.log(decoded)
            req.body.author=decoded.author
            req.body.authorID=decoded.authorID
            next()
           }else{
            res.status(400).send({"err":err.message})
           }
          })
          
    }else{
        res.status(400).send({"err":"please Provide the token"})
    }

}


module.exports={
    auth
}
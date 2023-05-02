
const express=require("express")
const { connection } = require("./db")
const { userRouter } = require("./Routes/user.route")
const { auth } = require("./Middleware/auth.middleware")
const { postRouter } = require("./Routes/post.route")
const cors=require("cors")
const app=express()
app.use(cors())
app.use(express.json())

app.use("/users",userRouter)

app.use(auth)
app.use("/posts",postRouter)

app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("connected to db")
    } catch (error) {
     console.log(error)   
    }
    console.log(`connected to the port ${process.env.port}`)
})
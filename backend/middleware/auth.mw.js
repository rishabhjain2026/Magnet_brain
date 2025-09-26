const jwt=require("jsonwebtoken")
const dotenv=require('dotenv')
dotenv.config()

const verifytoken=(req,res,next)=>{
    const token=req.headers["x-access-token"]

    if(!token){
        res.status(400).send("token is not provided")
        return
    }

    jwt.verify(token,process.env.secret,(err,decoded)=>{
        if(err){
            res.status(400).send("token is not valid")
            return
        }
        req.user=decoded
        next()
    })
}
module.exports=verifytoken;
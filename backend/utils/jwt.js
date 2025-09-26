const jwt=require('jsonwebtoken')
const dotenv=require('dotenv')
dotenv.config()
exports.createtoken=async(payload)=>{
    try {
        const token=await jwt.sign(payload,process.env.secret,{expiresIn:'2h'})
        return token
    }
    catch (error) {
        console.log(error)
        return null
    }
}

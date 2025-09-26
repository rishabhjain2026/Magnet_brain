const usermodel=require('../model/user.model')
const bcrypt=require('bcrypt')
const token=require("../utils/jwt")

exports.signup=async(req,res)=>{
    try {
        const info={
        name:req.body.name,
        email:req.body.email,
        password:await bcrypt.hash(req.body.password,8)
    }

    const userinfo=await usermodel.create(info)
    console.log(userinfo);
    res.status(200).send("user created succefully")
    
    } catch (error) {
        console.log(error)
        res.status(404).send("error in signup ")
    }
}

exports.signin=async(req,res)=>{
    try {
        const info={
            email:req.body.email,
            password:req.body.password
        }
        if(!info.email || !info.password){
            res.status(404).send("required field are missing")
            return
        }

        const user=await usermodel.findOne({email:info.email})
        if(!user){
            console.log("user with this email does not exist");
            res.status(404).send("user with this email does not exist")
            return
        }

        const verifypassword=await bcrypt.compare(info.password,user.password)

        if(!verifypassword){
            console.log("password is incorrect");
            res.status(404).send("password is incorrect")
            return
        }


        const mytoken=await token.createtoken({id:user._id,email:user.email})
        

        res.status(201).send({
            message: "Your token is",
            token: mytoken
        })
        
    } catch (error) {
        console.log(error)
        res.status(400).send("error in signin ")
    }
}
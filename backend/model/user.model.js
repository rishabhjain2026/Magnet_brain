const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String,
        unique:true,
        require:true
    },
    password:{
        type:String
    }
})

module.exports=mongoose.model('users',userSchema);
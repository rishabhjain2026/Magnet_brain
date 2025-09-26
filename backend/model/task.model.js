const mongoose=require('mongoose');

const TaskSchema=new mongoose.Schema({
    title:{
        type:String
    },
    description:{
        type:String
    },
    duedate:{
        type:Date
    },
    status:{
        type:String,
        enum:['pending','completed'],
        default:'pending'
    },
    id:{
        type:String
    }
})

module.exports=mongoose.model('Tasks',TaskSchema);
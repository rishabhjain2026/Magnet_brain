const usermodel=require('../model/task.model')
const bcrypt=require('bcrypt')

exports.createtask=async(req,res)=>{
    try {
        const data=req.body;

        const datacreated=await usermodel.create(data)

        console.log("Task created succesfully");
        console.log(datacreated);
        
        res.status(200).send(datacreated)
        
    } catch (error) {
        console.log(error)
        res.status(400).send("error in creating task ")
    }
}

exports.gettask=async(req,res)=>{
    try {
        const task=await usermodel.find();
        console.log(task);
        res.status(201).send(task);
        
    } catch (error) {
        console.log(error)
        res.status(400).send("error in getting task ")
    }
}

exports.get_task_by_id=async (req,res)=>{
    try {
        const id=req.params.id

        const task=await usermodel.find({id:id})

        console.log(task);
        res.status(200).send(task)
    
    } catch (error) {
        console.log(error)
        res.status(400).send("error in getting task by their id ")
    }
}


exports.update=async(req,res)=>{
    try {
        const id=req.params.id;
        const data=req.body
        const user=await usermodel.updateOne({
            id:id
        },{
            $set:data
        })

        console.log("task updated succesfully");
        res.status(201).send("task updated succesfully")
        
    } catch (error) {
        console.log(error)
        res.status(400).send("error in updating task by their id ")
    }
}


exports.delete_task=async(req,res)=>{
    try {
        const id=req.params.id;
        const remove=await usermodel.deleteOne({id:id})
        console.log("task deleted succesfully");
        res.status(200).send("task deletd succesfully")
        
    } catch (error) {
        console.log(error)
        res.status(400).send("error in deleting task ")
    }
}
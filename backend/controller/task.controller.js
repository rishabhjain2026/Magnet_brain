const usermodel=require('../model/task.model')
const bcrypt=require('bcrypt')

exports.createtask = async (req, res) => {
  try {
    const data = req.body;

    // Attach logged-in user's ID
    data.userId = req.user.id;

    const datacreated = await usermodel.create(data);

    console.log("Task created successfully");
    console.log(datacreated);

    res.status(200).send(datacreated);
  } catch (error) {
    console.log(error);
    res.status(400).send("Error in creating task");
  }
};


// Get all tasks for logged-in user
exports.gettask = async (req, res) => {
  try {
    const userId = req.user.id;
    const tasks = await usermodel.find({ userId }); // only tasks of this user
    console.log(tasks);
    res.status(200).json(tasks); // status 200 for GET
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error in getting tasks" });
  }
};

// Get a single task by ID (only if belongs to logged-in user)
exports.get_task_by_id = async (req, res) => {
  try {
    const id = req.params.id;

    // Find task with _id and userId to ensure user can only access their own task
    const task = await usermodel.findOne({ _id: id, userId: req.user.id });

    if (!task) return res.status(404).json({ message: "Task not found" });

    console.log(task);
    res.status(200).json(task);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error in getting task by ID" });
  }
};



exports.update=async(req,res)=>{
    try {
        const id=req.params.id;
        const data=req.body
        const user=await usermodel.updateOne({
            _id:id
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
        const remove=await usermodel.deleteOne({_id:id})
        console.log("task deleted succesfully");
        res.status(200).send(remove)
        
    } catch (error) {
        console.log(error)
        res.status(400).send("error in deleting task ")
    }
}
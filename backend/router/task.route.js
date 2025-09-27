const controller=require("../controller/task.controller")
const express=require("express")
const router = express.Router();

const middle=require('../middleware/auth.mw')

router.post("/create-Task",middle,controller.createtask)

router.get("/get_task",middle,controller.gettask)

router.get("/get_task/:id",middle,controller.get_task_by_id)

router.put("/update_task/:id",middle,controller.update)

router.delete("/delete_task/:id",middle,controller.delete_task)

module.exports=router;


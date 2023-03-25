const express = require("express");
const { Taskmodel } = require("./Taskmodel");
const taskRouter = express.Router();
taskRouter.post("/task",async(req,res)=>{
  const {task,assignee,batch,status,type,sprint}=req.body;
try{
const taske=new Taskmodel({task,assignee,batch,status,type,sprint});

await taske.save()
res.status(200).send({task:task,msg:"task is created"})
}catch(err){
    res.status(400).send("post task have some error")
}
})
taskRouter.get("/task",async(req,res)=>{
    const {sprint,batch}=req.query;
    try{
let task=await Taskmodel.find({sprint:sprint,batch:batch})
console.log(task);
res.status(200).send(task)
    }catch(err){
        res.status(400).send("get task have some error")
    }
})
taskRouter.patch("/task/:id",async(req,res)=>{
    const {id}=req.params
    const {status}=req.body
    try{
let task=await Taskmodel.findByIdAndUpdate({_id:id},req.body)
res.send("task is updated")
    }catch(err){
        res.status(400).send("patch task have some error")
    }
})
taskRouter.delete("/task/:id",async(req,res)=>{
    const {id}=req.params
    
    try{
let task=await Taskmodel.findByIdAndDelete({_id:id})
res.send("task is deleted")
    }catch(err){
        res.status(400).send("delete task have some error")
    }
})
module.exports = { taskRouter };


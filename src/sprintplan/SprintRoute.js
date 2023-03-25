const express = require("express");
const { Usermodel } = require("../user/Usermodel");
const { Sprintmodel } = require("./Sprintmodel");
const sprintRouter = express.Router();
sprintRouter.post("/sprint",async(req,res)=>{
    const {sprint,username}=req.body;
   
    
    let x=`sprint${sprint}`
    console.log(sprint,x)

    try{
       let spr=await Sprintmodel.find({name:x});
       console.log(spr)
       if(spr.length===0){
       let sprint = new Sprintmodel({
        name:x,  
        schduled:username
         });
         console.log(sprint)
       await sprint.save();
       res.status(200).send("new sprint is created")
        }else{
            res.status(400).send("sprint already exist")
        }
       
    }catch(err){
        res.send("add sprint have error")
    }
})
sprintRouter.get("/sprint",async(req,res)=>{
    try{
let sprints=await Sprintmodel.find()
res.send(sprints)
    }catch(err){
        res.send("get sprint have some error")
    }
})
sprintRouter.delete("/sprint/:id",async(req,res)=>{
const {id}=req.params
console.log(id)
try{
let sprint=await Sprintmodel.findByIdAndDelete({_id:id})
res.send("sprint is deleted")
}catch(err){
    res.status(400).send("delete sprint have some error")
}
})
sprintRouter.patch("/sprint/:id",async(req,res)=>{
    const {id}=req.params
const {sprint}=req.body;
let x=`sprint${sprint}`
    console.log(id)
    try{
    let sprint=await Sprintmodel.findByIdAndUpdate({_id:id},{name:x})
    res.send("sprint is updated")
    }catch(err){
        res.status(400).send("update sprint have some error")
    }
    })
module.exports = { sprintRouter };

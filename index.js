const express=require("express");
const app=express();
require("dotenv").config();

const cors=require("cors");
const { connection } = require("./src/config/db");
const { userRouter } = require("./src/user/Userroute");
const { sprintRouter } = require("./src/sprintplan/SprintRoute");
const { taskRouter } = require("./src/task/Taskroute");
app.use(cors());
app.use(express.json());
app.get("/",(req,res)=>{
    res.send("welcome paypal")
})
app.use("/",userRouter)
app.use("/",sprintRouter)
app.use("/",taskRouter)
app.listen(process.env.PORT, async () => {
    try {
      await connection;
      console.log("db is connected");
    } catch (err) {
      console.log("db connection have error");
    }
    console.log(`server is running on port ${process.env.PORT}`);
  });
  // {
  //   "type":"Bug",
  //  "assignee":"soni",
  //  "status":"todo",
  //  "task":"resolve bug",
  //  "sprint":"sprint1",
  //  "batch":"web-19"
    
  // }
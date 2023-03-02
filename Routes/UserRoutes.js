const express = require("express");


const { Usermodel } = require("../Modues/usermodel");

// require("dotenv").config();


const userRouter = express.Router();
userRouter.get("/words",async(req,res)=>{
  let words = ["asdsfd","fcefe","qwerwer","fghfghfg","klj;kj","rtyo",".m,n.m","MNwBOJr","bJARAKm","SzaVJEK","nWCpvTG","XSgVJHx","acnXnMC","TBNkJzf","PwgSGTw","brRgxkm","JOevYBO","PuDUPyO","KBnsdOb","xudvREX","eYmQSaS","JmzugBq","nZdURxF","wgzJyve","SPpqPEh","snhBjRc","KwuhCDR"]

    try {
        let word = words[Math.floor(Math.random()*words.length)];
        return res.status(201).send({ word: word })
    }
    catch (error) {
        return res.status(500).send({ error: true, message: "Internal Server Error" })
    }
})
userRouter.post("/userscore",async(req,res)=>{
  const { name, score, difficulty } = req.body;
    try {
        const newUser = new Usermodel({ name, score, difficulty });
        await newUser.save();
         res.status(201).send({ meassage: "User created sucessfully with score", "user": newUser })
    }
    catch (error) {
         res.status(500).send({ error: true, message: "user not posted" })
    }
})
userRouter.get("/users",async(req,res)=>{
try{
const data=await Usermodel.find().sort({score:-1})
res.status(201).send(data)
}
catch(err){
  return res.status(500).send({ error: true, message: "get users Error" })

}
})

module.exports = { userRouter }

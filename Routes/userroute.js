const express = require("express");
const { Usermodel } = require("../Models/usermodel");
const fs = require('fs');
const userRouter = express.Router();
userRouter.post("/users",async(req,res)=>{
  try{
    const jsonData = fs.readFileSync('data.json', 'utf8');
const data = JSON.parse(jsonData);
let dat=await Usermodel.insertMany(data)

res.status(200).send("users successfully posted")

  }catch(err){
    res.status(400).send("post request have some error")
  }
})
// 1. Users which have income lower than $5 USD and have a car of brand “BMW” or “Mercedes”.
userRouter.get("/usersbyincomeandcar",async(req,res)=>{
  try{
let users=await Usermodel.find({$or:[{car:"BMW"},{car:"Mercedes"}]})
let x=users.filter((el)=>Number(el.income.split("$")[1])<5)
res.status(200).json({x})
  }catch(err){
    res.status(400).send("get request have some error")
  }
})
// 2. Male Users which have phone price greater than 10,000.
userRouter.get("/usersbygenderandphoneprice",async(req,res)=>{
  try{
let users=await Usermodel.find({$and:[{gender:"Male"},{phone_price:{$gt:10000}}]});
res.status(200).json({users})

  }catch(err){
    res.status(400).send("get request have some error")

  }
})
// 3. Users whose last name starts with “M” and has a quote character length greater than 15 and email includes his/her last name.
userRouter.get("/usersbymail",async(req,res)=>{
  try{
let users =await Usermodel.find({$and:[{ last_name: { $regex: /^M/i } }
]})
let x=users.filter((el)=>el.quote.length>15&&el.email.includes(el.last_name.toLowerCase()))
res.status(200).json({x})

  }catch(err){
    res.status(400).send("user get by email have some error")

  }
})
// 4. Users which have a car of brand “BMW”, “Mercedes” or “Audi” and whose email does not include any digit.
userRouter.get("/usersbydigit",async(req,res)=>{
  try{
let users=await Usermodel.find({$or:[{car:"BMW"},{car:"Audi"},{car:"Mercedes"}]})
const digitRegex = /^[^0-9]+$/;
let x=users.filter((el)=>digitRegex.test(el.email))
res.status(200).json({x})

  }catch(err){
    res.status(400).send("get request have some error")

  }
})
// 5. Show the data of top 10 cities which have the highest number of users and their average income.
userRouter.get("/userstop",async(req,res)=>{
  try{
    const users=await Usermodel.find();
    const cityData = users.reduce((acc, user) => {
      const cityIndex = acc.findIndex(city => city.name === user.city);
      if (cityIndex !== -1) {
        acc[cityIndex].count++;
        acc[cityIndex].totalIncome += parseInt(user.income.split("$")[1]);
      } else {
        acc.push({ name: user.city, count: 1, totalIncome: parseInt(user.income.split("$")[1]) });
      }
      return acc;
    }, []);
    
    const sortedCityData = cityData.sort((a, b) => b.count - a.count).slice(0, 10);
    const averageIncome = sortedCityData.map(city => ({ name: city.name, averageIncome: (city.totalIncome / city.count) }));
res.status(200).json({sortedCityData,averageIncome})
    

  }catch(err){
    res.status(400).send("get request have some error")

  }
})

module.exports = { userRouter };

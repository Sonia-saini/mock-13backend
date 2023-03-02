const mongoose=require("mongoose");
const userschema=mongoose.Schema({
    name : {type: String, required: true},
    score:{type:Number, required:true},
    difficulty:{type:String, required:true},
})
const Usermodel=mongoose.model("userquiz",userschema);
module.exports={Usermodel}
const mongoose = require("mongoose");
const taskschema = mongoose.Schema({
 type:String,
 assignee:String,
 status:String,
 task:String,
 sprint:String,
 batch:String
});
const Taskmodel = mongoose.model("task", taskschema);
module.exports = { Taskmodel };

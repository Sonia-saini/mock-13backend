const mongoose = require("mongoose");
const sprintschema = mongoose.Schema({
  name: String,
 schduled:String,
  
});
const Sprintmodel = mongoose.model("sprint", sprintschema);
module.exports = { Sprintmodel };

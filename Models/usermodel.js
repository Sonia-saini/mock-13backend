const mongoose = require("mongoose");
const userschema = mongoose.Schema({
  car: String,
  id: Number,
  first_name: String,
  last_name: String,
  city: String,
  email: String,
  gender: String,
  income: String,
  quote: String,
  phone_price: Number,
});
const Usermodel = mongoose.model("user", userschema);
module.exports = { Usermodel };

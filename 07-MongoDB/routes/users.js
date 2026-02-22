const mongoose = require('mongoose');

// Creation of DataBase with the name of 'practiceDataBase'
mongoose.connect('mongodb://127.0.0.1:27017/practiceDataBase');

// 127.0.0.1: means localhost:
// 27017 is MongoDB default Port

// Schema / Document
const userSchema = mongoose.Schema({
  username: String,
  name: String,
  age: Number
})

// Model / Collection
module.exports = mongoose.model("user", userSchema);
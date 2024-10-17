const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const generate = require('../helpers/generate.js');

const userSchema = new mongoose.Schema({
  fullName: String,
  password: String,
  email: String,
  tokenUser: {
    type: String,
    default: generate.generateRandomString(20)
  },
  phone: String,
  avatar: String, 
  status: {
    type: String,
    default: 'active'
  },
  delete: {
    type : Boolean,
    default: false
  },
  deleteAt : Date
},{
  timestamps : true, 
})

const User = mongoose.model("User",userSchema,"users");

module.exports = User;
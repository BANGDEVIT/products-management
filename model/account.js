const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const generate = require('../helpers/generate.js');

const accountSchema = new mongoose.Schema({
  fullName: String,
  password: String,
  email: String,
  token: {
    type: String,
    default: generate.generateRandomString(20)
  },
  phone: String,
  avatar: String, 
  role_id: String,
  status: String,
  delete: {
    type : Boolean,
    default: false
  },
  deleteAt : Date
},{
  timestamps : true, 
})

const Account = mongoose.model("Account",accountSchema,"accounts");

module.exports = Account;
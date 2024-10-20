const mongoose = require('mongoose');

const settingGeneralSchema = new mongoose.Schema({
  websiteName : String,
  logo : String,
  phone : String,
  email : String,
  address : String,
  facebook : String,
  twitter : String,
  instagram : String,
  copyright : String,
  deleteAt : Date
},{
  timestamps : true, 
})

const SettingGereral = mongoose.model("SettingGereral",settingGeneralSchema,"settings-general");

module.exports = SettingGereral;
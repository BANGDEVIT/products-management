const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);  

const generate = require('../helpers/generate.js');

const chatSchema = new mongoose.Schema(
{
  user_id : String,
  room_chat_id : String,
  content : String,
  images: Array,
  deleted :{
    type : Boolean,
    default : false,
  },
  deletedAt : Date,
},
{
  timestamps : true, 
})

const Chat = mongoose.model("Chat",chatSchema,"chats");

module.exports = Chat;
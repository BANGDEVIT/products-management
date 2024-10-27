const Chat = require('../../model/chat')
const User = require('../../model/user.model')

const chatSocket = require('../../sockets/client/chat.socket')

//[GET] /chat/:roomChatId
module.exports.index = async(req,res) =>{
  const roomChatId = req.params.roomChatId;
  const userId = res.locals.user.id;
  const fullName = res.locals.user.fullName;

  //Socket
  chatSocket(req,res);
  //End Socket

  //Lấy data từ database

  const chats = await Chat.find({
    room_chat_id : roomChatId,
    deleted : false
  })
  
  for (const chat of chats){
    const infoUser = await User.findOne({_id : userId}).select("fullName");
    chat.infoUser =  infoUser;
  }

  res.render('client/page/chat/index',{
    pageTitle : "Chat",
    chats : chats
  })
}
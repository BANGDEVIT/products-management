const Chat = require('../../model/chat')
const User = require('../../model/user.model')

//[GET] /chat
module.exports.index = async(req,res) =>{
  const userId = res.locals.user.id;
  const fullName = res.locals.user.fullName;

  //socket.io
  _io.once('connection', (socket) =>{
    socket.on("CLIENT_SEND_MESSAGE",async (content) => {
      // Lưu vào database 
      const chat = new Chat({
        content : content,
        user_id : userId
      })
      await chat.save()

      //Trả về client
      _io.emit("SEVER_RETURN_MESSAGE", {
        content : content,
        userId : userId,
        fullName : fullName
      })
    })
  }); 
  //End socket.io

  //Lấy data từ database

  const chats = await Chat.find({deleted : false})
  
  for (const chat of chats){
    const infoUser = await User.findOne({_id : userId}).select("fullName");
    chat.infoUser =  infoUser;
  }

  res.render('client/page/chat/index',{
    pageTitle : "Chat",
    chats : chats
  })
}
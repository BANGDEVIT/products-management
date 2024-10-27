const Chat = require('../../model/chat')

module.exports = (req,res) =>{
  const roomChatId = req.params.roomChatId;
  const userId = res.locals.user.id;
  const fullName = res.locals.user.fullName;

  //socket.io
  _io.once('connection', (socket) =>{
    socket.join(roomChatId);
    socket.on("CLIENT_SEND_MESSAGE",async (content) => {  
      // Lưu vào database 
      const chat = new Chat({
        content : content,
        user_id : userId,
        room_chat_id : roomChatId
      })
      await chat.save()

      //Trả về client
      _io.to(roomChatId).emit("SERVER_RETURN_MESSAGE", {
        content : content,
        userId : userId,
        fullName : fullName
      })
    })
    //typing
    socket.on("CLIENT_SEND_TYPING",async (type) => {
      socket.broadcast.to(roomChatId).emit("SERVER_RETURN_TYPING",{
        fullName : fullName,
        userId : userId,
        type : type
      })
    })
    //end typing
  }); 
  //End socket.io
}
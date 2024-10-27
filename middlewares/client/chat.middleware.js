const RoomChat = require('../../model/room-chat.model')

module.exports.isAccess = async(req,res,next) => {
  const roomChatId = req.params.roomChatId
  const userId = res.locals.user.id;

  const existUserRoomChat = await RoomChat.findOne({
    _id : roomChatId,
    "users.user_id" : userId
  });
  if (existUserRoomChat){
    next();
  }else{
    res.redirect("/")
  }

}
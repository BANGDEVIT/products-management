const User =require("../../model/user.model")
const RoomChat = require("../../model/room-chat.model")

// [GET] /rooms-chat/
module.exports.index = async (req,res) =>{

  const userId = res.locals.user.id;

  const listRoomChat = await RoomChat.find({
    "users.user_id": userId,
    typeRoom : "group",
    delete : false
  })

  res.render('client/page/rooms-chat/index',{
    pageTitle : "Danh sách phòng",
    listRoomChat : listRoomChat
  })
}


// [GET] /rooms-chat/create
module.exports.create = async (req,res) =>{
  const friendList = res.locals.user.friendList;


  for (const friend of friendList){
    const infoFriend = await User.findOne({
      _id : friend.user_id,
      delete : false
    }).select("fullName");

    friend.infoFriend = infoFriend;
  }
 
  res.render('client/page/rooms-chat/create',{
    pageTitle : "Tạo phòng",
    friendList : friendList
  })
}

// [POST] /rooms-chat/create
module.exports.createPost = async (req,res) =>{
  console.log(req.body)
  const title = req.body.title;
  const usersId = req.body.usersId;

  const dataRoom = {
    title : title,
    typeRoom : "group",
    users :[],
  }

  for (const userId of usersId){
    dataRoom.users.push({
      user_id : userId,
      role : "user"
    })
  }

  dataRoom.users.push({
    user_id : res.locals.user.id,
    role : "Admin"
  })

  const roomChat = new RoomChat(dataRoom);
  await roomChat.save();

  res.redirect(`/chat/${roomChat.id}`)
}
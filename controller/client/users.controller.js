const User = require('../../model/user.model')

const USersSocket = require('../../sockets/client/users.socket')

//[GET] users/not-friend
module.exports.notFriend =async(req,res) =>{

  //socket
  USersSocket(res);
  //End socket


  const userId = res.locals.user.id;

  const myUser = await User.findOne({
    _id : userId
  })

  const requestFriends = myUser.requestFriends;
  const acceptFriends = myUser.acceptFriends;


  const users = await User.find({
    $and : [
      {_id : {$ne : userId}},
      {_id : {$nin : requestFriends}},  // Tìm những người chưa gửi lời mời kết bạn
      {_id : {$nin : acceptFriends}}   // Tìm những người chưa chấp nhận lời mời kết bạn
    ],
    status : 'active',
    delete : false,
    // friendStatus : 'not-friend'  // Tìm những người đang không phải bạn bè
  }).select("fullName avatar id")


  res.render('client/page/users/not-friend',{
    pageTitle : 'Danh sách người dùng',
    users : users
  })
}

//[GET] users/request
module.exports.request = async(req,res) =>{

  //socket
  USersSocket(res);
  //End socket


  const userId = res.locals.user.id;

  const myUser = await User.findOne({
    _id : userId
  })

  const requestFriends = myUser.requestFriends;

  const users = await User.find({
    _id : {$in : requestFriends},  // Tìm những người chưa gửi lời mời kết bạn
    status : 'active',
    delete : false,
    // friendStatus : 'not-friend'  // Tìm những người đang không phải bạn bè
  }).select("fullName avatar id")

  res.render('client/page/users/request',{
    users : users
  });
}

//[GET] users/accept
module.exports.accept = async(req,res) =>{

  //socket
  USersSocket(res);
  //End socket


  const userId = res.locals.user.id;

  const myUser = await User.findOne({
    _id : userId
  })

  const acceptFriends = myUser.acceptFriends;

  const users = await User.find({
    _id : {$in : acceptFriends},  // Tìm những người chưa gửi lời mời kết bạn
    status : 'active',
    delete : false,
    // friendStatus : 'not-friend'  // Tìm những người đang không phải bạn bè
  }).select("fullName avatar id")

  res.render('client/page/users/accept',{
    users : users
  });
}
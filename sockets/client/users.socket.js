const User = require('../../model/user.model')

module.exports =(res) =>{
  const userId = res.locals.user.id;
    //socket.io
    _io.once('connection', (socket) =>{
      // chức năng gửi lời mời 
      socket.on("CLIENT_ADD_FRIEND",async (userId) => {
        //userId là ID của B(người được gửi yêu cầu kết bạn)
        //myUSerId là ID của A(người gửi lời mời kết bạn)
        const myUserId = res.locals.user.id; 
        
        //Thêm ID của A vào acceptFriend của B
        const existIdAinB = await User.findOne({
          _id : userId,
          acceptFriends : myUserId
        })

        if(!existIdAinB){
          await User.updateOne({
            _id : userId,
          },{
            $push : {acceptFriends : myUserId}
          })
        }

        //Thêm ID của B vào requestFriend của A
        const existIdBina = await User.findOne({
          _id : myUserId,
          requestFriends : userId
         })

        if(!existIdBina){
          await User.updateOne({
            _id : myUserId,
          },{
            $push : {requestFriends : userId}
          })
        }

        //lấy ra độ dài acceptFriends của B trả về cho B
        const infoUserB = await User.findOne({
          _id : userId
        })

        const lengthAcceptFriends = infoUserB.acceptFriends.length;
        
        socket.broadcast.emit("SERVER_RETURN_LENGHT_ACCEPT_FRIEND",{
          userId : userId,
          lengthAcceptFriends : lengthAcceptFriends
        });

        //Lấy info của A trả về cho B để in ra giao diện bên accept.pug

        const infoUserA = await User.findOne({
          _id : myUserId
        }).select("fullName avatar id")

        socket.broadcast.emit("SERVER_RETURN_INFO_ACCEPT_FRIEND",{
          userId : userId,
          infoUserA : infoUserA
        })
      })
      //chức năng hủy yêu cầu 
      socket.on("CLIENT_CANCEL_FRIEND",async (userId) => {
        //userId là ID của B(người được gửi yêu cầu kết bạn)
        //myUSerId là ID của A(người gửi lời mời kết bạn)
        const myUserId = res.locals.user.id; 
        
        //xóa ID của A trong acceptFriend của B
        const existIdAinB = await User.findOne({
          _id : userId,
          acceptFriends : myUserId
        })

        if(existIdAinB){
          await User.updateOne({
            _id : userId,
          },{
            $pull : {acceptFriends : myUserId}
          })
        }

        //xóa ID của B trong requestFriend của A
        const existIdBina = await User.findOne({
          _id : myUserId,
          requestFriends : userId
         })

        if(existIdBina){
          await User.updateOne({
            _id : myUserId,
          },{
            $pull : {requestFriends : userId}
          })
        }

        //lấy ra độ dài acceptFriends của B trả về cho B
        const infoUserB = await User.findOne({
          _id : userId
        })

        const lengthAcceptFriends = infoUserB.acceptFriends.length;
        
        socket.broadcast.emit("SERVER_RETURN_LENGHT_ACCEPT_FRIEND",{
          userId : userId,
          lengthAcceptFriends : lengthAcceptFriends
        });

        //lấy ID của A trả về cho B 
        socket.broadcast.emit("SERVER_RETURN_USER_ID_CANCEL_FRIEND",{
          userIdB : userId,
          userIdA : myUserId,
        });
      })
      //chức năng hủy lời mời kết bạn
      socket.on("CLIENT_REFUSE_FRIEND",async (userId) => {
        //userId là ID của A(người được gửi yêu cầu kết bạn)
        //myUSerId là ID của B(người gửi lời mời kết bạn)
        const myUserId = res.locals.user.id; 
        
        //xóa ID của A trong acceptFriend của B
        const existIdAinB = await User.findOne({
          _id : myUserId,
          acceptFriends : userId
        })

        if(existIdAinB){
          await User.updateOne({
            _id : myUserId,
          },{
            $pull : {acceptFriends : userId}
          })
        }

        //xóa ID của B trong requestFriend của A
        const existIdBina = await User.findOne({
          _id : userId,
          requestFriends : myUserId
         })

        if(existIdBina){
          await User.updateOne({
            _id : userId,
          },{
            $pull : {requestFriends : myUserId}
          })
        }
      })
      //chức năng chấp nhận lời mời kết bạn
      socket.on("CLIENT_ACCEPTED_FRIEND",async (userId) => {
        //userId là ID của A(người được gửi yêu cầu kết bạn)
        //myUSerId là ID của B(người gửi lời mời kết bạn)
        const myUserId = res.locals.user.id;
        
        //thêm {user_id,room_chat_id} của A vào friendList của B
        //xóa ID của A trong acceptFriend của B        
        const existIdAinB = await User.findOne({
          _id : myUserId,
          acceptFriends : userId
        })

        if(existIdAinB){
          await User.updateOne({
            _id : myUserId,
          },{
            $push : {friendList : {user_id : userId, room_chat_id : ""}},
            $pull : {acceptFriends : userId}
          })
        }
        //thêm {user_id,room_chat_id} của B vào friendList của A
        //xóa ID của B trong requestFriend của A
        const existIdBina = await User.findOne({
          _id : userId,
          requestFriends : myUserId
         })

        if(existIdBina){
          await User.updateOne({
            _id : userId,
          },{
            $push : {friendList : {user_id : myUserId, room_chat_id : ""}},
            $pull : {requestFriends : myUserId}
          })
        }
      })
    }); 
    //End socket.io

}
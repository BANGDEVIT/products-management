//chức năng gửi yêu cầu 
const listBtnAddFriend = document.querySelectorAll("[btn-add-friend]");

if (listBtnAddFriend.length > 0){
  listBtnAddFriend.forEach(button=>{
    button.addEventListener("click",() =>{
      const userId = button.getAttribute("btn-add-friend");
      const parent = button.closest(".box-user");
      parent.classList.add("add");
      socket.emit("CLIENT_ADD_FRIEND", userId);
    })
  })
}
// End chức năng gửi yêu cầu 

//chức năng hủy yêu cầu 
const listBtnCancelFriend = document.querySelectorAll("[btn-cancel-friend]");

if (listBtnCancelFriend.length > 0){
  listBtnCancelFriend.forEach(button=>{
    button.addEventListener("click",() =>{
      const userId = button.getAttribute("btn-cancel-friend");
      const parent = button.closest(".box-user");
      parent.classList.remove("add");
      socket.emit("CLIENT_CANCEL_FRIEND", userId);
    })
  })
}
// End chức năng hủy yêu cầu 

//chức năng hủy yêu cầu kết bạn
const listBtnRefuseFriend = document.querySelectorAll("[btn-refuse-friend]");

if (listBtnRefuseFriend.length > 0){
  listBtnRefuseFriend.forEach(button=>{
    button.addEventListener("click",() =>{
      const userId = button.getAttribute("btn-refuse-friend");
      const parent = button.closest(".box-user");
      parent.classList.add("refuse");
      socket.emit("CLIENT_REFUSE_FRIEND", userId);
    })
  })
}
// End chức năng hủy yêu cầu kết bạn

//chức năng chập nhận yêu cầu kết bạn
const listBtnAcceptedFriend = document.querySelectorAll("[btn-accept-friend]");

// chức năng chập nhận yêu cầu kết bạn
if (listBtnAcceptedFriend.length > 0){
  listBtnAcceptedFriend.forEach(button=>{
    button.addEventListener("click",() =>{
      const userId = button.getAttribute("btn-accept-friend");
      const parent = button.closest(".box-user");
      parent.classList.add("accepted");
      socket.emit("CLIENT_ACCEPTED_FRIEND", userId);
    })
  })
}
// End chức năng chập nhận yêu cầu kết bạn

// SERVER_RETURN_LENGHT_ACCEPT_FRIEND
const badgeUsersAccept = document.querySelector("[badge-users-accept]")
if (badgeUsersAccept){
  const userId = badgeUsersAccept.getAttribute("badge-users-accept"); 
  socket.on("SERVER_RETURN_LENGHT_ACCEPT_FRIEND",(data)=>{
    if (data.userId === userId)
      badgeUsersAccept.innerHTML = data.lengthAcceptFriends
  })
}
// END SERVER_RETURN_LENGHT_ACCEPT_FRIEND

// SERVER_RETURN_INFO_ACCEPT_FRIEND

  socket.on("SERVER_RETURN_INFO_ACCEPT_FRIEND",(data)=>{
    //Trang lời mời đã nhận
    const dataUsersAccept = document.querySelector("[data-users-accept]");
    if (dataUsersAccept){
      const UserId = dataUsersAccept.getAttribute("data-users-accept");
      if (UserId == data.userId){
        //vẽ user A ra giao diện accept của B
        const div = document.createElement("div");
        div.classList.add("col-6")
        div.setAttribute("user-id",data.infoUserA._id)
  
        div.innerHTML =`
          <div class="box-user">
            <div class="inner-avatar">
              <img
                src= (${data.infoUserA.avatar} ? ${data.infoUserA.avatar} : "https://cdn.kona-blue.com/upload/kona-blue_com/post/images/2024/09/18/457/avatar-mac-dinh-1.jpg")
                alt=user.fullName
              >
            </div>
            <div class="inner-info">
              <div class="inner-name"> ${data.infoUserA.fullName} </div>
              <div class="inner-buttons">
                <button
                  class="btn btn-sm btn-primary mr-1"
                  btn-accept-friend = ${data.infoUserA._id}
                > Chấp nhận
                </button>
                <button 
                  class="btn btn-sm btn-secondary mr-1"
                  btn-refuse-friend = ${data.infoUserA._id}
                > Xóa
                </button>
                <button 
                  class="btn btn-sm btn-secondary mr-1"
                  btn-delete-friend = ${data.infoUserA._id}
                  disabled
                > Đã xóa
                </button>
                <button
                  class="btn btn-sm btn-secondary mr-1"
                  btn-accepted-friend = ${data.infoUserA._id}
                  disabled
                > Đã chấp nhận
                </button>
            </div> 
          </div>    
        `
        dataUsersAccept.appendChild(div);
        // hết vẽ user A ra giao diện accept của B
  
        //Hủy lời mời kết bạn
        const buttonRefuse = div.querySelector("[btn-refuse-friend]");
  
        buttonRefuse.addEventListener("click",() =>{
          const userId = buttonRefuse.getAttribute("btn-refuse-friend");
          const parent = buttonRefuse.closest(".box-user")
          parent.classList.add("refuse");
          socket.emit("CLIENT_REFUSE_FRIEND", userId);
        })
        //End Hủy lời mời kết bạn
  
        //Hủy lời mời kết bạn
        const buttonAccept = div.querySelector("[btn-accept-friend]");
  
        buttonAccept.addEventListener("click",() =>{
          const userId = buttonAccept.getAttribute("btn-accept-friend");
          const parent = buttonAccept.closest(".box-user")
          parent.classList.add("accepted");
          socket.emit("CLIENT_ACCEPTED_FRIEND", userId);
        })
        //End Hủy lời mời kết bạn
      }
    } 
    //End Trang lời mời đã nhận

    //Trang danh sách người dùng
    const dataUsersNotFriends = document.querySelector("[data-users-not-friends]");
    if (dataUsersNotFriends){
      const UserId = dataUsersNotFriends.getAttribute("data-users-not-friends");
      if (UserId == data.userId){
        const boxUserRemove = dataUsersNotFriends.querySelector(`[user-id='${data.infoUserA._id}']`)
        if (boxUserRemove){
          dataUsersNotFriends.removeChild(boxUserRemove);
}
      }
    }
    //End Trang danh sách người dùng

  })

// END SERVER_RETURN_INFO_ACCEPT_FRIEND

//SERVER_RETURN_USER_ID_CANCEL_FRIEND
socket.on("SERVER_RETURN_USER_ID_CANCEL_FRIEND",(data)=>{
  const userIdA = data.userIdA;
  const boxUserRemove = document.querySelector(`[user-id='${userIdA}']`)
  if (boxUserRemove){
    const dataUsersAccept = document.querySelector("[data-users-accept]");
    const UserIdB = badgeUsersAccept.getAttribute("bagde-users-accept");
    if (UserIdB == data.UserIdB )
      dataUsersAccept.removeChild(boxUserRemove);
  }
})
//END SERVER_RETURN_USER_ID_CANCEL_FRIEND
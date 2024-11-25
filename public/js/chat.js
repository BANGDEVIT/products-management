import * as Popper from 'https://cdn.jsdelivr.net/npm/@popperjs/core@^2/dist/esm/index.js'

//CLIENT_SEND_MESSAGE
const formSendData = document.querySelector(".chat .inner-form")
if (formSendData) {
  formSendData.addEventListener("submit",(e)=>{
    e.preventDefault();
    const content = e.target.elements.content.value
    if(content){
      socket.emit("CLIENT_SEND_MESSAGE", content)
      e.target.elements.content.value = ""
      socket.emit("CLIENT_SEND_TYPING","hidden");
    }

  })
}
//END CLIENT_SEND_MESSAGE

//SEVER_RETURN_MESSAGE

socket.on("SERVER_RETURN_MESSAGE", (data) => {
  const body = document.querySelector(".chat .inner-body")
  const myId = document.querySelector("[my-id]").getAttribute("my-id")
  
  const div = document.createElement("div")
  const boxTyping = document.querySelector(".chat .inner-list-typing");

  let htmlFullName = ""; 
  if (myId == data.userId){
    div.classList.add('inner-outgoing');
  }else{
    htmlFullName = `<div class="inner-name">${data.fullName}</div>`;
    div.classList.add('inner-incoming');
  }
  
  div.innerHTML = `
    ${htmlFullName}
    <div class="inner-content">${data.content}</div>
  `
  body.insertBefore(div,boxTyping);

  bodychat.scrollTop = bodychat.scrollHeight
})
// End SEVER_RETURN_MESSAGE

// Scroll chat bottom
const bodychat = document.querySelector(".chat .inner-body")
if (bodychat){
  bodychat.scrollTop = bodychat.scrollHeight
}
// End Scroll chat bottom

//Show Icon chat
// Show popup
const buttonIcon = document.querySelector('.button-icon')
if (buttonIcon){
  const tooltip = document.querySelector('.tooltip')
  Popper.createPopper(buttonIcon, tooltip)
  buttonIcon.onclick = () => {
    tooltip.classList.toggle('shown')
  }
}
// End Show popup

// Show Typing
var timeOut;
const showTyping = () =>{
  var timeOut;
  socket.emit("CLIENT_SEND_TYPING","show");

      clearTimeout(timeOut)

      timeOut = setTimeout(() =>{
        socket.emit("CLIENT_SEND_TYPING","hidden");
      },3000)
}
// End Show typing

// Insert Icon in input
  const emojiPicker = document.querySelector("emoji-picker");
  if (emojiPicker){
    const chatInput = document.querySelector(".chat .inner-form input[name='content']");
    emojiPicker.addEventListener('emoji-click',(event) =>{
      const icon = event.detail.unicode;
      chatInput.value = chatInput.value + icon;
      showTyping();
      const end = chatInput.value.length;
      chatInput.setSelectionRange(end, end);
      chatInput.focus();

    })
    //input Keyup

    chatInput.addEventListener('keyup', () => {
      showTyping();
     })
    //End input Keyup
  }

// End Insert Icon in input
//End Show Icon chat

// SERVER_RETURN_TYPING
const elementListTyping = document.querySelector(".chat .inner-list-typing");
if (elementListTyping){
  socket.on("SERVER_RETURN_TYPING",(data) =>{
    
    if (data.type == "show"){
      const exitstTyping = elementListTyping.querySelector(`[user-id="${data.userId}"]`);
      const bodychat = document.querySelector(".chat .inner-body")
      if (!exitstTyping){
        const boxTyping = document.createElement("div");
        boxTyping.classList.add("box-typing");
        boxTyping.setAttribute("user-id",data.userId);
  
        boxTyping.innerHTML=`
          <div class="inner-name">${data.fullName}</div>
          <div class="inner-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        `

        elementListTyping.appendChild(boxTyping);
        bodychat.scrollTop = bodychat.scrollHeight
      }      
    }
    else{
      const boxTypingRemove = elementListTyping.querySelector(`[user-id="${data.userId}"]`);
      if (boxTypingRemove){
        elementListTyping.removeChild(boxTypingRemove);
      }
    }
  })
} 

// END SERVER_RETURN_TYPING


//CLIENT_SEND_MESSAGE
const formSendData = document.querySelector(".chat .inner-form")

if (formSendData) {
  formSendData.addEventListener("submit",(e)=>{
    e.preventDefault();
    const content = e.target.elements.content.value
    if(content){
      socket.emit("CLIENT_SEND_MESSAGE", content)
      e.target.elements.content.value = ""
    }

  })
}
//END CLIENT_SEND_MESSAGE

// SEVER_RETURN_MESSAGE

socket.on("SEVER_RETURN_MESSAGE", (data) => {
  const body = document.querySelector(".chat .inner-body")
  const myId = document.querySelector("[my-id]").getAttribute("my-id")
  
  const div = document.createElement("div")

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
  body.appendChild(div);

  bodychat.scrollTop = bodychat.scrollHeight
})
// End SEVER_RETURN_MESSAGE

// Scroll chat bottom
const bodychat = document.querySelector(".chat .inner-body")
if (bodychat){
  bodychat.scrollTop = bodychat.scrollHeight
}
// End Scroll chat bottom

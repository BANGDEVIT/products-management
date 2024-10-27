//Show Alert
const showAlert = document.querySelector("[show-alert]");

if (showAlert) {
  const time = parseInt(showAlert.getAttribute('data-time'));

  const clostAlert = document.querySelector("[close-alert]");

  setTimeout(() => {
    showAlert.classList.add("alert-hidden");
  }, time);

  clostAlert.addEventListener('click',() => {
    showAlert.classList.add("alert-hidden");
  })
}
//End Show Alert

//Detect browser or tap closing
window.addEventListener('beforeunload',(e)=>{
  e.preventDefault();
  socket.emit("CLIENT_CLOSE_WEB","test");
})
//End Detect browser or tap closing
// change Status
const buttonChangeStatus = document.querySelectorAll("[button-change-status]")
if (buttonChangeStatus.length > 0){
  const formChangeStatus = document.querySelector("#form-change-status");
  const path = formChangeStatus.getAttribute("data-path");

  buttonChangeStatus.forEach(button =>{
    button.addEventListener('click',()=>{
      const statusCurrent = button.getAttribute('data-status');
      const idcurrent = button.getAttribute('data-id');

      let statusChange = statusCurrent == "active" ? "inactive" :"active";
      
      const action = path+`/${statusChange}/${idcurrent}?_method=PATCH`

      formChangeStatus.action = action;

      formChangeStatus.submit();
    });
  });
}
// end change Status 

// delete
const buttonsDelete = document.querySelectorAll("[button-delete]"); 
if (buttonsDelete.length > 0){
  const formDeleteItem = document.querySelector("#form-delete-item");
  const path = formDeleteItem.getAttribute('data-path');

  buttonsDelete.forEach(button =>{
    button.addEventListener('click',()=>{
      const isConfirm = confirm(`Are you sure you want to delete?`)

      if (isConfirm){
        const id = button.getAttribute('data-id');

        const action = `${path}/${id}?_method=DELETE`

        formDeleteItem.action = action;

        formDeleteItem.submit();
      }

    });
  })
}
// End delete 

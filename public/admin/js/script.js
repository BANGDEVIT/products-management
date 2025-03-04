// Button status 
const buttonsStatus = document.querySelectorAll("[button-status]");

if (buttonsStatus.length > 0) {
  let url = new URL(window.location.href);
  
  buttonsStatus.forEach(button => {
    button.addEventListener('click', () => {
      const status = button.getAttribute("button-status");

      if (status){
        url.searchParams.set("status", status);
      } else{
        url.searchParams.delete("status");
      }

      window.location.href = url.href;
    });
  });
}
// End Button status 

// Form search
const formSearch = document.querySelector("#form-search");

if (formSearch) {
  let url = new URL(window.location.href);

  formSearch.addEventListener('submit', (e) => {

    e.preventDefault();

    const keyword = e.target.elements.keyword.value;

    if (keyword){
      url.searchParams.set("keyword", keyword);
    } else{
      url.searchParams.delete("keyword");
    }

    window.location.href = url.href;
  });
}
// End form search

// Pagination
  const buttonPagination = document.querySelectorAll('[button-pagination]');

  if (buttonPagination) {
    let url = new URL(window.location.href);
    buttonPagination.forEach(button =>{
      button.addEventListener('click',() => {
        const page = parseInt(button.getAttribute('button-pagination'));
        url.searchParams.set('page', page);
        window.location.href = url.href;
      })
    })
  }
// End Pagination

// CheckBox Mutil
  const CheckBoxMutil = document.querySelector("[checkbox-mutil]");

  if (CheckBoxMutil) {

    const inputCheckAll = document.querySelector("input[name='checkall']");
    const inputsId = document.querySelectorAll("input[name='id']");

    inputCheckAll.addEventListener('click',() => {
      if (inputCheckAll.checked) {
        inputsId.forEach(input =>{input.checked = true});
      }
      else{
        inputsId.forEach(input =>{input.checked = false});
      }
    });

    inputsId.forEach(input =>{
      input.addEventListener('click',() =>{
        const countChecked = document.querySelectorAll("input[name='id']:checked").length;
        if (countChecked == inputsId.length){
          inputCheckAll.checked = true;
        }
        else{
          inputCheckAll.checked = false;
        }
      })
    }) 
  }
// End CheckBox Mutil

// form Change Mutil

const formChangeMutil = document.querySelector("[form-change-mutil]");

if (formChangeMutil) {
  formChangeMutil.addEventListener("submit" , (e) => {
    e.preventDefault();
    const checkboxMutil = document.querySelector("[checkbox-mutil]");

    const inputsChecked = checkboxMutil.querySelectorAll("input[name='id']:checked");

    const typeChange = e.target.elements.type.value;

    if (typeChange == "delete-all") {
      const isConfirm = confirm("Are you sure you want to delete all");

      if (!isConfirm) {
        return;
      }
    }
    
    if (inputsChecked.length > 0){
      let ids = [];
      const inputIds = formChangeMutil.querySelector("input[name='ids']")

      inputsChecked.forEach(input => {
        const id = input.value;

        if (typeChange == "change-position"){
          const position = input.closest("tr").querySelector("input[name='position']").value;

          ids.push(`${id}-${position}`);

        } else {
          ids.push(id);
        }
      })

      inputIds.value =ids.join(", ");    

      formChangeMutil.submit();
    }
    else{
      alert("Vui lòng chọn ít nhất một mặt hàng để thực hiện thao tác này");
      return;
    }
  })
}
// End form Change Mutil  

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

//Upload Image

const uploadImage = document.querySelector("[upload-image]");

if (uploadImage) {
  const uploadImageInput = document.querySelector("[upload-image-input]");
  const uploadImagePreview = document.querySelector("[upload-image-preview]");

  uploadImageInput.addEventListener('change',(e) =>{
    const file = e.target.files[0];
    if (file ) {
      uploadImagePreview.src = URL.createObjectURL(file);
    }

    const deleteImageInput = document.querySelector("[delete-image-input]");

    if (deleteImageInput) {
      deleteImageInput.addEventListener('click',() =>{
        uploadImageInput.value = "";
        uploadImagePreview.src= "";
      })
    }
  })
}
//End Upload Image

// Sort
const sort = document.querySelector("[sort]");

if (sort){

  let url = new URL(window.location.href);

  const sortSelect = sort.querySelector("[sort-select]");
  const sortClear = sort.querySelector("[sort-clear]");

  // Sort
  sortSelect.addEventListener("change",(e) =>{
    const value = e.target.value;
    const[sortKey,sortValue] = value.split("-");
    url.searchParams.set('sortKey', sortKey);
    url.searchParams.set('sortValue', sortValue);
    window.location.href = url.href;
  })
  // End Sort

  // Clear Sort
  sortClear.addEventListener("click",(e)=>{
    url.searchParams.delete('sortKey');
    url.searchParams.delete('sortValue');
    window.location.href = url.href;
  })
 // End clear Sort

 //thêm selector cho option

  const sortKey =  url.searchParams.get('sortKey');
  const sortValue =  url.searchParams.get('sortValue');

  if (sortKey && sortValue) {
    const stringSort = `${sortKey}-${sortValue}`
    const optionSlected = sortSelect.querySelector(`option[value='${stringSort}']`)
    optionSlected.selected =true;
  }

}

// End Sort
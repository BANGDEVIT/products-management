// cập nhật lại giỏ hàng
const inputQuantity = document.querySelectorAll("input[name='quantity']")
if (inputQuantity.length > 0){
  inputQuantity.forEach(input => {
    input.addEventListener("change",()=>{
      const productId = input.getAttribute("product-id");
      const value = input.value;

      console.log(productId,value)

      window.location.href = `/cart/update/${productId}/${value}`
    })
  })
}
// End cập nhật lại giỏ hàng
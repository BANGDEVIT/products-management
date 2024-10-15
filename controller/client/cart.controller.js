const Cart = require("../../model/cart.model");

//[POST]/cart/add/:productId
module.exports.addPost = async(req,res) =>{
  const productId = req.params.productId;
  const quantity = parseInt(req.body.quantity);

  const cartID = req.cookies.cartID;

  const objectCart = {
    product_id : productId,
    quantity : quantity
  }

  const cart = await Cart.findOne({
    _id : cartID
  })

  const existProductCart = cart.products.find(item => item.product_id === productId);

  if(existProductCart){
    const newQuantity =quantity + existProductCart.quantity;
    await Cart.updateOne({
      _id : cartID,
      "products.product_id": productId
    },{
      $set: { "products.$.quantity": newQuantity }
    })
      
  }else{
    await Cart.updateOne(
      {
        _id : cartID
      },
      {
        $push: { products : objectCart}
      }
      )
  }

  req.flash("success","Đã thêm sản phẩm vào giỏ hàng")

  res.redirect('back');
}
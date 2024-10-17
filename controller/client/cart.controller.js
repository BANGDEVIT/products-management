const { request } = require("express");
const Cart = require("../../model/cart.model");
const Product = require("../../model/product.model");

//[GET]/cart
module.exports.cart = async(req,res) =>{

  const cartID = req.cookies.cartID;

  const cart = await Cart.findOne({_id : cartID});

  if (cart.products.length > 0) {
    for (const item of cart.products) {
      const productId = item.product_id;
      const productInfo = await Product.findOne({_id : productId}).select("title thumbnail price discountPercentage slug");

      item.productInfo = productInfo;


      const price = (productInfo.price)
      const discountPercentage = (productInfo.discountPercentage);


      // item.priceNew = (price*(1-discountPercentage/100));
      // item.priceNew = parseInt(item.priceNew).toFixed(2);

      priceNew = (price*(1-discountPercentage/100)).toFixed(2);

      item.productInfo.priceNew = parseFloat(priceNew);

      item.totalPrice = item.productInfo.priceNew * item.quantity;
    }
  }

  cart.totalPrice = cart.products.reduce((sum,item) => sum + item.totalPrice,0).toFixed(2);

  res.render("client/page/cart/index",{
    pageTitle : "Giỏ hàng",
    cartDetail : cart,
  })
}

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

//[GET]/cart/delete/:productId
module.exports.delete = async(req,res) =>{
  const cartID = req.cookies.cartID;
  const productId = req.params.productId;

  await Cart.updateOne({
    _id : cartID
  },{
    $pull: { products : { product_id : productId } }
  })

  req.flash("success","Đã xóa thành công ");

  res.redirect('back');
}

//[GET]/cart/update/:productId/:value
module.exports.update = async(req,res) =>{
  const cartID = req.cookies.cartID;
  const productId = req.params.productId;
  const value = req.params.quantity;


  await Cart.updateOne({
    _id : cartID,
    "products.product_id": productId
  },{
    $set: {"products.$.quantity" : value}
  })

  req.flash("success","cập nhật số lượng thành công ");

  res.redirect('back');
}


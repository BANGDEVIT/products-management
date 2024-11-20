const Cart = require('../../model/cart.model');

module.exports.cartId = async(req,res,next) => {
  if(req.cookies.cartID == undefined) {
    const cart = new Cart();
    await cart.save();

    const expiresCookie = 365 *24 * 60 * 60 * 1000;
    res.cookie("cartID", cart.id,{
      expires : new Date(Date.now() + expiresCookie),
    });
  }else {
    const cart = await Cart.findOne({_id: req.cookies.cartID})
    cart.totalQuantity = cart.products.reduce((sum,item) => sum + item.quantity,0);
    res.locals.miniCart = cart;
  }
  next();
}
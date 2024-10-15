const Cart = require('../../model/cart.model');

module.exports.cartId = async(req,res,next) => {
  if(!req.cookies.cartID) {
    const cart = new Cart();
    await cart.save();

    const expiresCookie = 365 *24 * 60 * 60 * 1000;
    res.cookie("cartID", cart.id,{
      expires : new Date(Date.now() + expiresCookie),
    });
  }else {
  }
  next();
}
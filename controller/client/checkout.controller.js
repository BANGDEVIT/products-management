const Order = require("../../model/order.model");
const Cart = require("../../model/cart.model");
const Product = require("../../model/product.model");

//[GET] /checkout
module.exports.index = async(req,res) =>{
  const cartID = req.cookies.cartID;

  const cart = await Cart.findOne({_id : cartID})

  if (cart.products.length > 0) {
    for (const item of cart.products) {
      const productId= item.product_id;
      const productInfo = await Product.findOne({_id : productId}).select("title thumbnail price discountPercentage slug");
      
      item.productInfo = productInfo;

      const price = productInfo.price

      const discountPercentage = productInfo.discountPercentage;

      const priceNew = (price*(1-discountPercentage/100)).toFixed(2);

      item.productInfo.priceNew = parseFloat(priceNew);

      item.totalPrice = item.productInfo.priceNew * item.quantity

    }
  }

  cart.totalPrice= cart.products.reduce((sum,item) => sum + item.totalPrice,0).toFixed(2);

  res.render('client/page/checkout/index.pug',{
    pageTitle : 'Thanh toán',
    cartDetail : cart,
  })
}

//[POST] /checkout/order
module.exports.order = async(req,res) =>{
  const cartID = req.cookies.cartID;
  const userInfo = req.body;

  const cart = await Cart.findOneAndUpdate({_id : cartID});

  const products=[];
  for (const item of cart.products) {
    const objectProduct  = {
      product_id : item.product_id,
      price : 0,
      discountPercentage : 10,
      quantity : item.quantity,
    }

    const productInfo = await Product.findOne({_id : item.product_id}).select("price discountPercentage");
    objectProduct.price = productInfo.price;
    objectProduct.discountPercentage = productInfo.discountPercentage;

    products.push(objectProduct);
  }

  const orderInfo = {
    cart_id : cartID,
    userInfo : userInfo,
    products : products
  }

  const order = new Order(orderInfo);
  order.save();

  await Cart.updateOne({
    _id : cartID
  },{
    $set : {
      products : [],
      totalPrice : 0
    }
  })

  res.redirect(`/checkout/success/${order.id}`);
}

//[GET] /checkout/success/:orderId

module.exports.success = async(req,res) =>{
  const orderId = req.params.orderId;

  const order = await Order.findOne({_id : orderId})

  for (const product of order.products){
    const productInfo = await Product.findOne({_id : product.product_id}).select("title thumbnail");
    product.productInfo = productInfo;

    const price = (product.price)
    const discountPercentage = (product.discountPercentage);

    priceNew = (price*(1-discountPercentage/100)).toFixed(2);

    product.priceNew = parseFloat(priceNew);

    product.totalPrice = product.priceNew * product.quantity;
  }

  order.totalPrice= order.products.reduce((sum,item) => sum+ item.totalPrice,0).toFixed(2);

  res.render('client/page/checkout/success.pug',{
    pageTitle : 'Đặt hàng thành công',
    order : order,
  })
}
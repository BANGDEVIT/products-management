const Order = require('../../model/order.model')
const Product = require('../../model/product.model')


//[GET] admim/checkout
module.exports.checkout = async (req,res) =>{

  const orders = await Order.find({
    deleted : false,
  })
  for (const order of orders){
    console.log(order.products)
  }
  
  res.render('admin/pages/checkout/index',{
    pageTitle : "Danh sách đơn hàng",
    orders : orders,
  })
}
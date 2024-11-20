const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);


const orderSchema = new mongoose.Schema({
  cart_id : String,
  user_id : String,
  userInfo : {
    fullName : String,
    phone : String,
    address : String
  },
  products : [
    {
      product_id : String,
      price : Number,
      discountPercentage : Number,
      quantity : Number,
      title : String,
      thumbnail : String,
      newPrice : Number
    }
  ],
  // status : ""
  deleted : {
    type : Boolean,
    default : false,
  },
  deletedAt : Date,
},
{
  timestamps : true, 
})

const Order = mongoose.model("Order",orderSchema,"orders");

module.exports = Order;
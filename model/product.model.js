const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);


const productSchema = new mongoose.Schema({
  title: String, 
  description: String,
  price: Number,
  discountPercentage: Number,
  stock: Number,
  thumbnail: String,
  status: String,
  position:Number,
  slug: { 
    type: String,
    slug: "title",
    unique: true
   },
  delete: {
    type : Boolean,
    default: false
  },
  deleteAt : Date
},{
  timestamps : true, 
})

const Product = mongoose.model("Product",productSchema,"Database");

module.exports = Product;
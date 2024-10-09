const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);


const productCategorySchema = new mongoose.Schema({
  title: String, 
  description: String,
  parent_id: {
    type: String,
    default: "",
  },
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

const ProductCategory = mongoose.model("ProductCategory",productCategorySchema,"products-category");

module.exports = ProductCategory;
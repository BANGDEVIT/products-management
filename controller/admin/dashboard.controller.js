const Products = require('../../model/product.model');
const ProductCategory = require('../../model/products-category.model');
const Account = require('../../model/account.js');

// [GET] /admin/dashboard
module.exports.dashboard = async (req,res) =>{
  const statistic = {
    categoryProduct : {
      total : await ProductCategory.countDocuments(),
      active : await ProductCategory.countDocuments({status : "active"}),
      inactive : await ProductCategory.countDocuments({status : "inactive"}),
    },
    product : {
      total : await Products.countDocuments(),
      active : await Products.countDocuments({status : "active"}),
      inactive : await Products.countDocuments({status : "inactive"}),
    },
    account : {
      total : await Account.countDocuments(),
      active : await Account.countDocuments({status : "active"}),
      inactive : await Account.countDocuments({status : "inactive"}),
    },
    // user : {
    //   total : await ProductCategory.countDocuments(),
    //   active : await ProductCategory.countDocuments({status : "active"}),
    //   inactive : await ProductCategory.countDocuments({status : "inactive"}),
    // }
  }
  res.render('admin/pages/dashboard/index',{
    pageTitle : "trang tổng quan",
    statistic :statistic
  })
}
// [GET] /products
const Product = require('../../model/product.model')

const productsHelper = require('../../helpers/products');

module.exports.index = async (req,res) =>{
  const products = await Product.find({
    status : "active",
    delete : false
  }).sort({position : "desc"});


  const newProducts = productsHelper.priceNewProducts(products);

  res.render('client/page/products/index',{
    pageTitle : 'Danh sách sản phẩm',
    products : newProducts
  });
};

// [GET] /products/:slug
module.exports.detail = async (req,res) =>{

  const product = await Product.findOne({
    slug : req.params.slug,
    delete : false,
    status : "active"
  });

  res.render('client/page/products/detail',{
    pageTitle : 'Chi tiết sản phẩm',
    product : product
  });
};
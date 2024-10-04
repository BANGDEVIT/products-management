// [GET] /products
const Product = require('../../model/product.model')

module.exports.index = async (req,res) =>{
  const products = await Product.find({
    status : "active",
    delete : false
  }).sort({position : "desc"});

  products.forEach(item =>{
    item.priceNew = (item.price*(1-item.discountPercentage/100)).toFixed(2);
  })

  console.log(products);
  res.render('client/page/products/index',{
    pageTitle : 'Danh sách sản phẩm',
    products : products
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
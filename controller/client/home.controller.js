const Product = require('../../model/product.model')

const productsHelper = require('../../helpers/products');

// [GET] /home
module.exports.index = async(req,res) =>{

  let find ={
    delete : false,
    featured : "1",
    status : "active"
  }
  const productsFeatured = await Product.find(find) 

  console.log(productsFeatured);

  const newProducts = productsHelper.priceNewProducts(productsFeatured);


  res.render('client/page/home/index',{
    pageTitle : 'Trang chủ',
    productsFeatured : newProducts
  });
};
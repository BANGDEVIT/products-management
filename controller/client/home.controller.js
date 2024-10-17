const Product = require('../../model/product.model')

const productsHelper = require('../../helpers/products');

// [GET] /home
module.exports.index = async(req,res) =>{
// Lấy sản phẩm nổi bật
  let find ={
    delete : false,
    featured : "1",
    status : "active"
  }
  const productsFeatured = await Product.find(find).limit(6)


  const newProducts = productsHelper.priceNewProducts(productsFeatured);
//End Lấy sản phẩm nổi bật
//lấy sản phẩm mới nhât 

  const productsNew= await Product.find({
    delete : false,
    status : "active"
  }).sort({position : "desc"}).limit(6)

  const newProductsNew = productsHelper.priceNewProducts(productsNew);
//Endlấy sản phẩm mới nhât 


  res.render('client/page/home/index',{
    pageTitle : 'Trang chủ',
    productsFeatured : newProducts,
    productsNew : newProductsNew,
  });
};
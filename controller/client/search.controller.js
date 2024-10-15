const Product = require('../../model/product.model')

//[GET] /search
module.exports.index = async(req,res) =>{

  const keyword = req.query.keyword;

  let newProducts =[]

  if (keyword) {
    const regex = new RegExp(keyword, 'i');
    const products = await Product.find({
      title: regex,
      status: 'active',
      delete: false
    })
    products.forEach(item =>{
      item.priceNew = (item.price*(1-item.discountPercentage/100)).toFixed(2);
    })

    newProducts = products;
  }

  res.render('client/page/search/index',{
    pageTitle : 'Kết quả tìm kiếm',
    keyword : keyword,
    products : newProducts
  });
} 
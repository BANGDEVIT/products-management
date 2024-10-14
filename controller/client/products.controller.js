// [GET] /products
const Product = require('../../model/product.model')
const ProductCategory = require('../../model/products-category.model');

const productsHelper = require('../../helpers/products');
const productsCategoryHelper = require('../../helpers/products-category');

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

// [GET] /products/:slugCategory
module.exports.category = async (req,res) =>{
  let find = {
    slug : req.params.slugCategory,
    delete : false,
    status : "active"
  }

  const category = await ProductCategory.findOne(find);

  // const getSubCategory =async (parentId) =>{
  //   const subs = await ProductCategory.find({
  //     parent_id : parentId,
  //     delete : false,
  //     status : "active"
  //   });
  //   let allSub = [...subs];
  //   for (const sub of subs) {
  //     const childs =await getSubCategory(sub.id);
  //     allSub - allSub.concat(childs);
  //   }
  //   return allSub;
  // }

  const listSubCategory =  await productsCategoryHelper.getSubCategory(category.id);

  const listSubCategoryId = listSubCategory.map(item =>item.id)

  console.log(listSubCategoryId);

  const products = await Product.find({
    products_category_id : { $in : [category.id , ...listSubCategoryId]},
    delete : false,
    status : "active"
  }).sort({position : "desc"});

  const newProducts = productsHelper.priceNewProducts(products);

  res.render('client/page/products/category',{
    pageTitle : category.title,
    products : newProducts
  })
};
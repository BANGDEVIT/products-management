const ProductCategory = require('../../model/products-category.model');

const createTreeHelper = require('../../helpers/createTree.js');

module.exports.category = async(req,res,next) => {
  let find = {
    delete : false,
    status : 'active'
  }
  const productsCategory = await ProductCategory.find(find);
  const newProductsCategory = createTreeHelper.tree(productsCategory);

  res.locals.layoutProductsCategory = newProductsCategory ;
  next();
}
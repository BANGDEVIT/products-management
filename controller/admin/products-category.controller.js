const { prefixAdmin } = require('../../config/system');
const ProductCategory = require('../../model/products-category.model');

const createTreeHelper = require('../../helpers/createTree.js');

// [GET] admin/products-category
module.exports.index = async (req,res) => {
  let find = {
    delete : false
  }

  const records = await ProductCategory.find(find);

  const newRecords = createTreeHelper.tree(records);

  res.render('admin/pages/products-category/index',{
    pageTitle : "Danh mục sản phẩm",
    records : newRecords
  })
}

// [GET] admin/products-category/create
module.exports.create = async (req,res) => {
  const find ={
    delete : false,
  }

  const records = await ProductCategory.find(find);

  const newRecords = createTreeHelper.tree(records);

  res.render('admin/pages/products-category/create',{
    pageTitle : "Tạo danh mục sản phẩm",
    records : newRecords,
  })
}

// [POST] admin/products-category/create
module.exports.createPost = async (req,res) =>{
  if (req.body.position == ""){
    const count = await ProductCategory.countDocuments();
    req.body.position = count + 1;
  }
  else{
    req.body.position = parseFloat(req.body.position);
  }

  if (req.file){
    req.body.thumbnail =`/uploads/${req.file.filename}`;
  }

  const record = new ProductCategory(req.body);
  await record.save();

  res.redirect(`${prefixAdmin}/products-category`);

}

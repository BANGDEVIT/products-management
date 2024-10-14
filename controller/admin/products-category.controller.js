const { prefixAdmin } = require('../../config/system');
const ProductCategory = require('../../model/products-category.model');

const createTreeHelper = require('../../helpers/createTree.js');

const systemConfig  = require('../../config/system');

// [GET] admin/products-category
module.exports.index = async (req,res) => {
  let find = {
    delete : false
  }
//pagination
  // const countProducts = await ProductCategory.countDocuments(find);

  // let objectPagination = paginationHelper(
  //   {
  //     limitItems : 6,
  //     currentPage : 1,
  //   },
  //   req.query,
  //   countProducts
  // )
//End pagination

//Sort
  const sort ={};
  if (req.query.sortKey && req.query.sortKey){
    sort[req.query.sortKey] = req.query.sortValue; 
  }
  else {
    sort.position = "asc";
  }
//End Sort  
  const records = await ProductCategory.find(find)
  .sort(sort)
  // .limit(objectPagination.limitItems)
  // .skip(objectPagination.skip)

  const newRecords = createTreeHelper.tree(records);
  

  res.render('admin/pages/products-category/index',{
    pageTitle : "Danh mục sản phẩm",
    records : newRecords,
    // pagination : objectPagination,
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
  const permissions = res.locals.role.permissions;
  if(permissions.includes("products-category_create")){
    console.log("co quyen");
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
  }else{
    return;
  }
}

// [GET] admin/products-category/edit/:id
module.exports.edit = async(req,res) =>{

  try {
    const find = {
      delete : false,
      _id : req.params.id 
    }

    let findMany = {
      delete : false
    }

    const record = await ProductCategory.findOne(find);

    const records = await ProductCategory.find(findMany);

    const newRecords = createTreeHelper.tree(records);
  
    res.render('admin/pages/products-category/edit',{
      pageTitle : "chỉnh sửa danh mục sản phẩm",
      records : record,
      newRecords : newRecords,
    })
  } catch (error) {
    req.flash("error","tên sản phẩm không được để trống");
    res.redirect(`${systemConfig.prefixAdmin}/products-category`);
  }
}

// [PATCH] admin/products-category/edit/:id
module.exports.editPatch = async(req,res) =>{

  const id = req.params.id;

  req.body.position = parseInt(req.body.position);

  if (req.file){
    req.body.thumbnail =`/uploads/${req.file.filename}`;
  }

  try {
    await ProductCategory.updateOne({_id : id},req.body);
    req.flash("success",`cập nhật thành công sản phẩm `);
    res.redirect(`back`);
  } catch (error) {
    req.flash("error","cập nhật thất bại");
    res.redirect(`back`);
  }
  
}
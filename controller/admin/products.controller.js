const Products = require('../../model/product.model');

const filterStatusHelper = require('../../helpers/filterStatus');
const searchHelper = require('../../helpers/search');
const paginationHelper = require('../../helpers/pagination');
const systemConfig  = require('../../config/system');


// [GET] admin/products
module.exports.products = async(req,res) =>{

  const filterStatus = filterStatusHelper(req.query); // tạo biến filterStatus và gọi hàm filterStatusHelper()
  

  let find = {
    delete : false
  }

  if (req.query.status){
    find.status = req.query.status
  }

// Search

  const objectSearch = searchHelper(req.query);

  if (objectSearch.regex){
    find.title = objectSearch.regex;
  }

// End Search

// Pagination
  const countProducts = await Products.countDocuments(find);

  let objectPagination = paginationHelper (
    {
      limitItems : 4,
      currentPage : 1,
    },
    req.query,
    countProducts);
    
  // if (req.query.page) {
  //   objectPagination.currentPage = parseInt(req.query.page);
  // }

  // objectPagination.skip = (objectPagination.currentPage - 1 ) * objectPagination.limitItems;

  // const countProducts = await Products.countDocuments(find);

  // const totalPages = Math.ceil(countProducts / objectPagination.limitItems);

  // objectPagination.totalPages = totalPages;

  // console.log(totalPages);


// End Pagination


  const products = await Products.find(find)
    .sort({position : "desc"})
    .limit(objectPagination.limitItems)
    .skip( objectPagination.skip);

  products.forEach(item =>{
    item.priceNew = (item.price*(1-item.discountPercentage/100)).toFixed(2);
  })

  // console.log(products);

  res.render('admin/pages/products/index',{
    pageTitle : "trang sản phẩm",
    products : products,
    filterStatus :filterStatus,
    keyword : objectSearch.keyword,
    pagination :objectPagination
  })
}

// [PATCH] admin/products/change-status/:status/:id
module.exports.changeStatus = async (req,res) =>{
  const status = req.params.status;
  const id = req.params.id;

  const page = req.query.page;

  await Products.updateOne({_id : id},{status : status})

  req.flash("success","cập nhật thành công");

  res.redirect(`back`);
}

// [PATCH] admin/products/change-mutil
module.exports.changeMutil = async (req,res) =>{
  const type = req.body.type;
  const ids = req.body.ids.split(', ');

  switch (type) {
    case 'active':
      await Products.updateMany({ _id: { $in: ids } },{ status : "active" });
      req.flash("success",`cập nhật thành công ${ids.length} sản phẩm `);
      break;
    case 'inactive':
      await Products.updateMany({ _id: { $in: ids }},{ status : "inactive" });
      req.flash("success",`cập nhật thành công ${ids.length} sản phẩm `);
      break;
    case 'delete-all':
      await Products.updateMany({ _id: { $in: ids } },{ delete : true,deleteAt : new Date()},);
      req.flash("success",`xóa thành công ${ids.length} sản phẩm `);
      break;
    case 'change-position':
      for (const item of ids) {
        let [id,position] = item.split('-');

        position= parseInt(position);

        await Products.updateOne({_id : id},{position : position});
      }
      break;
}

  res.redirect(`back`);

}

// [DELETE] admin/products/delete/:id xóa cứng 
module.exports.deleteItemForever= async (req,res) =>{
  const id = req.params.id;

  await Products.deleteOne({_id : id});

  res.redirect(`back`);
}

// [DELETE] admin/products/delete/:id xóa mềm
module.exports.deleteItem = async (req,res) =>{
  const id = req.params.id;

  await Products.updateOne({_id : id},{
    delete : true,
    deleteAt : new Date()
  });

  res.redirect(`back`);
}

// [GET] admin/products/create
module.exports.create = async(req,res) =>{

  res.render('admin/pages/products/create',{
    pageTitle : "trang tạo sản phẩm",
  })
}

// [POST] admin/products/create
module.exports.createPost = async (req,res) =>{

  if (!req.body.title){
    req.flash("error","tên sản phẩm không được để trống");
    return res.redirect('back');
  }

  req.body.price = parseFloat(req.body.price);
  req.body.discountPercentage = parseFloat(req.body.discountPercentage);
  req.body.stock = parseFloat(req.body.stock);

  if (req.body.position == ""){
    const countProducts = await Products.countDocuments();
    req.body.position = countProducts + 1;
  }
  else{
    req.body.position = parseFloat(req.body.position);
  }

  if (req.file){
    req.body.thumbnail =`/uploads/${req.file.filename}`;
  }
  
  const product = new Products(req.body);
  await product.save();

  res.redirect(`${systemConfig.prefixAdmin}/products`);
}

// [GET] admin/products/edit/:id
module.exports.edit = async(req,res) =>{

  try {
    const find = {
      delete : false,
      _id : req.params.id 
    }
  
    const product = await Products.findOne(find);
  
    res.render('admin/pages/products/edit',{
      pageTitle : "chỉnh sửa sản phẩm",
      product : product
    })
  } catch (error) {
    req.flash("error","tên sản phẩm không được để trống");
    res.redirect(`${systemConfig.prefixAdmin}/products`);
  }
}

// [PATCH] admin/products/edit/:id
module.exports.editPatch = async(req,res) =>{
  if (!req.body.title){
    req.flash("error","tên sản phẩm không được để trống");
    return res.redirect('back');
  }

  console.log(req.file)
  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);
  req.body.position = parseInt(req.body.position);

  if (req.file){
    req.body.thumbnail =`/uploads/${req.file.filename}`;
  }
  
  try {
    await Products.updateOne({_id : req.params.id},req.body);
    req.flash("success",`cập nhật thành công sản phẩm `);
    res.redirect(`back`);
  } catch (error) {
    req.flash("error","cập nhật thất bại");
    res.redirect(`back`);
  }
}

//[GET] admin/products/detail/:id
module.exports.detail = async (req,res) =>{
  
  try {
    const find ={
      delete : false,
      _id : req.params.id
    }
    
    const product = await Products.findOne(find);
  
    res.render("admin/pages/products/detail",{
      pageTitle : product.title,
      product : product
    })
  } catch (error) {
    req.flash("error","không tìm thấy sản phẩm ");
    res.redirect(`${systemConfig.prefixAdmin}/products`);
  }
}



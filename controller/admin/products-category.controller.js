const { prefixAdmin } = require('../../config/system');
const ProductCategory = require('../../model/products-category.model');

// [GET] admin/products-category
module.exports.index = async (req,res) => {
  let find = {
    delete : false
  }

  const records = await ProductCategory.find(find);

  res.render('admin/pages/products-category/index',{
    pageTitle : "Danh mục sản phẩm",
    records : records
  })
}

// [GET] admin/products-category/create
module.exports.create = async (req,res) => {
  const find ={
    delete : false,
  }

  const createTree = (arr,parentId="") =>{
    const tree = [];
    arr.forEach(item =>{
      if (item.parent_id === parentId){
        // tree.push({
        //   _id : item._id,
        //   name : item.name,
        //   children : createTree(arr,item._id)
        // }) 
        const newItem = item;
        const children = createTree(arr,item.id);
        if (children.length > 0){
          newItem.children = children;
        }
        tree.push(newItem);
      };
    });
    return tree;
  }

  const records = await ProductCategory.find(find);

  const newRecords = createTree(records);

  console.log(newRecords);

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

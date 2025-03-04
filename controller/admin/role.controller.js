const Role = require('../../model/role.model')
const systemConfig  = require('../../config/system');

// [GET] /admin/roles
module.exports.index = async (req,res) => {

  let find = {
    delete : false
  }

  const records = await Role.find(find);

  res.render('admin/pages/role/index',{
    pageTitle : "trang nhóm quyền",
    records :records
  })
}

// [GET] /admin/roles/create
module.exports.create = async (req,res) => {
  res.render('admin/pages/role/create',{
    pageTitle : "trang phân nhóm quyền",
  })
}

// [PSOT] /admin/roles/create
module.exports.createPost = async (req,res) => {

  const record = new Role(req.body);
  await record.save();

  res.redirect(`${systemConfig.prefixAdmin}/roles`);
}

// [GET] /admin/roles/edit/:id
module.exports.edit = async (req,res) => {

  const id = req.params.id;

  let find = {
    _id : id,
    delete : false
  }

  const record = await Role.findOne(find);

  res.render('admin/pages/role/edit',{
    pageTitle : "trang chỉnh sủa phân nhóm quyền",
    record : record
  })
}

// [PATCH] admin/roles/edit/:id
module.exports.editPatch = async(req,res) =>{

  const id = req.params.id;

  try {
    await Role.updateOne({_id : id},req.body);
    req.flash("success",`cập nhật thành công sản phẩm `);
    res.redirect(`back`);
  } catch (error) {
    req.flash("error","cập nhật thất bại");
    res.redirect(`back`);
  }
  
}

// [GET] /admin/roles/detail/:id
module.exports.detail = async (req,res) => {

  const id = req.params.id;

  let find = {
    _id : id,
    delete : false
  }

  const record = await Role.findOne(find);

  res.render('admin/pages/role/detail',{
    pageTitle : "trang chi tiết nhóm quyền",
    record : record
  })
}

// [PATCH] admin/roles/delete/:id
module.exports.delete = async(req,res) =>{

  const id = req.params.id;

  try {
    await Role.updateOne({_id : id},{delete : true});
    req.flash("success",`xóa thành công sản phẩm `);
    res.redirect(`back`);
  } catch (error) {
    req.flash("error","xóa thất bại");
    res.redirect(`back`);
  }
  
}

// [GET] /admin/roles/permission
module.exports.permissions = async (req,res) => {

  let find = {
    delete : false,
  }

  const records = await Role.find(find);

  res.render('admin/pages/role/permission',{
    pageTitle : "trang phân quyền",
    records : records
  })
}

// [PATCH] /admin/roles/permission
module.exports.permissionsPatch = async (req,res) => {
  try {
    const permissions = JSON.parse(req.body.permissions);
    
  for (const item of permissions) {
    await Role.updateOne({_id : item.id}, {permissions: item.permissions})
  }
  req.flash("success","cập nhật phân quyền thành công")
  res.redirect(`back`);
  } catch (error) {
  req.flash("error","cập nhật phân quyền thành công")
  res.redirect(`back`);
  }
}
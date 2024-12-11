const md5 = require('md5');
const Account = require('../../model/account.js');
const Role = require('../../model/role.model');
const systemConfig  = require('../../config/system');

//[GET] /admin/accounts
module.exports.index = async(req,res) =>{

  try {
    let find = {
      delete : false
    }
  
    const records = await Account.find(find).select("-password -token");
  
    for (const record of records){
      const role = await Role.findOne({
        _id : record.role_id,
        delete : false
      });
      record.role = role;
    }
  
    res.render('admin/pages/account/index',{
      pageTitle : 'Danh sách tài khoản',
      records : records,
    })
  } catch (error) {
    res.render(`${systemConfig.prefixAdmin}/pages/account/`)
  }
  
}

//[GET] /admin/accounts/create
module.exports.create = async(req,res) =>{

  try {
    let find = {
      delete : false
    }
  
    const roles = await Role.find(find);
  
    res.render('admin/pages/account/create',{
      pageTitle : ' Thêm mới Danh sách tài khoản',
      roles : roles
    })
  } catch (error) {
    res.render(`${systemConfig.prefixAdmin}/pages/account/`)
  }

  
}

//[POST] /admin/accounts/create
module.exports.createPost = async(req,res) =>{

  req.body.password = md5(req.body.password); // mã hóa mật khẩu

  const emailExist = await Account.findOne({
    email : req.body.email,
    delete : false
  })

  if (emailExist){
    req.flash('error','Email đã tồn tại');
    return res.redirect(`${systemConfig.prefixAdmin}/accounts/create`);
  }else{
    if (req.file){
      req.body.thumbnail =`/uploads/${req.file.filename}`;
    }
  
    const account = new Account(req.body)
    await account.save();
  
    res.redirect(`${systemConfig.prefixAdmin}/accounts`);
  }
}

// [GET] /admin/accounts/edit/:id
module.exports.edit = async(req,res) =>{

  try {
    let find = {
      _id : req.params.id,
      delete : false
    }

    const record = await Account.findOne(find);
    
    const role = await Role.findOne({
      _id : record.role_id,
      delete : false
    });
    record.role = role;
  
    
    const roles = await Role.find({delete : false});
  
    res.render('admin/pages/account/edit',{
      pageTitle : ' Chỉnh sửa tài khoản',
      roles : roles,
      record : record
    })
  } catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/accounts`);
  }
  
}

// [PATCH] /admin/accounts/edit/:id
module.exports.editPatch = async(req,res) =>{

  const emailExist = await Account.findOne({
    _id : { $ne : req.params.id },
    email : req.body.email,
    delete : false
  })

  if (emailExist){
    req.flash('error','Email đã tồn tại');
    return res.redirect(`${systemConfig.prefixAdmin}/accounts/create`);
  }else{
    if (req.file){
      req.body.avatar =`/uploads/${req.file.filename}`;
    }

    if (req.body.password){
      req.body.password = md5(req.body.password); // mã hóa mật khẩu
    }else{
      delete req.body.password;
    }

    try {
      await Account.updateOne({_id : req.params.id},req.body);
      req.flash("success",`cập nhật thành công sản phẩm `);
      res.redirect(`back`);
    } catch (error) {
      req.flash("error","cập nhật thất bại");
      res.redirect(`back`);
    }
  }
}

module.exports.delete = async(req,res) =>{
  const id = req.params.id;
  try {
    await Account.updateOne({_id : id},{delete : true});
    req.flash("success",`xóa thành tai Khoản `);
    res.redirect(`back`);
  } catch (error) {
    req.flash("error","xóa thất bại tai Khoản");
    res.redirect(`back`);
  }  
}
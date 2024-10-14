const Role = require('../../model/role.model');
const Account = require('../../model/account');
const md5 = require('md5');

//[GET] /admin/my-account
module.exports.index = async(req,res) =>{
  res.render('admin/pages/my-account/index',{
    pageTitle : 'Trang tài khoản'
  })
}

//[GET] /admin/my-account/edit
module.exports.edit = async(req,res) =>{

  let find = {
    delete : false
  }

  const roles = await Role.find(find);

  res.render('admin/pages/my-account/edit',{
    pageTitle : 'Trang chỉnh sửa tài khoản',
    roles : roles
  })
}

//[POST] /admin/my-account/edit
module.exports.editPatch = async(req,res) =>{
  const id = res.locals.user.id;
  const emailExist = await Account.findOne({
    _id : { $ne : id },
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

    console.log(req.file);

    if (req.body.password){
      req.body.password = md5(req.body.password); // mã hóa mật khẩu
    }else{
      delete req.body.password;
    }

    try {
      await Account.updateOne({_id : id},req.body);
      req.flash("success",`cập nhật thành công sản phẩm `);
      res.redirect(`back`);
    } catch (error) {
      req.flash("error","cập nhật thất bại");
      res.redirect(`back`);
    }
  }
}
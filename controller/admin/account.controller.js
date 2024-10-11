const md5 = require('md5');
const Account = require('../../model/account.js');
const Role = require('../../model/role.model');
const systemConfig  = require('../../config/system');

//[GET] /admin/accounts
module.exports.index = async(req,res) =>{

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

  console.log(records);

  res.render('admin/pages/account/index',{
    pageTitle : 'Danh sách tài khoản',
    records : records,
  })
}

//[GET] /admin/accounts/create
module.exports.create = async(req,res) =>{

  let find = {
    delete : false
  }

  const roles = await Role.find(find);


  res.render('admin/pages/account/create',{
    pageTitle : ' Thêm mới Danh sách tài khoản',
    roles : roles
  })
}

//[GET] /admin/accounts/create
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
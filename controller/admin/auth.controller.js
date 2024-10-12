const systemConfig  = require('../../config/system');
const md5 = require('md5');
const Account = require('../../model/account.js');

// [GET] /admin/auth/login
module.exports.login = async (req,res) =>{
  const token = req.cookies.token;
  // const user = await Account.findOne({token : token});
  if (token) {
    res.redirect(`${systemConfig.prefixAdmin}/dashboard`);
    return;
  }
  res.render('admin/pages/auth/login',{
    pageTitle : 'Trang đăng nhập'
  });
}

// [POST] /admin/auth/login
module.exports.loginPost = async (req,res) =>{
  const { email, password } = req.body;

  // Check tài khoản và mật khẩu
  let find = {
    email : email,
    delete : false
  }

  const user = await Account.findOne(find);

  if (!user) {
    req.flash('error',"sai Email");
    res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
    return;
  }

  if (md5(password) != user.password) {
    req.flash('error',"sai mật khẩu");
    res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
    return;
  }

  if (user.active == "inactive") {
    req.flash('error',"Tài Khoản đã bị khóa");
    res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
    return;
  }

  res.cookie("token",user.token);
  res.redirect(`${systemConfig.prefixAdmin}/dashboard`);
}

// [GET] /admin/auth/logout
module.exports.logout = async (req,res) =>{
  res.clearCookie("token");
  res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
}
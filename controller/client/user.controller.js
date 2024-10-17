const User = require('../../model/user.model');
const ForgotPassword = require('../../model/forgot-password.model');
const md5 = require('md5');

const generateHelper = require('../../helpers/generate');

//[GET] user/register
module.exports.register =async(req,res) =>{
  res.render('client/page/user/register',{
    pageTitle : 'Đăng ký'
  })
}

//[POST] user/register
module.exports.registerPost =async(req,res) =>{

  

  const emailExist = await User.findOne({email : req.body.email});

  if (emailExist){
    req.flash("error","Email đã tồn tại");
    res.redirect('/user/register');

  }else{
    req.body.password = md5(req.body.password)
    const user = new User(req.body)
    await user.save();
    res.cookie("tokenUser",user.tokenUser)
    req.flash("success","Đăng kí thành công");
    res.redirect('/');
  }
}

//[GET] user/login
module.exports.login =async(req,res) =>{
  res.render('client/page/user/login',{
    pageTitle : 'Đăng nhập'
  })
}

//[POST] user/login
module.exports.loginPost =async(req,res) =>{
  const password = md5(req.body.password);
  const user = await User.findOne({
    email : req.body.email,
    password :  password,
    delete :false,
    status : "active"  // chỉ đăng nhập user kích hoạt 
  })

  if (user){
    res.cookie("tokenUser",user.tokenUser)
    req.flash("success","Đăng nhập thành công");
    res.redirect('/');
  }else {
    req.flash("error","Email hoặc mật khẩu không đúng");
    res.redirect('/user/login');
  }
}

//[GET] user/logout
module.exports.logout =async(req,res) =>{
  res.clearCookie("tokenUser");
  res.redirect('/user/login');
}

//[GET] user/password/forgot
module.exports.forgotPassword =async(req,res) =>{
  res.render('client/page/user/forgot-pasword',{
    pageTitle : 'Lấy lại mật khẩu'
  })
}

//[POST] user/password/forgot
module.exports.forgotPasswordPost =async(req,res) =>{

  const email = req.body.email;

  const user = await User.findOne({email : email, delete : false, status : "active"});

  if(!user){
    req.flash("error","Email không tồn tại");
    res.redirect('/user/password/forgot');
    return;
  }

  //Lưu thông tin vào DB

  const otp = generateHelper.generateRandomNumber(8);
  const objectForgotPassword ={
    email : email,
    otp : otp,
    expireAt : Date.now(),
  }
  const forgotPassword = new ForgotPassword(objectForgotPassword);
  await forgotPassword.save();

  //Nếu tồn tại email thì sẽ gửi mã OTP qua email

  res.send("ok")
}
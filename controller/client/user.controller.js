const User = require('../../model/user.model');
const ForgotPassword = require('../../model/forgot-password.model');
const md5 = require('md5');

const generateHelper = require('../../helpers/generate');
const sendMailHelper = require('../../helpers/sendMail');

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
  const subject ="Mã OTP"
  const html = `
  <h1>Mã OTP của bạn là : ${otp}</h1>
  <p>Mã OTP sẽ hết hạn sau 3 phút</p>
  `;
  sendMailHelper.sendMail(email,subject,html);


  res.redirect(`/user/password/otp?email=${email}`);
}

//[GET] /user/password/otp
module.exports.otpPassword = async(req,res) =>{
  const email = req.query.email;
  res.render('client/page/user/otp-password',{
    pageTitle : 'Xác nhận mã OTP',
    email : email
  })
}

//[POST] /user/password/otp
module.exports.otpPasswordPost = async(req,res) =>{
  const email = req.body.email;
  const otp = req.body.otp;
  const result = await ForgotPassword({otp : otp,email : email});
  if(!result){
    req.flash("error","Mã OTP không đúng");
    res.redirect(`/back`);
    return;
  }

  const user = await User.findOne({email: email});

  res.cookie("tokenUser",user.tokenUser)

  res.redirect(`/user/password/reset`);
}

//[GET] /user/password/reset
module.exports.resetPassword = async(req,res) =>{
  const email = req.query.email;
  res.render('client/page/user/reset-password',{
    pageTitle : 'Tạo tài khoản mới ',
    email : email
  })
}

//[POST] /user/password/reset
module.exports.resetPasswordPost = async(req,res) =>{
  const password = md5(req.body.password);
  const tokenUser = req.cookies.tokenUser
  console.log(tokenUser)
  
  await User.updateOne({tokenUser:tokenUser},{
    password :  password,
  })
  res.redirect('/user/login')
}
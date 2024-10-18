module.exports.registerPost =(req,res,next)=>{
  if (!req.body.fullName){
    req.flash("error","tên không được để trống");
    return res.redirect('back');
  }
  if (!req.body.email){
    req.flash("error","email không được để trống");
    return res.redirect('back');
  }
  if (!req.body.password){
    req.flash("error","mật khẩu không được để trống");
    return res.redirect('back');
  }
  next();
}


module.exports.loginPost =(req,res,next)=>{
  if (!req.body.email){
    req.flash("error","email không được để trống");
    return res.redirect('back');
  }
  if (!req.body.password){
    req.flash("error","mật khẩu không được để trống");
    return res.redirect('back');
  }
  next();
}

module.exports.forgotPasswordPost =(req,res,next)=>{
  if (!req.body.email){
    req.flash("error","email không được để trống");
    return res.redirect('back');
  }
  next();
}


module.exports.otpPasswordPost =(req,res,next)=>{
  if (!req.body.otp){
    req.flash("error","otp không đươck để trống");
    return res.redirect('back');
  }
  next();
}

module.exports.resetPasswordPost =(req,res,next)=>{
  if (!req.body.password){
    req.flash("error","mật khẩu không đươck để trống");
    return res.redirect('back');
  }
  if (!req.body.confirmPassword){
    req.flash("error","xác nhập mật khẩu không đươck để trống");
    return res.redirect('back');
  }
  if (req.body.password != req.body.confirmPassword){
    req.flash("error","mật khẩu không trùng khớp");
    return res.redirect('back');
  }
  next();
}

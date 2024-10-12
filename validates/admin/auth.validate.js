module.exports.login =(req,res,next)=>{
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


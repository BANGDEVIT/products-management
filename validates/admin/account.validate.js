module.exports.createPost =(req,res,next)=>{
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
  console.log("ok");
  next();
}

module.exports.editPatch =(req,res,next)=>{
  if (!req.body.fullName){
    req.flash("error","tên không được để trống");
    return res.redirect('back');
  }
  if (!req.body.email){
    req.flash("error","email không được để trống");
    return res.redirect('back');
  }

  console.log("ok");
  next();
}

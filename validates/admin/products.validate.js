module.exports.createPost =(req,res,next)=>{
  if (!req.body.title){
    req.flash("error","tên sản phẩm không được để trống");
    return res.redirect('back');
  }

  next();
}

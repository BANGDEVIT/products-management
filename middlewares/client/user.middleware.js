const systemConfig  = require('../../config/system');
const User = require('../../model/user.model');

module.exports.infoUser = async (req,res,next) =>{
  const user = await User.findOne({
    tokenUser : req.cookies.tokenUser,
    delete : false,
    status : 'active'
  }).select("-password");

  if (user){
    res.locals.user = user;
  }
  next();
};
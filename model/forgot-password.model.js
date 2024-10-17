const mongoose = require('mongoose');

const forgotPasswordSchema = new mongoose.Schema(
{
  email : String,
  otp : String,
  expireAt : {
    type : Date,
    // expires : 24 * 60 * 60 * 1000,  // 24 hours * 60 minutes * 60 seconds * 1000 milliseconds = 86,400,000 milliseconds or 24 hours
    expires : 1,
  },  // token expires after 24 hours
},{
  timestamps : true, 
})

const ForgotPassword = mongoose.model("ForgotPassword",forgotPasswordSchema,"forgot-password");

module.exports = ForgotPassword;
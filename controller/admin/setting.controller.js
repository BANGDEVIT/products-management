const SettingGeneral = require('../../model/settingGeneral.model');

//[GET] /admin/settings/general
module.exports.general = async(req,res) =>{
  const settingGeneral = await SettingGeneral.findOne({});

  res.render("admin/pages/setting/general.pug",{
    pageTitle : "Cài đặt chung",
    settingGeneral : settingGeneral
  })
}

//[PATCH] /admin/settings/general
module.exports.generalPatch = async(req,res) =>{
  if (req.file){
    req.body.logo =`/uploads/${req.file.filename}`;
  }
  const settingGeneral = await SettingGeneral.findOne({});

  if (settingGeneral){
    await SettingGeneral.updateOne(
      {},
      req.body
    );
    req.flash("success","Cập nhật thành công")
    res.redirect('back')
  }else{
    const gettingGeneral = new SettingGeneral(req.body);
    await gettingGeneral.save();
    req.flash("success","Cài đặt thành công")
    res.redirect('back')
  }

}
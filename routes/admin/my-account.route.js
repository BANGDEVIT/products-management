const express = require('express');
const route = express.Router();
const multer  = require('multer');
const storageMulter = require('../../helpers/storageMulter');
const upload = multer({ storage : storageMulter() });

const controller = require('../../controller/admin/my-account.controller');

route.get("/",controller.index);

route.get("/edit",controller.edit);

route.patch("/edit",upload.single('avatar'),controller.editPatch);

module.exports = route; 
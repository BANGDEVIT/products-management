const express = require('express');
const route = express.Router();
const multer  = require('multer');
const storageMulter = require('../../helpers/storageMulter');
const upload = multer({ storage : storageMulter() });

const controller = require("../../controller/admin/setting.controller")

route.get('/general',controller.general)

route.patch('/general',upload.single('logo'),controller.generalPatch)

module.exports = route; 
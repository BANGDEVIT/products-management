const express = require('express');
const route = express.Router();
const multer  = require('multer');
const storageMulter = require('../../helpers/storageMulter');
const upload = multer({ storage : storageMulter() });

const controller = require("../../controller/admin/account.controller")

const validate = require("../../validates/admin/account.validate");

route.get('/',controller.index)

route.get('/create',controller.create)

route.post('/create',upload.single('avatar'),validate.createPost,controller.createPost)

module.exports = route;
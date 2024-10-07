const express = require('express');
const route = express.Router();
const multer  = require('multer');
const storageMulter = require('../../helpers/storageMulter');
const upload = multer({ storage : storageMulter() });

const validate = require("../../validates/admin/products-category.validate");

const controller = require("../../controller/admin/products-category.controller");

route.get('/',controller.index);

route.get('/create',controller.create);

route.post('/create',upload.single('thumbnail'),validate.createPost,controller.createPost);


module.exports = route;
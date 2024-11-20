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

route.get('/edit/:id',controller.edit);

route.patch('/edit/:id',upload.single('thumbnail'),validate.createPost,controller.editPatch);

route.get('/detail/:id',controller.detail);

route.delete('/delete/:id',controller.deleteItem);

route.patch('/change-status/:status/:id',controller.changeStatus);

route.patch('/change-mutil',controller.changeMutil);  

module.exports = route;
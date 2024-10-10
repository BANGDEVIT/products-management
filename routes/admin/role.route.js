const express = require('express');
const route = express.Router();

const controller = require("../../controller/admin/role.controller")

route.get('/',controller.index)

route.get('/create',controller.create)

route.post('/create',controller.createPost)

route.get('/edit/:id',controller.edit)

route.patch('/edit/:id',controller.editPatch)

route.get('/permission',controller.permissions)

route.patch('/permission',controller.permissionsPatch)

module.exports = route; 
const express = require('express');

const route = express.Router();

const controller = require("../../controller/admin/checkout.controller")

route.get('/',controller.checkout)

module.exports = route;
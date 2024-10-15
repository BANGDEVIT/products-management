const express = require('express');
const controller = require('../../controller/client/products.controller')

const router = express.Router();

router.get("/",controller.index);

router.get("/:slugCategory",controller.category);

router.get("/detail/:slugProduct",controller.detail);

module.exports = router;
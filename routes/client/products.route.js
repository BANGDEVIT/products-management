const express = require('express');
const controller = require('../../controller/client/products.controller')

const router = express.Router();

router.get("/",controller.index);

router.get("/:slug",controller.detail);

module.exports = router;
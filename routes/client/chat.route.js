const express = require('express');
const router = express.Router();
const chatMiddleware = require('../../middlewares/client/chat.middleware.js')
const controller = require('../../controller/client/chat.controller');

// router.get('/', controller.index)

router.get('/:roomChatId',chatMiddleware.isAccess, controller.index)

module.exports = router;
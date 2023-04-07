const express = require('express');

const router = express.Router();

const replyController = require('../controllers/reply.controller')

router.use(express.json());

router.get('/reply', replyController.getAll);

router.get('/reply/:id', replyController.getReply);

router.post('/reply', replyController.publish);

router.put('/reply/:id', replyController.update);

router.delete('/reply/:id', replyController.remove);

module.exports = router;
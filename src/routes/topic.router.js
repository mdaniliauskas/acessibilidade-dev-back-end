const express = require('express');

const router = express.Router();

const topicController = require('../controllers/topic.controller')

router.use(express.json());

router.get('/topic', topicController.getAll);

router.get('/topic/:id', topicController.getTopic);

router.get('/topic/fullSearch/:content', topicController.getFullSearch);

router.post('/topic', topicController.publish);

router.put('/topic/:id', topicController.update);

router.delete('/topic/:id', topicController.remove);

module.exports = router;
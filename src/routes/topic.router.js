const express = require('express');

const router = express.Router();

const topicController = require('../controllers/topic.controller')

router.use(express.json());

router.get('/topic', topicController.getAll);

router.get('/topic/:id', topicController.getTopic);

router.get('/topic/fullSearch/:content', topicController.getFullSearch);

router.get('/topic/categorySearch/:categoryId', topicController.getByCategory);

router.get('/topic/authorSearch/:authorId', topicController.getByAuthor);

router.post('/topic', topicController.publish);

router.put('/topic/:id', topicController.update);

router.put('/topic/:id/votes', topicController.updateVotes);

router.delete('/topic/:id', topicController.remove);

module.exports = router;
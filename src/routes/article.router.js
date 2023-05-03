const express = require('express');

const router = express.Router();

const articleController = require('../controllers/article.controller')

router.use(express.json());

router.get('/article', articleController.getAll);

router.get('/article/:id', articleController.getArticle);

router.post('/article', articleController.publish);

router.put('/article/:id', articleController.update);

router.delete('/article/:id', articleController.remove);

module.exports = router;
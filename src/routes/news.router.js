const express = require('express');

const router = express.Router();

const newsController = require('../controllers/news.controller')

router.use(express.json());

router.get('/news', newsController.getAll);

router.get('/news/:id', newsController.getNews);

router.get('/news/fullSearch/:content', newsController.getFullSearch);

router.post('/news', newsController.publish);

router.put('/news/:id', newsController.update);

router.delete('/news/:id', newsController.remove);

module.exports = router;
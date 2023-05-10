const express = require('express');

const router = express.Router();

const toolController = require('../controllers/tool.controller')

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.use(express.json());

router.get('/tool', toolController.getAll);

router.get('/tool/:id', toolController.getTool);

router.get('/tool/fullSearch/:content', toolController.getFullSearch);

router.get('/tool/categorySearch/:categoryId', toolController.getByCategory);

router.post('/tool', upload.single('image'), toolController.publish);

router.put('/tool/:id', toolController.update);

router.delete('/tool/:id', toolController.remove);

module.exports = router;
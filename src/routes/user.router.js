const express = require('express');

const router = express.Router();

const userController = require('../controllers/user.controller')

router.use(express.json());


router.post('/user/signup', userController.signup);

router.post('/user/signin', userController.signin);

router.get('/user/:id', userController.getUser);

router.get('/user', userController.getAll);

router.put('/user/:id', userController.update);

router.delete('/user/:id', userController.remove);

module.exports = router;
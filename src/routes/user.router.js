//rotas do site principal
const express = require('express');

//Definição de rotas (caminhos que o usuário irá seguir)
const router = express.Router();

const userController = require('../controllers/user.controller')

router.use(express.json());

//create
router.post('/user/register', userController.signup);

router.post('/user/login', userController.signin);


router.get('/user/:codigo_usuario', userController.getUser);

//read
router.get('/user', userController.getAll);

//update
router.put('/user/:codigo_usuario', userController.update);

//delete
router.delete('/user/:codigo_usuario', userController.remove);

module.exports = router;
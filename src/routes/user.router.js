//rotas do site principal
const express = require('express');

//Definição de rotas (caminhos que o usuário irá seguir)
const router = express.Router(); 

const userController = require('../controllers/user.controller')

router.use(express.json());

//create
router.post('/user/register', userController.signup);

router.post('/user/login', userController.signin);


router.get('/user/:id', userController.getUser);

//read
router.get('/user');

//update
router.put('/user');

//delete
router.delete('/user/:id', userController.remove);

module.exports = router;
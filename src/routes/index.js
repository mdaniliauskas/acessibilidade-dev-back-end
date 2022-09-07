//rotas do site principal
const express = require('express');

//Definição de rotas (caminhos que o usuário irá seguir)
const router = express.Router(); 

//create
router.post('/user');

//read
router.get('/user');

//update
router.put('/user');

//delete
router.delete('user');
//Chamada do express
const express = require('express');
//chamada das rotas somente do usuário
const router = require('./routes/index.js');

const app = express();

// app.use('/', router);

module.exports = app ;
//Chamada do express
const express = require('express');
//chamada das rotas somente do usuário
const userRoutes = require('./routes/user.router');


const app = express();

app.use(userRoutes);

module.exports = app ;
const express = require('express');
const userRoutes = require('./routes/user.router');
var cors = require('cors')
const app = express();

app.use(cors())

app.use(userRoutes);

module.exports = app ;
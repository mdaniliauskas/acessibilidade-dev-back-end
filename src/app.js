const express = require('express');
const userRoutes = require('./routes/user.router');
const topicRoutes = require('./routes/topic.router');
var cors = require('cors');
const app = express();

app.use(cors())

app.use(userRoutes, topicRoutes);

module.exports = app ;
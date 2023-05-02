const express = require('express');
const userRoutes = require('./routes/user.router');
const topicRoutes = require('./routes/topic.router');
const newsRoutes = require('./routes/news.router');
const replyRoutes = require('./routes/reply.router');
const toolRoutes = require('./routes/tool.router');
var cors = require('cors');
const app = express();

app.use(cors())

app.use(userRoutes, topicRoutes, newsRoutes, replyRoutes, toolRoutes);

module.exports = app;
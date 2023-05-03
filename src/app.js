const express = require('express');
const userRoutes = require('./routes/user.router');
const topicRoutes = require('./routes/topic.router');
const newsRoutes = require('./routes/news.router');
const replyRoutes = require('./routes/reply.router');
const toolRoutes = require('./routes/tool.router');
const articleRoutes = require('./routes/article.router');
var cors = require('cors');
const app = express();

app.use(cors())

app.use(userRoutes, topicRoutes, newsRoutes, replyRoutes, toolRoutes, articleRoutes);

module.exports = app;
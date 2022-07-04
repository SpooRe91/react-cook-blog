const express = require('express');
const { PORT } = require('./config/env');
const dbService = require('./config/mongoseConfig');
const { auth } = require('./middlewares/authMiddleware');
const { errorHandler } = require('./middlewares/errorHandlerMiddleware');

const app = express();

dbService.connecter();
require('./config/cookieParserConfig')(app);//cookie parser
require('./config/sessionConfig')(app);//express-session
require('./config/handlebarsConfig')(app);//handlebars config
app.use(auth);//auth middleware
require('./config/expressConfig')(app);//express config
app.use(errorHandler)//error handler

app.listen(PORT, console.log(`Listening on port http://localhost:${PORT}`));
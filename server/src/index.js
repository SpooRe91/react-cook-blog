const express = require('express');
const { PORT } = require('./config/env');
const dbService = require('./config/mongoseConfig');
const { auth } = require('./middlewares/authMiddleware');
const { errorHandler } = require('./middlewares/errorHandlerMiddleware');
const cors = require('./middlewares/corsMiddleware');
const app = express();

dbService.connecter();
require('./config/cookieParserConfig')(app);//cookie parser
app.use(cors());
app.use(auth);//auth middleware
require('./config/expressConfig')(app);//express config
app.use(errorHandler)//error handler

app.listen(PORT, console.log(`"Cook-blog API" listening to port http://localhost:${PORT}`), console.log(`"Cook-blog API" documentation is available at http://localhost:${PORT}/readme`));
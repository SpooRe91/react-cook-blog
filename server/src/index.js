const express = require('express');
// const { PORT } = require('./config/env');
const dbService = require('./config/mongoseConfig');
const { auth } = require('./middlewares/authMiddleware');
const { errorHandler } = require('./middlewares/errorHandlerMiddleware');
const cors = require('./middlewares/corsMiddleware');
const app = express();
const currPort = process.env.PORT || 3030;

dbService.connecter();
require('./config/cookieParserConfig')(app);//cookie parser
app.use(cors());
app.use(auth);//auth middleware
require('./config/expressConfig')(app);//express config
app.use(errorHandler)//error handler

app.listen(currPort, (error) => {
    if (error) {
        console.log(error.message);
    }
    console.log(`"Cook-blog API" listening to port http://localhost:${currPort}`);
    console.log(`"Cook-blog" React APP and REST API documentation is available at: https://github.com/SpooRe91/react-js-project-final/blob/main/Cook-Blog-readme.md`);
});
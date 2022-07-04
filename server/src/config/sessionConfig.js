const expressEssion = require('express-session');
const { secret } = require('./env')
module.exports = (app) => {
    app.use(expressEssion({
        secret,
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }
    }))
};
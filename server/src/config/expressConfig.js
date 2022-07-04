const express = require('express');
const routes = require('../routes');

module.exports = (app) => {
    app.use('/static', express.static('public'));
    app.use(express.urlencoded({ extended: false }));//this allows the forms and search params to be displayed
    app.use(routes);
}
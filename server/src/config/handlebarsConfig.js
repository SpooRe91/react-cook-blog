const handlebars = require('express-handlebars');

module.exports = (app) => {
    app.engine('hbs', handlebars.engine({
        extname: "hbs"
    }));

    app.set('view engine', 'hbs');
    app.set('views', './src/views');//if the views folder is not a top level folder
}
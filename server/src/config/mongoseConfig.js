const mongoose = require('mongoose');
const { DB_QUERY_STRING } = require('./env');


exports.connecter = () => {
    mongoose.connection.on('open', () => console.log('DB connected'));
    return mongoose.connect(DB_QUERY_STRING)
};
//or this below
//     .then(() => {
//     console.log('DB connected');
// })
//     .catch((err) => {
//         console.log('DB error', err);
//     });


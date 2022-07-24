const mongoose = require('mongoose');
const { DB_QUERY_STRING } = require('./env');


exports.connecter = async () => {
    try {
        mongoose.connection.on('open', () => console.log('DB connected'));
        return mongoose.connect(DB_QUERY_STRING);
    } catch (error) {
        console.log('Error connecting to database');
        return process.exit(1);
    }
};

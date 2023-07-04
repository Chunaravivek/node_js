const mongoose = require('mongoose');

const { LOCAL_DB, NODE_ENV } = process.env;

module.exports = function (logger) {
    let db;
    if (NODE_ENV == 'development') {
        db = LOCAL_DB;
    }
    mongoose.connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(
        () => logger.info(`Connected to ${NODE_ENV} DB...`)
    );
}
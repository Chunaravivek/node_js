require('express-async-errors');
module.exports = function (err, req, res, next) {
    console.log(err);
    if (err.name == 'ValidationError') {
        return res.status(422).json(err.message);
    } else if (err.name === 'UnauthorizedError') {
        res.status(401).json('Unauthorized Request');
    } else if (err.code == 'EBADCSRFTOKEN') {
        res.status(403).json('CSRF Token Issue');
    } else {
        console.log(err);
        return res.status(500).json(err.message);
    }
}
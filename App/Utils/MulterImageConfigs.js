const multer = require("multer");
const shortid = require('shortid');
const mime = require('mime-types');
const path = require('path');

let location = 'public/upload/';
const imgStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, location)
    },
    filename: (req, file, cb) => {
        let id = shortid.generate() + '_' + Date.now();
        let ext = mime.extension(file.mimetype);
        cb(null, `${id}.${ext}`);
    }
});

const imgFileFilter = (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/; // Allowed ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
        return cb(null, true);
    } else {
        return cb(new Error('Only images allowed'));
    }
}

module.exports = { imgStorage, imgFileFilter }; 
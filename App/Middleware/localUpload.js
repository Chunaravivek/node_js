const multer = require("multer");
const { imgStorage, imgFileFilter } = require('../Utils/MulterImageConfigs');

exports.localUpload = async (req, res, next) => {
    storageConfig = imgStorage;
    fileFilterConfig = imgFileFilter;
    field_name = 'avatar';

    const upload = multer({
        storage: storageConfig,
        fileFilter: fileFilterConfig,
    }).single(field_name);

    upload(req, res, (err) => {
        if (req.fileValidationError) {
            return res.status(400).json(req.fileValidationError);
        }
        else if (err) {
            return res.status(400).json('Invalid File: This file not allowed!');
        }
        else if (!req.file) {
            return res.status(400).json('Plase select a valid file to upload!');
        }
        else {
            const avatar_filename = req.file.filename.replace(/\.[^/.]+$/, ""); //remove extenstion
        }
        next();
    });
}

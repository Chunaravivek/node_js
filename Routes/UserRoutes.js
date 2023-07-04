const express = require('express');
const router = express.Router();
const {localUpload} = require('../App/Middleware/localUpload');
const {register, login, ValidateBody, ValidateLogin} = require('../App/Controllers/UsersControllers');

router.route('/register')
.post(localUpload, ValidateBody, register);

router.route('/login')
.post(ValidateLogin, login);

module.exports = router;
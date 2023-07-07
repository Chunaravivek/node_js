const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../App/Middleware/auth/index');
const {ValidateBody, getrecords, create_one, get_all, get_one, update_one, delete_one} = require('../App/Controllers/AccountControllers');

router.route('/get_records')
.get(authenticateToken, getrecords);

router.route('/create_one')
.post(authenticateToken, ValidateBody, create_one);

router.route('/get_all')
.get(authenticateToken, get_all);

router.route('/get_one/:id')
.get(authenticateToken, get_one);

router.route('/update_one')
.post(authenticateToken, update_one);

router.route('/delete_one/:id')
.get(authenticateToken, delete_one);

module.exports = router;
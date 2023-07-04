const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../App/Middleware/auth/index');
const {index} = require('../App/Controllers/DashboardControllers');

router.route('/index')
.get(authenticateToken, index);

module.exports = router;
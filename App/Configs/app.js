const express = require('express');
const helmet = require("helmet");
const cookie = require('cookie');
const cookieParser = require('cookie-parser');
const compress = require('compression');
const fs = require('fs');
const morgan = require('morgan');
const cors = require('cors');
const favicon = require('serve-favicon');
const path = require('path');

const UserRoutes = require('../../Routes/UserRoutes');
const DashboardRoutes = require('../../Routes/DashboardRoutes');
const AccountRoutes = require('../../Routes/AccountRoutes');
const ApplicationRoutes = require('../../Routes/ApplicationRoutes');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../../public/api-docs/swagger');

const errorHandler = require('../Middleware/error');

const app = express();

app.use('/v2/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(cors());
app.use(cookieParser());
app.use(morgan());
app.use(helmet());
app.use(compress());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));
app.use(favicon(path.join(__dirname, '../../public/favicon.ico')))

app.get('/api', async (req, res) => {
    res.status(200).send(`Welcome to S4apps Panel`);
});

app.use('/v1/admin', UserRoutes);
app.use('/v1/admin/dashboard', DashboardRoutes);
app.use('/v1/admin/accounts', AccountRoutes);
app.use('/v1/admin/applications', ApplicationRoutes);

app.use(errorHandler);

module.exports = app;
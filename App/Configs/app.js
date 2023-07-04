const express = require('express');

const UserRoutes = require('../../Routes/UserRoutes');
const DashboardRoutes = require('../../Routes/DashboardRoutes');
const AccountRoutes = require('../../Routes/AccountRoutes');
const ApplicationRoutes = require('../../Routes/ApplicationRoutes');
const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/api', async (req, res) => {
    res.status(200).send(`Welcome to S4apps Panel`);
});

app.use('/v1/admin', UserRoutes);
app.use('/v1/admin/dashboard', DashboardRoutes);
app.use('/v1/admin/accounts', AccountRoutes);
app.use('/v1/admin/applications', ApplicationRoutes);

module.exports = app;
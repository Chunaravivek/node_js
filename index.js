require('dotenv').config();

// Call logger to log errors
const logger = require('./App/Configs/logging').logger;

require('./App/Configs/database')(logger);

const app = require('./App/Configs/app');

//START SERVER
if (process.env.NODE_ENV == "development") {
    port = 3000;
} else {
    port = process.env.PORT;
}

const server = app.listen(port, () => {
    logger.info(`App running on port ${port}...`);
});
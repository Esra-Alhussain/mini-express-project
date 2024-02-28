const date = require('date-and-time');
const now = new Date();
date.format(now, 'YYY/MM/DD HH:mm:ss');

//logger middleware
const logger = (req, res, next) => {
    console.log(` Incoming request ${req.method} sent to localhost:3001/${req.url} at ${now}`);
    next();
};

module.exports = {
    logger,
};
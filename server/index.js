const express = require('express');
const logger = require('./config/logger');

const api = require('./api/v1');

const app = express();

app.use(logger.request);
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Server runs',
  });
});

app.use('/api', api); // update to the latest version
app.use('/api/v1', api); // access the specified version

app.use((req, res, next) => {
  next({
    statusCode: 404,
    message: 'Route Not found',
  });
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message = '', level = 'error' } = err;

  logger[level](message);

  res.status(statusCode);
  res.json({
    message,
  });
});

module.exports = app;

const mongoose = require('mongoose');
const { logger } = require('./config/logger');

exports.connect = function ({
  protocol = 'mongodb',
  url = '',
  username = '',
  password = '',
}) {
  let dburl = '';

  if (username !== '' && password !== '') {
    dburl = `${protocol}://${username}:${password}@${url}`;
  } else {
    dburl = `${protocol}://${url}`;
  }

  mongoose.connect(dburl);
};

exports.disconnect = function () {
  mongoose.connection.close(() => {
    console.log('Database disconnected');
  });
};

mongoose.connection.on('open', (err) => {
  console.log('Database connected');
});

mongoose.connection.on('close', (err) => {
  console.log('Database disconnected');
});

mongoose.connection.on('error', (err) => {
  logger.error(`Database error: ${err}`);
});

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Database disconnected');
  });
});

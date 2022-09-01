const winston = require('winston');
const morgan = require('morgan');

const logger = winston.createLogger({
  //  format: winston.format.simple(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: '../../logs/error.log',
      level: 'error',
    }),
  ],
});

const request = morgan('combined', {
  stream: {
    write(message) {
      logger.http(message);
    },
  },
});

logger.request = request;

module.exports = logger;

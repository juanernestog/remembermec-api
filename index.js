const http = require('http');
const app = require('./server');

const config = require('./server/config');

const server = http.createServer(app);

server.listen(config.port, () => {
  console.log(`Listening on ${config.port}`);
});

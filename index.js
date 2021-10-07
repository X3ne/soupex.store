const { createServer } = require('./src/server');
const config = require('./src/util/config');
const logger = require('./src/util/logger');

const server = createServer();

server.listen(config.PORT, () => {
  logger.info(`Server running at http://localhost:${config.PORT}`);
});

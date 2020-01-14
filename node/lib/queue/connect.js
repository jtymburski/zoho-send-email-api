const redis = require('redis');

module.exports = {
  connectAsync: connectAsync,
}

// EXPORTS

/**
 * Connects asynchronously to the configured redis client
 * @param config express app configuration object
 * @return the redis client object
 */
function connectAsync(config) {
  return new Promise((resolve, reject) => {
    const client = redis.createClient({
      host: config.queueHost,
      socket_keepalive: true,
    })

    let initialResponse = true;

    client.on('connect', () => {
      logger.log('info', `Connected to redis host client: ${config.queueHost}`);
    })
    .on('ready', () => {
      logger.log('info', 'Redis host client is ready to process events');

      if (initialResponse) {
        initialResponse = false;
        resolve(client);
      }
    })
    .on('reconnecting', (info) => {
      logger.log('info', `Redis host client is reconnecting with attempt ` +
                         `#${info.attempt} after a delay of ${info.delay} ms`);
    })
    .on('error', (err) => {
      logger.log('error', `Redis host client error during operation: ${err}`);

      if (initialResponse) {
        initialResponse = false;
        reject(err);
      }
    })
    .on('end', () => {
      logger.log('info', 'Ended connection with redis host client');
    });
  });
}

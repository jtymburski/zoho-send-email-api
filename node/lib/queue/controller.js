const REQUEST_POOL = "RequestPool";

let RedisClient = null;

module.exports = (app) => {
  if (!app) throw new Error('Missing parameter: \'app\' not provided');

  RedisClient = app.redisClient;

  return {
    addRequest: addRequest,
  }
};

// EXPORTS

/**
 * Adds a request id to the pool of ids that will be processed. The function is asynchronous but
 * does not wait for a successful response from the Redis client.
 * @param id request identifier
 * @return promise execution
 */
function addRequest(id) {
  return new Promise((resolve, reject) => {
    RedisClient.lpush(REQUEST_POOL, id);
    resolve();
  });
}

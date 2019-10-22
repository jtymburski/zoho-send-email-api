module.exports = (env) => {
  const config = getConfig(env);
  return {
    apiKey: config.apiKey,
    env: config.env,
    queueHost: process.env.QUEUE_HOST || '127.0.0.1',
  };
};

function getConfig(env) {
  switch (env) {
    case 'test':
      return require('./test');
    case 'prod':
      return require('./prod');
    case 'dev':
      /* falls through */
    default:
      return require('./dev');
  }
}

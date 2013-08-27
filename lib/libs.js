// Load all promise impls
module.exports = {
  when: require('./adapters/when'),
  avow: require('./adapters/avow'),
  q: require('./adapters/q'),
  deferred: require('./adapters/deferred'),
  jquery: require('./adapters/jquery'),
  laissez: require('./adapters/laissez-faire'),
  concurrent: require('./adapters/concurrent')
};
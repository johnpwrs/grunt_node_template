var configs = require('./configs.json');
var _ = require('lodash');

function getEnv() {
  return process.env.APPLICATION_ENV || 'development';
}

function getConfig(tier) {
  return _.cloneDeep(configs[tier]);
}

function getConfigs(env) {
  var otherTiers = getTiers(env || getEnv());
  var cfgs = _.cloneDeep(configs[env || getEnv()] || {});

  _.forEach(otherTiers, function(tier) {
    cfgs = _.cloneDeep(_.assign(getConfig(tier), cfgs));
  });

  return cfgs;
}

module.exports.configs = configs;
module.exports.get = getConfigs;
module.exports.getConfig = getConfig;

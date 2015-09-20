var configs = require('./configs.json');
var _ = require('lodash');

/**
 * @return APPLICATION_ENV. The server environment
 * defaults to 'development'
 */
function getEnv() {
  return process.env.APPLICATION_ENV || 'development';
}

/**
 * Return the configuration for the specified tier
 */
function getConfig(tier) {
  return _.cloneDeep(configs[tier]);
}

/**
 * Return the appropriate configurations for the current environment.
 * Inheritance takes place here, any properties existing in higher
 * tiers will be automatically included in lower tiers if they aren't defined
 * already.
 */
function getConfigs(env) {
  var otherTiers = getTiers(env || getEnv());
  var cfgs = _.cloneDeep(configs[env || getEnv()] || {});

  //merge higher tiers with current config
  _.forEach(otherTiers, function(tier) {
    cfgs = _.cloneDeep(_.assign(getConfig(tier), cfgs));
  });

  return cfgs;
}

module.exports.configs = configs;
module.exports.get = getConfigs;
module.exports.getConfig = getConfig;

const _defaultsDeep = require('lodash/defaultsDeep');

const defaultConfig = require('./defaultConfig.js');
const logger = require('../utils/logger');

const env = process.env.NODE_ENV || 'development';

let localConfig;
try {
  localConfig = require('./localConfig.js');
  console.log('\n\n');
  logger.info(`Config loaded from the localConfig.json file for '${env}' environment`);
} catch (err) {
  localConfig = {};
  logger.warn('There is no config/localConfig.json file');
}

const config = _defaultsDeep(localConfig, defaultConfig);

module.exports = config[env];

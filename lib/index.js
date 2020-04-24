const configureBasic = require('./basic/index');

const {configureRules} = require('./rules/index');

const {configureResolve} = require('./resolve/index');

const {configurePlugins} = require('./plugins/index');

const {configureOptimization} = require('./optimization/index');

/**
 * @param {import('webpack-chain')} config
 * @param {'none' | 'production' | 'development'} env
 * @param {import('yargs-parser').Arguments} args
 */
function getConfig(config, env, args) {

  for (const fn of [
    configureBasic,
    configureResolve,
    configureRules,
    configurePlugins,
    configureOptimization
  ]) {
    fn(config, env, args);
  }

}

module.exports = getConfig;

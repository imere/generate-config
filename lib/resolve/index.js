const {CMD} = require('../util/constant');

const extensions = require('./Extensions');
const tsPathsPlugin = require('./TsPathsPlugin');
const vue2Alias = require('./Vue2Alias');

/**
 * @param {import('webpack-chain')} config
 * @param {'none' | 'production' | 'development'} env
 * @param {import('yargs-parser').Arguments} args
 */
function configureResolve(config, env, args) {
  if (args[CMD.ts]) {
    tsPathsPlugin(config, env, args);
  }

  if (args[CMD.vue]) {
    vue2Alias(config, env, args);
  }

  for (const fn of [extensions]) {
    fn(config, env, args);
  }
}

module.exports = {configureResolve};

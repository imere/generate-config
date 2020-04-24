const {CMD} = require('../util/constant');

/**
 * @param {import('webpack-chain')} config
 * @param {'none' | 'production' | 'development'} env
 * @param {import('yargs-parser').Arguments} args
 */
function Extensions(config, _env, args) {
  const {extensions} = config.resolve;

  if (args[CMD.vue]) {
    extensions.add('vue');
  }

  if (args[CMD.ts]) {
    if (args[CMD.jsx]) {
      extensions.add('tsx');
    }
    extensions.add('ts');
  }

  extensions.add('mjs');

  if (args[CMD.jsx]) {
    extensions.add('jsx');
  }

  extensions.add('js');
  extensions.add('json');
}

module.exports = Extensions;

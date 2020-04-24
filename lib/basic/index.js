const {CMD} = require('../util/constant');

/**
 * @param {import('webpack-chain')} config
 * @param {'none' | 'production' | 'development'} env
 * @param {import('yargs-parser').Arguments} args
 */
function configureBasic(config, env, args) {
  const isProd = env === 'production';

  config.mode(env);

  config.stats(
    isProd
      ? 'errors-warnings'
      : 'normal'
  );

  if (isProd) {
    config.output.
      set('filename', 'assets/scripts/[name].[hash:5].js').
      set('hotUpdateChunkFilename', '[id].[hash].hot-update.js').
      set('pathinfo', false);
  } else {
    config.output.
      set('filename', 'assets/scripts/[name].js');
  }

  config.performance.hints(
    isProd
      ? false
      : 'warning'
  );

  config.externals();

  config.node.
    set('setImmediate', false).
    set('dgram', 'empty').
    set('fs', 'empty').
    set('net', 'empty').
    set('tls', 'empty').
    set('child_process', 'empty');

  config.
    entry('app').
    add(`./src/index.${args[CMD.ts] ? 'ts' : 'js'}`);
}

module.exports = configureBasic;

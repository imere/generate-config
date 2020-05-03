const { config } = require('../util/config');

const { CMD } = require('../util/constant');

function configureBasic() {
  const { chain, env, args } = config;

  const isProd = env === 'production';

  chain.mode(env);

  chain.stats(
    isProd
      ? 'errors-warnings'
      : 'normal'
  );

  if (isProd) {
    chain.output.
      set('filename', 'assets/scripts/[name].[hash:5].js').
      set('hotUpdateChunkFilename', '[id].[hash].hot-update.js').
      set('pathinfo', false);
  } else {
    chain.output.
      set('filename', 'assets/scripts/[name].js');
  }

  chain.performance.hints(
    isProd
      ? false
      : 'warning'
  );

  chain.externals();

  chain.node.
    set('setImmediate', false).
    set('dgram', 'empty').
    set('fs', 'empty').
    set('net', 'empty').
    set('tls', 'empty').
    set('child_process', 'empty');

  chain.
    entry('app').
    add(`./src/index.${args[CMD.ts] ? 'ts' : 'js'}`);
}

module.exports = configureBasic;

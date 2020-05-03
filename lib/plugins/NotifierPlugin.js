const { config } = require('../util/config');
const { depend } = require('../util/depend');

function notifierPlugin() {
  const { chain, env } = config;

  depend.addModule({
    value: 'webpack-build-notifier',
    alias: 'WebpackBuildNotifierPlugin'
  });

  chain.plugin('build-notifier').
    use(require('webpack-build-notifier'), [
      {
        title: env.toUpperCase(),
        showDuration: true,
        excludeWarnings: true,
        suppressSuccess: true
      }
    ]);
}

module.exports = notifierPlugin;


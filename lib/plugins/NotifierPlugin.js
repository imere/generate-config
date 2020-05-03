const { config } = require('../util/config');
const { depend } = require('../util/depend');

async function notifierPlugin() {
  const { chain, env } = config;

  await depend.
    addModule({
      value: 'webpack-build-notifier',
      alias: 'WebpackBuildNotifierPlugin'
    }).
    download();

  chain.plugin('webpack-build-notifier').
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


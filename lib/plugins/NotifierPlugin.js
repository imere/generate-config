const config = require('../util/config');
const { depend } = require('../util/depend');
const { pushImportModule } = require('../util/helper');

const BuildNotifier = require('webpack-build-notifier');

function notifierPlugin() {
  const { chain, env } = config;

  depend.addModule({
    value: 'webpack-build-notifier',
    alias: 'WebpackBuildNotifierPlugin'
  });

  chain.plugin('build-notifier').
    use(BuildNotifier, [
      {
        title: env.toUpperCase(),
        showDuration: true,
        excludeWarnings: true,
        suppressSuccess: true
      }
    ]);

  pushImportModule({
    value: 'webpack-build-notifier',
    alias: 'WebpackBuildNotifierPlugin'
  });
}

module.exports = notifierPlugin;


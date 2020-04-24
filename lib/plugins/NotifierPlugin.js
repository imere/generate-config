const {pushImportModule} = require('../util/helper');

const BuildNotifier = require('webpack-build-notifier');

/**
 * @param {import('webpack-chain')} config
 * @param {'none' | 'production' | 'development'} env
 * @param {import('yargs-parser').Arguments} args
 */
function notifierPlugin(config, env) {
  config.plugin('build-notifier').
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


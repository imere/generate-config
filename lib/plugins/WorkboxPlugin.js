const Workbox = require('workbox-webpack-plugin');

const {pushImportModule} = require('../util/helper');

/**
 * @param {import('webpack-chain')} config
 * @param {'none' | 'production' | 'development'} env
 * @param {import('yargs-parser').Arguments} args
 */
function workboxPlugin(config) {
  config.plugin('workbox').
    use(Workbox.GenerateSW, [
      {
        clientsClaim: true,
        skipWaiting: true
      }
    ]);

  pushImportModule({
    value: 'workbox-webpack-plugin',
    destructs: ['GenerateSW']
  });
}

module.exports = workboxPlugin;

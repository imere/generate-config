const config = require('../util/config');
const Workbox = require('workbox-webpack-plugin');

const { pushImportModule } = require('../util/helper');

function workboxPlugin() {
  config.chain.plugin('workbox').
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

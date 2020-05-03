const { config } = require('../util/config');
const { depend } = require('../util/depend');

async function workboxPlugin() {
  await depend.
    addModule({
      value: 'workbox-webpack-plugin',
      destructs: ['GenerateSW']
    }).
    download();

  config.chain.plugin('workbox-webpack-plugin').
    use(require('workbox-webpack-plugin').GenerateSW, [
      {
        clientsClaim: true,
        skipWaiting: true
      }
    ]);
}

module.exports = workboxPlugin;

const { config } = require('../util/config');
const { depend } = require('../util/depend');

function workboxPlugin() {
  depend.addModule({
    value: 'workbox-webpack-plugin',
    destructs: ['GenerateSW']
  });

  config.chain.plugin('workbox').
    use(require('workbox-webpack-plugin').GenerateSW, [
      {
        clientsClaim: true,
        skipWaiting: true
      }
    ]);
}

module.exports = workboxPlugin;

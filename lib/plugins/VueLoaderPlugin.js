const {pushImportModule} = require('../util/helper');

const {VueLoaderPlugin} = require('vue-loader');

/**
 * @param {import('webpack-chain')} config
 * @param {'none' | 'production' | 'development'} env
 * @param {import('yargs-parser').Arguments} args
 */
function vueLoaderPlugin(config) {
  config.plugin('vue-loader').
    use(VueLoaderPlugin);

  pushImportModule({
    value: 'vue-loader',
    destructs: ['VueLoaderPlugin']
  });
}

module.exports = vueLoaderPlugin;

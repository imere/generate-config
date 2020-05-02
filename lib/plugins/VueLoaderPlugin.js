const config = require('../util/config');
const { pushImportModule } = require('../util/helper');

const { VueLoaderPlugin } = require('vue-loader');

function vueLoaderPlugin() {
  config.chain.plugin('vue-loader').
    use(VueLoaderPlugin);

  pushImportModule({
    value: 'vue-loader',
    destructs: ['VueLoaderPlugin']
  });
}

module.exports = vueLoaderPlugin;

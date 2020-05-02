const config = require('../util/config');
const { depend } = require('../util/depend');
const { pushImportModule } = require('../util/helper');

const { VueLoaderPlugin } = require('vue-loader');

function vueLoaderPlugin() {
  depend.addModule({
    value: 'vue-loader',
    destructs: ['VueLoaderPlugin']
  });

  config.chain.plugin('vue-loader').
    use(VueLoaderPlugin);

  pushImportModule({
    value: 'vue-loader',
    destructs: ['VueLoaderPlugin']
  });
}

module.exports = vueLoaderPlugin;

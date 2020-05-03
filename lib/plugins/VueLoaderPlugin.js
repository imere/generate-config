const { config } = require('../util/config');
const { depend } = require('../util/depend');

function vueLoaderPlugin() {
  depend.addModule({
    value: 'vue-loader',
    destructs: ['VueLoaderPlugin']
  });

  config.chain.plugin('vue-loader').
    use(require('vue-loader').VueLoaderPlugin);
}

module.exports = vueLoaderPlugin;

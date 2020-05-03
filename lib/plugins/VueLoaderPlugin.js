const { config } = require('../util/config');
const { depend } = require('../util/depend');

async function vueLoaderPlugin() {
  await depend.
    addModule({
      value: 'vue-loader',
      destructs: ['VueLoaderPlugin']
    }).
    download();

  config.chain.plugin('vue-loader-plugin').
    use(require('vue-loader').VueLoaderPlugin);
}

module.exports = vueLoaderPlugin;

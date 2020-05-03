const { config } = require('../util/config');

function Vue2Alias() {
  config.chain.resolve.alias.
    set('vue$', 'vue/dist/vue.esm.js');

}

module.exports = Vue2Alias;

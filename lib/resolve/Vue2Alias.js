/**
 * @param {import('webpack-chain')} config
 * @param {'none' | 'production' | 'development'} env
 * @param {import('yargs-parser').Arguments} args
 */
function TsPathsPlugin(config) {
  config.resolve.alias.
    set('vue$', 'vue/dist/vue.esm.js');

}

module.exports = TsPathsPlugin;

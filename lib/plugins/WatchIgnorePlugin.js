const webpack = require('webpack');

const {pushImportModule} = require('../util/helper');

/**
 * @param {import('webpack-chain')} config
 * @param {'none' | 'production' | 'development'} env
 * @param {import('yargs-parser').Arguments} args
 */
function watchIgnorePlugin(config) {
  config.plugin('watch-ignore').
    use(webpack.WatchIgnorePlugin, [[/\.d\.tsx?$/u]]);

  pushImportModule({
    value: 'webpack',
    destructs: ['WatchIgnorePlugin']
  });
}

module.exports = watchIgnorePlugin;

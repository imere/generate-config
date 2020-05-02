const config = require('../util/config');
const webpack = require('webpack');

const { pushImportModule } = require('../util/helper');

function watchIgnorePlugin() {
  config.chain.plugin('watch-ignore').
    use(webpack.WatchIgnorePlugin, [[/\.d\.tsx?$/u]]);

  pushImportModule({
    value: 'webpack',
    destructs: ['WatchIgnorePlugin']
  });
}

module.exports = watchIgnorePlugin;

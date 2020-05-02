const config = require('../util/config');
const { depend } = require('../util/depend');
const webpack = require('webpack');

const { pushImportModule } = require('../util/helper');

function watchIgnorePlugin() {
  depend.addModule({
    value: 'webpack',
    destructs: ['WatchIgnorePlugin']
  });

  config.chain.plugin('watch-ignore').
    use(webpack.WatchIgnorePlugin, [[/\.d\.tsx?$/u]]);

  pushImportModule({
    value: 'webpack',
    destructs: ['WatchIgnorePlugin']
  });
}

module.exports = watchIgnorePlugin;

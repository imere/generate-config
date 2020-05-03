const { config } = require('../util/config');
const { depend } = require('../util/depend');

function watchIgnorePlugin() {
  depend.addModule({
    value: 'webpack',
    destructs: ['WatchIgnorePlugin']
  });

  config.chain.plugin('watch-ignore').
    use(require('webpack').WatchIgnorePlugin, [[/\.d\.tsx?$/u]]);
}

module.exports = watchIgnorePlugin;

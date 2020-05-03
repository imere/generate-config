const { config } = require('../util/config');
const { depend } = require('../util/depend');

async function watchIgnorePlugin() {
  await depend.
    addModule({
      value: 'webpack',
      destructs: ['WatchIgnorePlugin']
    }).
    download();

  config.chain.plugin('watch-ignore-plugin').
    use(require('webpack').WatchIgnorePlugin, [[/\.d\.tsx?$/u]]);
}

module.exports = watchIgnorePlugin;

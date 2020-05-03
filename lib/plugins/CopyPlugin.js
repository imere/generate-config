const { config } = require('../util/config');
const { depend } = require('../util/depend');

async function copyPlugin() {
  await depend.
    addModule({
      value: 'copy-webpack-plugin',
      alias: 'CopyPlugin'
    }).
    download();

  config.chain.plugin('copy-webpack-plugin').
    use(require('copy-webpack-plugin'), [
      [
        {
          from: './src/public/robots.txt',
          to: '.'
        },
        {
          from: './src/public/*.png',
          to: '.',
          flatten: true
        }
      ]
    ]);
}

module.exports = copyPlugin;

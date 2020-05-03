const { config } = require('../util/config');
const { depend } = require('../util/depend');

const Copy = require('copy-webpack-plugin');

function copyPlugin() {
  depend.addModule({
    value: 'copy-webpack-plugin',
    alias: 'CopyPlugin'
  });

  config.chain.plugin('copy').
    use(Copy, [
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

const config = require('../util/config');
const { depend } = require('../util/depend');
const { pushImportModule } = require('../util/helper');

const TerserWebpackPlugin = require('terser-webpack-plugin');

function TerserPlugin() {
  const { chain, env } = config;

  const isProd = env === 'production';

  depend.addModule({
    value: 'terser-webpack-plugin',
    alias: 'TerserPlugin'
  });

  chain.optimization.minimizer('terser').
    use(TerserWebpackPlugin, [
      {
        terserOptions: {
          output: {
            comments: !isProd
          }
        },
        extractComments: !isProd
      }
    ]);

  pushImportModule({
    value: 'terser-webpack-plugin',
    alias: 'TerserPlugin'
  });
}

module.exports = TerserPlugin;

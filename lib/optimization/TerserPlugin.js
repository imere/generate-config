const { config } = require('../util/config');
const { depend } = require('../util/depend');

async function TerserPlugin() {
  const { chain, env } = config;

  const isProd = env === 'production';

  await depend.
    addModule({
      value: 'terser-webpack-plugin',
      alias: 'TerserPlugin'
    }).
    download();

  chain.optimization.minimizer('terser-webpack-plugin').
    use(require('terser-webpack-plugin'), [
      {
        terserOptions: {
          output: {
            comments: !isProd
          }
        },
        extractComments: !isProd
      }
    ]);
}

module.exports = TerserPlugin;

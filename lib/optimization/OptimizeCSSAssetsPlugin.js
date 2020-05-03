const { config } = require('../util/config');
const { depend } = require('../util/depend');

async function optimizeCSSPlugin() {
  const { chain, env } = config;

  const isProd = env === 'production';

  await depend.
    addModule('optimize-css-assets-webpack-plugin').
    download();

  chain.optimization.minimizer('optimize-css-assets-webpack-plugin').
    use(require('optimize-css-assets-webpack-plugin'), [
      {
        assetNameRegExp: /\.css$/u,
        cssProcessor: require('cssnano'),
        cssProcessorPluginOptions: {
          preset: [
            'default',
            {
              discardComments: {
                removeAll: isProd
              }
            }
          ]
        },
        canPrint: !isProd
      }
    ]);
}

module.exports = optimizeCSSPlugin;

/**
 * @param {import('webpack-chain')} config
 * @param {'none' | 'production' | 'development'} env
 * @param {import('yargs-parser').Arguments} args
 */
function fontLoader(config, env) {
  const rule = config.module.
    rule('font').
    test(/\.(woff2?|eot|ttf|otf)(\?.*)?$/u);

  rule.use('url').
    loader('url-loader').
    options({
      limit: 10000,
      name:
        env === 'production'
          ? 'fonts/[name].[contenthash:5].[ext]'
          : 'fonts/[name].[ext]'
    }).
    end();
}

module.exports = fontLoader;

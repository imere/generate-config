const config = require('../util/config');

function fontLoader() {
  const { chain, env } = config;

  const rule = chain.module.
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

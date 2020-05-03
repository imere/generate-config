const { config } = require('../util/config');
const { depend } = require('../util/depend');

function fontLoader() {
  const { chain, env } = config;

  depend.addImplicit('url-loader');

  const rule = chain.module.
    rule('font').
    test(/\.(woff2?|eot|ttf|otf)(\?.*)?$/u);

  rule.use('url-loader').
    loader('url-loader').
    options({
      limit: 10000,
      name:
        env === 'production'
          ? 'fonts/[name].[contenthash:5].[ext]'
          : 'fonts/[name].[ext]'
    });
}

module.exports = fontLoader;

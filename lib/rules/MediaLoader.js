const { config } = require('../util/config');
const { depend } = require('../util/depend');

function mediaLoader() {
  const { chain, env } = config;

  depend.addImplicit('url-loader');

  const rule = chain.module.
    rule('media').
    test(/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/u);

  rule.use('url-loader').
    loader('url-loader').
    options({
      limit: 10000,
      name:
        env === 'production'
          ? 'media/[name].[contenthash:5].[ext]'
          : 'media/[name].[ext]'
    });
}

module.exports = mediaLoader;

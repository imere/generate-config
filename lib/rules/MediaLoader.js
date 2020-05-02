const config = require('../util/config');

function mediaLoader() {
  const { chain, env } = config;

  const rule = chain.module.
    rule('media').
    test(/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/u);

  rule.use('url').
    loader('url-loader').
    options({
      limit: 10000,
      name:
        env === 'production'
          ? 'media/[name].[contenthash:5].[ext]'
          : 'media/[name].[ext]'
    }).
    end();
}

module.exports = mediaLoader;

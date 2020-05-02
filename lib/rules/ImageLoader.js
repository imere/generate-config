const config = require('../util/config');

function imageLoader() {
  const { chain, env } = config;

  const rule = chain.module.
    rule('image').
    test(/\.(png|jpe?g|gif|svg)(\?.*)?$/u);

  rule.use('file').
    loader('file-loader').
    options({
      limit: 4000,
      name: env === 'production'
        ? 'img/[name].[contenthash:5].[ext]'
        : 'img/[name].[ext]'
    }).
    end();

}

module.exports = imageLoader;

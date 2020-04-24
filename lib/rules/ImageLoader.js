/**
 * @param {import('webpack-chain')} config
 * @param {'none' | 'production' | 'development'} env
 * @param {import('yargs-parser').Arguments} args
 */
function imageLoader(config, env) {
  const rule = config.module.
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

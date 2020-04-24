/**
 * @param {import('webpack-chain')} config
 * @param {'none' | 'production' | 'development'} env
 * @param {import('yargs-parser').Arguments} args
 */
function pugLoader(config) {
  const rule = config.module.
    rule('pug').
    test(/\.pug$/u);

  rule.use('pug-plain').
    loader('pug-plain-loader').
    end();
}

module.exports = pugLoader;


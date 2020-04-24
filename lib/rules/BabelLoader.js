const {getFileSuffixReg} = require('../util/helper');

/**
 * @param {import('webpack-chain')} config
 * @param {'none' | 'production' | 'development'} env
 * @param {import('yargs-parser').Arguments} args
 */
function babelLoader(config, _env, args) {
  const reg = getFileSuffixReg(args);

  const rule = config.module.
    rule('babel').
    test(reg);

  rule.exclude.
    add(/node_modules/u);

  rule.use('babel').
    loader('babel-loader').
    end();
}

module.exports = babelLoader;

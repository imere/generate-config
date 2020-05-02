const config = require('../util/config');
const { getFileSuffixReg } = require('../util/helper');

function babelLoader() {
  const { chain, args } = config;

  const reg = getFileSuffixReg(args);

  const rule = chain.module.
    rule('babel').
    test(reg);

  rule.exclude.
    add(/node_modules/u);

  rule.use('babel').
    loader('babel-loader').
    end();
}

module.exports = babelLoader;

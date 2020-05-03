const { config } = require('../util/config');
const { depend } = require('../util/depend');
const { getFileSuffixReg } = require('../util/helper');

function babelLoader() {
  const { chain, args } = config;

  const reg = getFileSuffixReg(args);

  depend.addImplicit('babel-loader');

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

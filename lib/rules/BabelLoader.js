const { config } = require('../util/config');
const { depend } = require('../util/depend');
const { getFileSuffixRegByArg } = require('../util/helper');

function babelLoader() {
  const { chain } = config;

  const reg = getFileSuffixRegByArg();

  depend.addImplicit('babel-loader');

  const rule = chain.module.
    rule('babel').
    test(reg);

  rule.exclude.
    add(/node_modules/u);

  rule.use('babel-loader').
    loader('babel-loader');
}

module.exports = babelLoader;

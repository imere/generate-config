const { config } = require('../util/config');
const { depend } = require('../util/depend');
const { getFileSuffixRegByArg } = require('../util/helper');

function tsxLoader() {
  const { chain } = config;

  const reg = getFileSuffixRegByArg();

  depend.addImplicit('ts-loader');

  const rule = chain.module.
    rule('ts-tsx').
    test(reg);

  rule.exclude.
    add(/node_modules/u);

  rule.use('ts-loader').
    loader('ts-loader').
    options({
      transpileOnly: true,
      // TODO: may depends on happyPack or thread-loader (https://github.com/TypeStrong/ts-loader#happypackmode)
      happyPackMode: true,
      appendTsSuffixTo: [/\.vue$/u],
      appendTsxSuffixTo: [/\.vue$/u],
      configFile: undefined
    });
}

module.exports = tsxLoader;


const config = require('../util/config');
const { getFileSuffixReg } = require('../util/helper');
const { CMD } = require('../util/constant');

function tsxLoader() {
  const { chain, args } = config;

  const reg = getFileSuffixReg(args);

  const rule = chain.module.
    rule('ts-tsx').
    test(reg);

  rule.exclude.
    add(/node_modules/u);

  rule.use('ts').
    loader('ts-loader').
    options({
      transpileOnly: Boolean(args[CMD['ts-checker']]),
      // TODO: may depends on happyPack or thread-loader (https://github.com/TypeStrong/ts-loader#happypackmode)
      happyPackMode: Boolean(args[CMD['ts-checker']]),
      appendTsSuffixTo: [/\.vue$/u],
      appendTsxSuffixTo: [/\.vue$/u],
      configFile: undefined
    }).
    end();
}

module.exports = tsxLoader;


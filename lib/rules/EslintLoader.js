const config = require('../util/config');
const { depend } = require('../util/depend');
const { getFileSuffixReg } = require('../util/helper');

function eslintLoader() {
  const { chain, args } = config;

  const reg = getFileSuffixReg(args);

  depend.addImplicit('eslint-loader');

  const rule = chain.module.
    rule('eslint').
    pre().
    test(reg);

  rule.exclude.
    add(/node_modules/u);

  rule.use('eslint').
    loader('eslint-loader').
    options({
      cache: true,
      fix: false,
      failOnError: true,
      configFile: undefined

      /*
       * OutputReport: {
       *   filePath: require('path').resolve(
       *     __dirname,
       *     '../../..',
       *     'docs/eslint/checkstyle.xml'
       *   ),
       *   formatter: 'checkstyle'
       * }
       */
    }).
    end();
}

module.exports = eslintLoader;

const { config } = require('../util/config');
const { depend } = require('../util/depend');
const { getFileSuffixRegByArg } = require('../util/helper');

function eslintLoader() {
  const { chain } = config;

  const reg = getFileSuffixRegByArg();

  depend.addImplicit('eslint-loader');

  const rule = chain.module.
    rule('eslint').
    pre().
    test(reg);

  rule.exclude.
    add(/node_modules/u);

  rule.use('eslint-loader').
    loader('eslint-loader').
    options({
      cache: true,
      fix: false,
      failOnError: true,
      configFile: undefined,
      OutputReport: {
        filePath: require('path').resolve(
          process.cwd(),
          'docs/eslint/checkstyle.xml'
        ),
        formatter: 'checkstyle'
      }

    });
}

module.exports = eslintLoader;

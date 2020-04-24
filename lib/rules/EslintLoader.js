const {getFileSuffixReg} = require('../util/helper');

/**
 * @param {import('webpack-chain')} config
 * @param {'none' | 'production' | 'development'} env
 * @param {import('yargs-parser').Arguments} args
 */
function eslintLoader(config, env, args) {
  const reg = getFileSuffixReg(args);

  const rule = config.module.
    rule('eslint').
    enforce('pre').
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

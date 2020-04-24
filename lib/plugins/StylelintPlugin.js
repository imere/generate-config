const {pushImportModule} = require('../util/helper');

const StylelintWebpackPlugin = require('stylelint-webpack-plugin');

/**
 * @param {import('webpack-chain')} config
 * @param {'none' | 'production' | 'development'} env
 * @param {import('yargs-parser').Arguments} args
 */
function stylelintPlugin(config) {
  config.plugin('stylelint').
    use(StylelintWebpackPlugin, [
      {
        configFile: undefined,
        files: ['**/*.{vue,html,css,stylus,less,scss,sass}'],
        fix: false
      }
    ]);

  pushImportModule('stylelint-webpack-plugin');
}

module.exports = stylelintPlugin;

const { config } = require('../util/config');
const { depend } = require('../util/depend');

async function stylelintPlugin() {
  await depend.
    addModule('stylelint-webpack-plugin').
    download();

  config.chain.plugin('stylelint-webpack-plugin').
    use(require('stylelint-webpack-plugin'), [
      {
        configFile: undefined,
        files: ['**/*.{vue,html,css,stylus,less,scss,sass}'],
        fix: false
      }
    ]);
}

module.exports = stylelintPlugin;

const {pushImportModule} = require('../util/helper');

const TsconfigPathsWebpackPlugin = require('tsconfig-paths-webpack-plugin');

/**
 * @param {import('webpack-chain')} config
 * @param {'none' | 'production' | 'development'} env
 * @param {import('yargs-parser').Arguments} args
 */
function TsPathsPlugin(config) {
  config.resolve.plugin('tsconfig-paths').
    use(TsconfigPathsWebpackPlugin, [
      {
        configFile: undefined
      }
    ]);

  pushImportModule({
    value: 'tsconfig-paths-webpack-plugin',
    alias: 'TsconfigPathsPlugin'
  });
}

module.exports = TsPathsPlugin;

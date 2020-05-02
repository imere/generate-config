const { pushImportModule } = require('../util/helper');
const config = require('../util/config');

const TsconfigPathsWebpackPlugin = require('tsconfig-paths-webpack-plugin');

function TsPathsPlugin() {
  const { chain } = config;

  chain.resolve.plugin('tsconfig-paths').
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

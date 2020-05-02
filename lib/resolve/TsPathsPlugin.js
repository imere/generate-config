const config = require('../util/config');
const { depend } = require('../util/depend');
const { pushImportModule } = require('../util/helper');

const TsconfigPathsWebpackPlugin = require('tsconfig-paths-webpack-plugin');

function TsPathsPlugin() {
  const { chain } = config;

  depend.addModule({
    value: 'tsconfig-paths-webpack-plugin',
    alias: 'TsconfigPathsPlugin'
  });

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

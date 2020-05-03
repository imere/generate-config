const { config } = require('../util/config');
const { depend } = require('../util/depend');

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
}

module.exports = TsPathsPlugin;

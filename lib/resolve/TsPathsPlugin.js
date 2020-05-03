const { config } = require('../util/config');
const { depend } = require('../util/depend');

async function TsPathsPlugin() {
  const { chain } = config;

  await depend.
    addModule({
      value: 'tsconfig-paths-webpack-plugin',
      alias: 'TsconfigPathsPlugin'
    }).
    download();

  chain.resolve.plugin('tsconfig-paths-webpack-plugin').
    use(require('tsconfig-paths-webpack-plugin'), [
      {
        configFile: undefined
      }
    ]);
}

module.exports = TsPathsPlugin;

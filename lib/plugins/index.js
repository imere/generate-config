const {CMD} = require('../util/constant');

const vueLoaderPlugin = require('./VueLoaderPlugin');
const bundleAnalyzerPlugin = require('./BundleAnalyzerPlugin');
const stylelintPlugin = require('./StylelintPlugin');
const miniCSSExtractPlugin = require('./MiniCSSExtractPlugin');
const forkTsCheckerPlugin = require('./ForkTsCheckerPlugin');
const workboxPlugin = require('./WorkboxPlugin');
const copyPlugin = require('./CopyPlugin');
const watchIgnorePlugin = require('./WatchIgnorePlugin');
const notifierPlugin = require('./NotifierPlugin');
const duplicatePackageCheckerPlugin = require('./DuplicatePackageCheckerPlugin');
const htmlPlugin = require('./HtmlPlugin');

/**
 * @param {import('webpack-chain')} config
 * @param {'none' | 'production' | 'development'} env
 * @param {import('yargs-parser').Arguments} args
 */
function configurePlugins(config, env, args) {
  const isProd = env === 'production';

  if (isProd) {
    miniCSSExtractPlugin(config, env, args);
  }

  duplicatePackageCheckerPlugin(config, env, args);

  if (args[CMD.analyze]) {
    bundleAnalyzerPlugin(config, env, args);
  }

  if (args[CMD.notify]) {
    notifierPlugin(config, env, args);
  }

  if (args[CMD.html]) {
    htmlPlugin(config, env, args);
  }

  if (args[CMD.vue]) {
    vueLoaderPlugin(config, env, args);
  }

  if (args[CMD.stylelint]) {
    stylelintPlugin(config, env, args);
  }

  if (args[CMD.ts]) {
    watchIgnorePlugin(config, env, args);
    forkTsCheckerPlugin(config, env, args);
  }

  if (args[CMD.copy]) {
    copyPlugin(config, env, args);
  }

  if (args[CMD.workbox]) {
    workboxPlugin(config, env, args);
  }
}

module.exports = {configurePlugins};

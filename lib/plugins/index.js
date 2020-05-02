const { CMD } = require('../util/constant');
const config = require('../util/config');

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

function configurePlugins() {
  const {env, args } = config;

  const isProd = env === 'production';

  if (isProd) {
    miniCSSExtractPlugin();
  }

  duplicatePackageCheckerPlugin();

  if (args[CMD.analyze]) {
    bundleAnalyzerPlugin();
  }

  if (args[CMD.notify]) {
    notifierPlugin();
  }

  if (args[CMD.html]) {
    htmlPlugin();
  }

  if (args[CMD.vue]) {
    vueLoaderPlugin();
  }

  if (args[CMD.stylelint]) {
    stylelintPlugin();
  }

  if (args[CMD.ts]) {
    watchIgnorePlugin();
    forkTsCheckerPlugin();
  }

  if (args[CMD.copy]) {
    copyPlugin();
  }

  if (args[CMD.workbox]) {
    workboxPlugin();
  }
}

module.exports = { configurePlugins };

const { CMD } = require('../util/constant');
const { config, ifArg } = require('../util/config');

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
  const { env } = config;

  const isProd = env === 'production';

  if (isProd) {
    miniCSSExtractPlugin();
  }

  duplicatePackageCheckerPlugin();

  ifArg(CMD.analyze, () => {
    bundleAnalyzerPlugin();
  });

  ifArg(CMD.notify, () => {
    notifierPlugin();
  });

  ifArg(CMD.html, () => {
    htmlPlugin();
  });

  ifArg(CMD.vue, () => {
    vueLoaderPlugin();
  });

  ifArg(CMD.stylelint, () => {
    stylelintPlugin();
  });

  ifArg(CMD.ts, () => {
    watchIgnorePlugin();
    forkTsCheckerPlugin();
  });

  ifArg(CMD.copy, () => {
    copyPlugin();
  });

  ifArg(CMD.workbox, () => {
    workboxPlugin();
  });
}

module.exports = { configurePlugins };

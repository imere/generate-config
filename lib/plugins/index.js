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

async function configurePlugins() {
  const { env } = config;

  const isProd = env === 'production';

  if (isProd) {
    await miniCSSExtractPlugin();
  }

  await duplicatePackageCheckerPlugin();

  await ifArg(CMD.analyze, async () => {
    await bundleAnalyzerPlugin();
  });

  await ifArg(CMD.notify, async () => {
    await notifierPlugin();
  });

  await ifArg(CMD.html, async () => {
    await htmlPlugin();
  });

  await ifArg(CMD.vue, async () => {
    await vueLoaderPlugin();
  });

  await ifArg(CMD.stylelint, async () => {
    await stylelintPlugin();
  });

  await ifArg(CMD.ts, async () => {
    await watchIgnorePlugin();
    await forkTsCheckerPlugin();
  });

  await ifArg(CMD.copy, async () => {
    await copyPlugin();
  });

  await ifArg(CMD.workbox, async () => {
    await workboxPlugin();
  });
}

module.exports = { configurePlugins };

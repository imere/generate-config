const { checkNPMInit } = require('./util/check-package');
const { downloader } = require('./util/downloader');

const { configureBasic } = require('./basic/index');

const { configureRules } = require('./rules/index');

const { configureResolve } = require('./resolve/index');

const { configurePlugins } = require('./plugins/index');

const { configureOptimization } = require('./optimization/index');

async function configure() {

  checkNPMInit();

  await configureBasic();

  await configureResolve();

  await configureRules();

  await configurePlugins();

  await configureOptimization();

  await downloader.download();

}

module.exports = configure;

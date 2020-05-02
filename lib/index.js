const configureBasic = require('./basic/index');

const { configureRules } = require('./rules/index');

const { configureResolve } = require('./resolve/index');

const { configurePlugins } = require('./plugins/index');

const { configureOptimization } = require('./optimization/index');

function configure() {

  for (const fn of [
    configureBasic,
    configureResolve,
    configureRules,
    configurePlugins,
    configureOptimization
  ]) {
    fn();
  }

}

module.exports = configure;

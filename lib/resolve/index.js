const { CMD } = require('../util/constant');
const config = require('../util/config');

const extensions = require('./Extensions');
const tsPathsPlugin = require('./TsPathsPlugin');
const vue2Alias = require('./Vue2Alias');

function configureResolve() {
  const { args } = config;

  if (args[CMD.ts]) {
    tsPathsPlugin();
  }

  if (args[CMD.vue]) {
    vue2Alias();
  }

  for (const fn of [extensions]) {
    fn();
  }
}

module.exports = { configureResolve };

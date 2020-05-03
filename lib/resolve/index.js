const { CMD } = require('../util/constant');
const { ifArg } = require('../util/config');

const extensions = require('./Extensions');
const tsPathsPlugin = require('./TsPathsPlugin');
const vue2Alias = require('./Vue2Alias');

async function configureResolve() {
  await ifArg(CMD.ts, async () => {
    await tsPathsPlugin();
  });

  ifArg(CMD.vue, () => {
    vue2Alias();
  });

  await extensions();
}

module.exports = { configureResolve };

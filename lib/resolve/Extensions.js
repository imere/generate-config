const { CMD } = require('../util/constant');
const { config } = require('../util/config');

function Extensions() {
  const { chain, args } = config;

  const { extensions } = chain.resolve;

  if (args[CMD.vue]) {
    extensions.add('vue');
  }

  if (args[CMD.ts]) {
    if (args[CMD.jsx]) {
      extensions.add('tsx');
    }
    extensions.add('ts');
  }

  extensions.add('mjs');

  if (args[CMD.jsx]) {
    extensions.add('jsx');
  }

  extensions.add('js');
  extensions.add('json');
}

module.exports = Extensions;

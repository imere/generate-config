const Chain = require('webpack-chain');

const { checkValidArgs } = require('./bin/checkValidArgs');
const { writeFile } = require('./bin/writeFile');
const { CMDS, CMD, CLI } = require('./lib/util/constant');

exports.CMD = CMD;
exports.CLI = CLI;
exports.CMDS = CMDS;

/**
 * @param {Partial<exports.CMDS>} cmds
 * @param {'none' | 'production' | 'development'} env
 */
exports.generateConfig = function generateConfig(cmds, env = 'development') {

  /**
   * @type {any}
   */
  const args = {};

  for (const cmd of Object.keys(cmds)) {
    args[cmd] = cmd;
  }

  args[CMD.mode] = env;

  checkValidArgs(args);

  const chain = new Chain();

  require('./lib/index')();

  if (args[CLI['enable-preview']]) {
    writeFile();
  }

  return chain.toConfig();
};

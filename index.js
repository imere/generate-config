const Config = require('webpack-chain');

const { checkValidArgs } = require('./bin/checkValid');
const { writeFile } = require('./bin/writeFile');
const { CMD, CLI } = require('./lib/util/constant');

exports.CLI = CLI;
exports.CMD = CMD;

/**
 * @param {Array<any>} cmds
 * @param {'none' | 'production' | 'development'} env
 */
exports.generateConfig = function generateConfig(cmds, env = 'development') {
  const args = {};

  for (const cmd of cmds) {
    args[cmd] = cmd;
  }

  args[CMD.mode] = env;

  checkValidArgs(args);

  const config = new Config();

  require('./lib/index')(
    config,
    env,
    args
  );

  if (args[CLI['enable-preview']]) {
    writeFile(config, env, args);
  }

  return config.toConfig();
};

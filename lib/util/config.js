/**
 * @class ToolConfig
 */
class ToolConfig {
  constructor() {

    /**
     * @type {import('webpack-chain')}
     */
    this.chain = null;

    /**
     * @type {'none' | 'production' | 'development'}
     */
    this.env = 'none';

    /**
     * @type {import('yargs-parser').Arguments}
     */
    this.args = null;
  }

  /**
   * @param {import('webpack-chain')} chain
   * @param {'none' | 'production' | 'development'} env
   * @param {import('yargs-parser').Arguments} args
   */
  setUp(chain, env, args) {
    this.chain = chain;
    this.env = env;
    this.args = args;
  }
}

const config = new ToolConfig();


/**
 * @param {import('./constant').CMDS} cmd
 * @param {(arg0: any) => any} [trueFn]
 * @param {() => any} [falseFn]
 */
async function ifArg(cmd, trueFn, falseFn) {
  const { args } = config;

  if (!args) {
    throw new Error('call setUp first');
  }

  if (args[cmd]) {
    typeof trueFn === 'function' && await trueFn(args[cmd]);
  } else {
    typeof falseFn === 'function' && await falseFn();
  }
}

exports.config = config;
exports.ifArg = ifArg;

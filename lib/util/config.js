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

module.exports = new ToolConfig();

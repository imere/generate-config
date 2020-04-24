const {CLI, CMD} = require('../lib/util/constant');
const {kebabToCamelCase} = require('../lib/util/helper');

/**
 * @param {import('yargs-parser').Arguments} args
 */
exports.checkValidArgs = function checkValidArgs(args) {
  const cliList = [...Object.keys(CLI)];
  const cmdList = [...Object.keys(CMD)];

  class CommandNotFoundError extends Error {
    constructor(cmd) {
      super();
      this.cmd = cmd;
    }

    get message() {
      try {
        return [
          `${this.cmd}`,
          `Valid options are ${cliList.concat(cmdList).sort((a, b) => a.localeCompare(b)).
            map((str) => `--${str}`).
            join(' ')}`
        ].join('\n');
      } finally {
        Reflect.deleteProperty(this, 'cmd');
      }
    }
  }

  const list = cliList.concat(cmdList);

  const cmds = new Set(list);

  for (const cmd of list) {
    cmds.add(kebabToCamelCase(cmd));
  }

  for (const cmd of Object.keys(args).slice(1)) {
    if (!cmds.has(cmd)) {
      throw new CommandNotFoundError(cmd);
    }
  }
};

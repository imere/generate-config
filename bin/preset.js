const { config } = require('../lib/util/config');

const { CLI, CMD } = require('../lib/util/constant');

function preset() {
  // If no args given
  if (Object.keys(config.args).length === 1) {
    const cliList = [...Object.keys(CLI)];
    const cmdList = [...Object.keys(CMD)];

    config.env = 'production';
    config.args[CLI['enable-preview']] === true;

    for (const cmd of cliList.concat(cmdList)) {
      if (CMD.mode === cmd) {
        config.args[CMD.mode] = 'production';
      } else if (CLI.help === cmd) {
        // Noop
      } else {
        config.args[cmd] = true;
      }
    }

  }
}

exports.preset = preset;

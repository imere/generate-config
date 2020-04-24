const eol = require('eol');
const chalk = require('chalk');

const {CMD} = require('./constant');

/**
 * @param {import('yargs-parser').Arguments} args
 */
exports.getFileSuffixReg =
  function getFileSuffixReg(args) {
    let reg = /\.js$/u;

    if (args[CMD.jsx]) {
      reg = /\.jsx?$/u;
    }
    if (args[CMD.ts]) {
      reg = /\.[jt]s$/u;
      if (args[CMD.jsx]) {
        reg = /\.[jt]sx?$/u;
      }
    }

    return reg;
  };


/**
 * @param {string} str
 */
exports.kebabToCamelCase = function kebabToCamelCase(str) {
  const words = str.split('-');

  if (!words.length) {
    return str;
  }

  const res = [
    `${words[0][0].toLowerCase()}${words[0].slice(1)}`,
    ...words.slice(1).map(
      (word) => `${word[0].toUpperCase()}${word.slice(1)}`
    )
  ].
    join('');

  return eol.auto(res);
};

/**
 * @param {string} str
 */
function kebabToPascal(str) {
  const words = str.split('-');

  if (!words.length) {
    return str;
  }

  const res = words.map(
    (word) => `${word[0].toUpperCase()}${word.slice(1)}`
  ).
    join('');

  return eol.auto(res);
}

/**
 * @type {Set<string | {value: string, destructs: Array<string>} | {value: string, alias: string}>}
 */
const imported = new Set();

imported.reset = function reset() {
  if (this instanceof Set) {
    this.clear();
  }
};

/**
 * @param {*} obj
 */
function isImportDestruct(obj) {
  return Boolean(obj) && obj.value && obj.destructs;
}

/**
 * @param {*} obj
 */
function isImportAlias(obj) {
  return Boolean(obj) && obj.value && obj.alias;
}

/**
 * @param {string | {value: string, destructs: Array<string>} | {value: string, alias: string}} obj
 */
exports.pushImportModule =

  function pushImportModule(obj) {
    if (typeof obj === 'string') {
      imported.add(obj);
      return;
    }
    if (isImportDestruct(obj) || isImportAlias(obj)) {
      imported.add(obj);
      return;
    }
    console.warn(`SKIPPING: Received type ${typeof obj}, string expected`);
  };

exports.flushImportModuleString =

  function flushImportModuleString() {
    const res = [...imported.values()].map(
      (obj) => {
        if (typeof obj === 'string') {
          return `const ${kebabToPascal(obj)} = require('${obj}')`;
        }
        if (isImportDestruct(obj)) {
          return `const { ${obj.destructs.join(', ')} } = require('${obj.value}')`;
        }
        if (isImportAlias(obj)) {
          return `const ${obj.alias} = require('${obj.value}')`;
        }
        return null;
      }
    ).
      filter((cond) => cond).
      join('\n');

    imported.reset();

    return eol.auto(res);
  };

exports.logger = {
  info(...args) {
    console.log(chalk.bgBlue.black('INFO: '), ...args);
  },
  warn(...args) {
    console.warn(chalk.bgYellow.black('WARN: '), ...args);
  },
  error(...args) {
    console.error(chalk.bgRed.black('ERROR: '), ...args);
  }
};

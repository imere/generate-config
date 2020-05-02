const eol = require('eol');

const { CMD } = require('./constant');

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
const upperFirst = function upperFirst(str) {
  if (!str.length) {
    return str;
  }

  return `${str[0].toUpperCase()}${str.slice(1)}`;
};

/**
 * @param {string} str
 */
const lowerFirst = function lowerFirst(str) {
  if (!str.length) {
    return str;
  }

  return `${str[0].toLowerCase()}${str.slice(1)}`;
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
    lowerFirst(words[0]),
    ...words.slice(1).map(
      (word) => upperFirst(word)
    )
  ].
    join('');

  return res;
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
    (word) => upperFirst(word)
  ).
    join('');

  return res;
}
exports.kebabToPascal = kebabToPascal;

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

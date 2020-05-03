const { ifArg } = require('./config');
const { CMD } = require('./constant');

/**
 * @param {import('yargs-parser').Arguments} args
 */
exports.getFileSuffixReg =
  function getFileSuffixReg(args) {
    let reg = /\.js$/u;

    ifArg(CMD.jsx, () => {
      reg = /\.jsx?$/u;
    });

    ifArg(CMD.ts, () => {
      reg = /\.[jt]s$/u;

      ifArg(CMD.jsx, () => {
        reg = /\.[jt]sx?$/u;
      });

    });

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

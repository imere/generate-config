const { kebabToPascal } = require('./helper');

/**
 * @typedef {string} PlainModuleSource
 * @typedef {{value: string, destructs: Array<string>}} DestructModuleSource
 * @typedef {{value: string, alias: string}} AliasModuleSource
 */

class Module {
  get requireString() {
    throw new Error('getter requireString not implemented');
  }
}

class PlainModule extends Module {

  /**
   * @param {PlainModuleSource} source
   */
  constructor(source) {
    super();
    this.source = source;
  }

  get requireString() {
    return `const ${kebabToPascal(this.source)} = require('${this.source}')`;
  }
}

class DestructModule extends Module {

  /**
   * @param {DestructModuleSource} source
   */
  constructor(source) {
    super();
    this.source = source;
  }

  get requireString() {
    return `const { ${this.source.destructs.join(', ')} } = require('${this.source.value}')`;
  }
}

class AliasModule extends Module {

  /**
   * @param {AliasModuleSource} source
   */
  constructor(source) {
    super();
    this.source = source;
  }

  get requireString() {
    return `const ${this.source.alias} = require('${this.source.value}')`;
  }
}

/**
 * @param {any} obj
 * @returns {obj is PlainModule}
 */
function isPlainModule(obj) {
  return obj instanceof PlainModule;
}

/**
 * @param {any} obj
 * @returns {obj is DestructModule}
 */
function isDestructModule(obj) {
  return obj instanceof DestructModule;
}

/**
 * @param {any} obj
 * @returns {obj is AliasModule}
 */
function isAliasModule(obj) {
  return obj instanceof AliasModule;
}

// jsdoc import doesn't support default export
exports.isAliasModule = isAliasModule;
exports.AliasModule = AliasModule;

exports.isDestructModule = isDestructModule;
exports.DestructModule = DestructModule;

exports.isPlainModule = isPlainModule;
exports.PlainModule = PlainModule;


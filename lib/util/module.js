const { kebabToPascal } = require('./helper');

/**
 * @typedef {string} PlainModuleSource
 * @typedef {{value: string, destructs: Array<string>}} DestructModuleSource
 * @typedef {{value: string, alias: string}} AliasModuleSource
 */

class Module {

  get value() {
    throw new Error('getter value not implemented');
  }

  get requireString() {
    throw new Error('getter requireString not implemented');
  }
}

/**
 * @class PlainModule
 * @extends {Module}
 */
class PlainModule extends Module {

  /**
   * @param {PlainModuleSource} source
   */
  constructor(source) {
    super();
    this.source = source;
  }

  get value() {
    return this.source;
  }

  get requireString() {
    return `const ${kebabToPascal(this.source)} = require('${this.source}')`;
  }
}

/**
 * @class DestructModule
 * @extends {Module}
 */
class DestructModule extends Module {

  /**
   * @param {DestructModuleSource} source
   */
  constructor(source) {
    super();
    this.source = source;
  }

  get value() {
    return this.source.value;
  }

  get requireString() {
    return `const { ${this.source.destructs.join(', ')} } = require('${this.source.value}')`;
  }
}

/**
 * @class AliasModule
 * @extends {Module}
 */
class AliasModule extends Module {

  /**
   * @param {AliasModuleSource} source
   */
  constructor(source) {
    super();
    this.source = source;
  }

  get value() {
    return this.source.value;
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
 * @returns {obj is PlainModule}
 */
function isRawPlainModule(obj) {
  return typeof obj === 'string';
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
 * @returns {obj is DestructModule}
 */
function isRawDestructModule(obj) {
  return Boolean(obj) &&
    Array.isArray(obj.destructs) &&
    typeof obj.value === 'string';
}

/**
 * @param {any} obj
 * @returns {obj is AliasModule}
 */
function isAliasModule(obj) {
  return obj instanceof AliasModule;
}

/**
 * @param {any} obj
 * @returns {obj is AliasModule}
 */
function isRawAliasModule(obj) {
  return Boolean(obj) &&
    typeof obj.alias === 'string' &&
    typeof obj.value === 'string';
}

// jsdoc import doesn't support default export
exports.isRawAliasModule = isRawAliasModule;
exports.isAliasModule = isAliasModule;
exports.AliasModule = AliasModule;

exports.isRawDestructModule = isRawDestructModule;
exports.isDestructModule = isDestructModule;
exports.DestructModule = DestructModule;

exports.isRawPlainModule = isRawPlainModule;
exports.isPlainModule = isPlainModule;
exports.PlainModule = PlainModule;


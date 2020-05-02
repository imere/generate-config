const { kebabToPascal } = require('./helper');

class Module {
  get requireString() {
    throw new Error('getter requireString not implemented');
  }
}

class PlainModule extends Module {

  /**
   * @param {string} source
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
   * @param {{value: string, destructs: Array<string>}} source
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
   * @param {{value: string, alias: string}} source
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
 * @param {*} obj
 */
function isPlainModule(obj) {
  return obj instanceof PlainModule;
}

/**
 * @param {*} obj
 */
function isDestructModule(obj) {
  return obj instanceof DestructModule;
}

/**
 * @param {*} obj
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


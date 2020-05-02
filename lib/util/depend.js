const eol = require('eol');
const {
  AliasModule,
  DestructModule,
  PlainModule
} = require('./module');
const { Logger } = require('./logger');

/**
 * @typedef {import("./module").PlainModule} PlainModule
 * @typedef {import("./module").DestructModule} DestructModule
 * @typedef {import("./module").AliasModule} AliasModule
 *
 * @typedef {string} PlainModuleSource
 * @typedef {{value: string, destructs: Array<string>}} DestructModuleSource
 * @typedef {{value: string, alias: string}} AliasModuleSource
 */

class Depend {

  constructor() {

    /**
     * @type {Array<PlainModule | DestructModule | AliasModule>}
     */
    this.modules = [];

    /**
     * @type {Array<string>}
     */
    this.implicitModules = [];
  }

  /**
   * @param {PlainModuleSource | DestructModuleSource | AliasModuleSource} source
   */
  addModule(source) {
    if (typeof source === 'string') {
      this.modules.push(new PlainModule(source));
    } else if (
      Boolean(source) &&
      Array.isArray(source.destructs) &&
      source.value
    ) {
      this.modules.push(new DestructModule(source));
    } else if (
      Boolean(source) &&
      source.alias &&
      source.value
    ) {
      this.modules.push(new AliasModule(source));
    } else {
      Logger.warn(`Skipping: unknown type ${JSON.stringify(source)} received.`);
    }
    return this;
  }

  /**
   * @param {import("./module").PlainModule} mod
   */
  addPlainModule(mod) {
    this.modules.push(mod);
    return this;
  }

  /**
   * @param {import("./module").DestructModule} mod
   */
  addDestructModule(mod) {
    this.modules.push(mod);
    return this;
  }

  /**
   * @param {import("./module").AliasModule} mod
   */
  addAliasModule(mod) {
    this.modules.push(mod);
    return this;
  }

  flushRequireString() {
    const res = this.modules.map(
      (obj) => obj.requireString
    ).
      filter((cond) => cond).
      join('\n');

    this.resetModule();

    return eol.auto(res);
  }

  resetModule() {
    this.modules.length = 0;
  }

  addImplicit(source) {
    this.implicitModules.push(source);
    return this;
  }

  resetImplicit() {
    this.implicitModules.length = 0;
  }
}

module.exports = {
  depend: new Depend()
};

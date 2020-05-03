const eol = require('eol');
const {
  AliasModule,
  DestructModule,
  PlainModule
} = require('./module');
const { Logger } = require('./logger');

/**
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
     * @type {Set<string>}
     */
    this.implicitModules = new Set();
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
   * @param {PlainModule} mod
   */
  addPlainModule(mod) {
    this.modules.push(mod);
    return this;
  }

  /**
   * @param {DestructModule} mod
   */
  addDestructModule(mod) {
    this.modules.push(mod);
    return this;
  }

  /**
   * @param {AliasModule} mod
   */
  addAliasModule(mod) {
    this.modules.push(mod);
    return this;
  }

  filterUnique() {
    const { modules } = this;
    const modSet = new Set();
    const idxSet = new Set();

    for (let i = 0; i < modules.length; i++) {
      const { value } = modules[i];

      if (!modSet.has(value)) {
        idxSet.add(i);
      }
      modSet.add(value);
    }

    this.modules = modules.filter((_, i) => idxSet.has(i));
  }

  /**
   * @returns {string}
   * @memberof Depend
   */
  flushRequireString() {
    this.filterUnique();

    const res = this.modules.map(
      (obj) => obj.requireString
    ).
      filter((cond) => cond).
      join('\n');

    return eol.auto(res);
  }

  resetModule() {
    this.modules.length = 0;
  }

  /**
   * @param {string} source
   * @returns
   * @memberof Depend
   */
  addImplicit(source) {
    this.implicitModules.add(source);
    return this;
  }

  resetImplicit() {
    this.implicitModules.clear();
  }
}

module.exports = {
  depend: new Depend()
};

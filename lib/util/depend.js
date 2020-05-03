const eol = require('eol');
const { downloader } = require('./downloader');
const {
  AliasModule,
  isRawAliasModule,
  DestructModule,
  isRawDestructModule,
  PlainModule,
  isRawPlainModule
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
    if (isRawPlainModule(source)) {

      this.addPlainModule(new PlainModule(source));
      downloader.pushDevQueue(source);

    } else if (isRawDestructModule(source)) {

      this.addDestructModule(new DestructModule(source));
      downloader.pushDevQueue(source.value);

    } else if (isRawAliasModule(source)) {

      this.addAliasModule(new AliasModule(source));
      downloader.pushDevQueue(source.value);

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

  reserveUnique() {
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

    modSet.clear();
    idxSet.clear();
  }

  /**
   * @returns {string}
   * @memberof Depend
   */
  flushRequireString() {
    this.reserveUnique();

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
    downloader.pushDevQueue(source);
    this.implicitModules.add(source);
    return this;
  }

  resetImplicit() {
    this.implicitModules.clear();
  }

  async download() {
    await downloader.download();
  }
}

module.exports = {
  depend: new Depend()
};

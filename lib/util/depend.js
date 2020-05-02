const eol = require('eol');

/**
 * @typedef {import("./module").PlainModule} PlainModule
 * @typedef {import("./module").DestructModule} DestructModule
 * @typedef {import("./module").AliasModule} AliasModule
 */

class Depend {

  constructor() {

    /**
     * @type {Array<PlainModule | DestructModule | AliasModule>}
     */
    this.modules = [];
  }

  /**
   * @param {import("./module").PlainModule} mod
   */
  addPlainModule(mod) {
    this.modules.push(mod);
  }

  /**
   * @param {import("./module").DestructModule} mod
   */
  addDestructModule(mod) {
    this.modules.push(mod);
  }

  /**
   * @param {import("./module").AliasModule} mod
   */
  addAliasModule(mod) {
    this.modules.push(mod);
  }

  reset() {
    this.modules.length = 0;
  }

  flushRequireString() {
    const res = this.modules.map(
      (obj) => obj.requireString
    ).
      filter((cond) => cond).
      join('\n');

    this.reset();

    return eol.auto(res);
  }
}

module.exports = new Depend();

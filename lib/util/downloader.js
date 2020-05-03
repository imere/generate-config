const execa = require('execa');
const ora = require('ora');
const { checkDependencyExist, checkDevDependencyExist } = require('./check-package');

class Downloader {
  constructor() {

    /**
     * @type {Array<string>}
     */
    this.devQueue = [];

    /**
     * @type {Set<string>}
     */
    this.processed = new Set();
  }

  /**
   * @param {string} mod
   * @memberof Downloader
   */
  pushDevQueue(mod) {
    this.devQueue.push(mod);
  }

  /**
   * @memberof Downloader
   */
  popDevQueue() {
    this.devQueue.pop();
  }

  clearDevQueue() {
    this.devQueue.length = 0;
  }

  /**
   * @memberof Downloader
   */
  async downloadDevDeps() {
    const { processed } = this;

    this.devQueue = this.devQueue.filter((mod) => !processed.has(mod) &&
      !checkDependencyExist(mod) &&
      !checkDevDependencyExist(mod)
    );
    const { devQueue } = this;

    if (!devQueue.length) {
      return;
    }

    const spinner = ora(`Installing ${devQueue}`).start();

    try {
      const subprocess = execa('npm', ['install', '--save-dev', ...devQueue]);

      await subprocess;
    } finally {
      spinner.stop();
    }
    for (const mod of devQueue) {
      processed.add(mod);
    }

    this.clearDevQueue();
  }

  async download() {
    await this.downloadDevDeps();
  }
}

module.exports = {
  downloader: new Downloader()
};
